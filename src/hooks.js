import { useEffect, useRef, useState } from 'react'
import {
  collection, deleteDoc, doc, onSnapshot, orderBy, query,
  serverTimestamp, setDoc, updateDoc,
} from 'firebase/firestore'
import { db } from './firebase'

export function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])
  return [theme, setTheme]
}

function loadLocalTasks(uid) {
  try {
    const raw = localStorage.getItem(`planner_tasks_${uid}`)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveLocalTasks(uid, list) {
  try {
    localStorage.setItem(`planner_tasks_${uid}`, JSON.stringify(list))
  } catch {
    // ignore storage quota errors
  }
}

export function useTasks(uid) {
  const [tasks, setTasks] = useState(() => (uid ? loadLocalTasks(uid) : []))
  const [loading, setLoading] = useState(true)
  const [dbError, setDbError] = useState('')
  const tasksRef = useRef(tasks)
  tasksRef.current = tasks

  useEffect(() => {
    if (!uid) return
    const cached = loadLocalTasks(uid)
    setTasks(cached)

    const timer = setTimeout(() => setLoading(false), 1200)

    const q = query(collection(db, 'users', uid, 'tasks'), orderBy('date'))
    const unsub = onSnapshot(
      q,
      (snap) => {
        clearTimeout(timer)
        const remote = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
        setTasks(remote)
        saveLocalTasks(uid, remote)
        setDbError('')
        setLoading(false)
      },
      (err) => {
        clearTimeout(timer)
        console.warn('Firestore sync warning:', err?.code || err?.message)
        setDbError('')
        setLoading(false)
      }
    )

    return () => {
      clearTimeout(timer)
      unsub()
    }
  }, [uid])

  const add = async (t) => {
    // Chặn thêm trùng lặp trong cùng ngày & giờ bắt đầu
    const exists = tasksRef.current.some(
      (item) =>
        item.date === t.date &&
        item.title?.trim().toLowerCase() === t.title?.trim().toLowerCase() &&
        (item.startTime || '') === (t.startTime || '')
    )
    if (exists) return

    const id = (typeof crypto !== 'undefined' && crypto.randomUUID)
      ? crypto.randomUUID()
      : `task_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
    const newTask = { id, ...t, createdAt: Date.now(), updatedAt: Date.now() }
    const next = [...tasksRef.current, newTask]
    tasksRef.current = next
    setTasks(next)
    saveLocalTasks(uid, next)

    setDoc(doc(db, 'users', uid, 'tasks', id), {
      ...t,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }).catch((e) => console.warn('Firestore add skipped:', e?.code || e?.message))
  }

  const update = async (id, patch) => {
    const next = tasksRef.current.map((item) =>
      item.id === id ? { ...item, ...patch, updatedAt: Date.now() } : item
    )
    tasksRef.current = next
    setTasks(next)
    saveLocalTasks(uid, next)

    updateDoc(doc(db, 'users', uid, 'tasks', id), {
      ...patch,
      updatedAt: serverTimestamp(),
    }).catch((e) => console.warn('Firestore update skipped:', e?.code || e?.message))
  }

  const remove = async (id) => {
    const next = tasksRef.current.filter((item) => item.id !== id)
    tasksRef.current = next
    setTasks(next)
    saveLocalTasks(uid, next)

    deleteDoc(doc(db, 'users', uid, 'tasks', id)).catch((e) =>
      console.warn('Firestore delete skipped:', e?.code || e?.message)
    )
  }

  return { tasks, loading, dbError, add, update, remove }
}
