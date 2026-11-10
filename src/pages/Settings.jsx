import { useState } from 'react'
import { signOut } from 'firebase/auth'
import { Download, Moon, Sparkles, Sun, Trash2 } from 'lucide-react'
import { auth } from '../firebase'
import { GoogleLogoIcon } from '../components/Icons'

export default function Settings({ user, theme, setTheme, tasks = [], onRemove }) {
  const [msg, setMsg] = useState('')

  const completedTasks = tasks.filter((t) => t.status === 'completed' || t.status === 'cancelled')

  // Tìm các công việc bị trùng (cùng ngày + cùng tiêu đề + cùng giờ bắt đầu)
  const duplicateIds = []
  const seen = new Set()
  for (const t of tasks) {
    const key = `${t.date}|${(t.title || '').trim().toLowerCase()}|${t.startTime || ''}`
    if (seen.has(key)) duplicateIds.push(t.id)
    else seen.add(key)
  }

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `daily-planner-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    setMsg('Đã tải xuống file sao lưu dữ liệu (.json).')
  }

  const cleanDuplicates = async () => {
    if (!duplicateIds.length || !onRemove) return
    for (const id of duplicateIds) {
      await onRemove(id)
    }
    setMsg(`Đã dọn dẹp ${duplicateIds.length} công việc bị trùng lặp.`)
  }

  const clearCompleted = async () => {
    if (!completedTasks.length || !onRemove) return
    if (!window.confirm(`Xóa ${completedTasks.length} công việc đã hoàn thành / đã hủy?`)) return
    for (const t of completedTasks) {
      await onRemove(t.id)
    }
    setMsg(`Đã xóa ${completedTasks.length} công việc đã hoàn thành / đã hủy.`)
  }

  return (
    <div className="page narrow">
      <header className="page-head fade-up"><h1>Cài đặt hệ thống</h1></header>

      <section className="card fade-up delay-1">
        <h2 style={{ marginBottom: 14 }}>Tài khoản Google</h2>
        <div className="account big">
          {user.photoURL ? (
            <img src={user.photoURL} alt="" referrerPolicy="no-referrer" />
          ) : (
            <div className="avatar-fallback">{(user.displayName || user.email || 'U')[0].toUpperCase()}</div>
          )}
          <div>
            <strong>{user.displayName || 'Người dùng'}</strong>
            <small>{user.email}</small>
          </div>
        </div>
        <button type="button" className="btn" onClick={() => signOut(auth)}>
          <GoogleLogoIcon size={16} />
          <span>Đăng xuất tài khoản</span>
        </button>
      </section>

      <section className="card fade-up delay-2">
        <h2 style={{ marginBottom: 14 }}>Giao diện hiển thị</h2>
        <div className="segmented">
          <button
            type="button"
            className={theme === 'light' ? 'on' : ''}
            onClick={() => setTheme('light')}
          >
            <Sun size={15} style={{ verticalAlign: '-2px', marginRight: 6 }} />
            Sáng
          </button>
          <button
            type="button"
            className={theme === 'dark' ? 'on' : ''}
            onClick={() => setTheme('dark')}
          >
            <Moon size={15} style={{ verticalAlign: '-2px', marginRight: 6 }} />
            Tối
          </button>
        </div>
      </section>

      <section className="card fade-up delay-2">
        <h2 style={{ marginBottom: 8 }}>Quản lý dữ liệu ({tasks.length} công việc)</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.88rem', margin: '0 0 14px' }}>
          Sao lưu danh sách công việc về máy hoặc dọn dẹp nhanh các công việc trùng lặp / đã xong.
        </p>
        <div className="toolbar">
          <button type="button" className="btn" onClick={exportJson}>
            <Download size={16} />
            <span>Xuất file sao lưu (.json)</span>
          </button>

          {duplicateIds.length > 0 && (
            <button type="button" className="btn primary" onClick={cleanDuplicates}>
              <Sparkles size={16} />
              <span>Xóa {duplicateIds.length} việc bị trùng</span>
            </button>
          )}

          {completedTasks.length > 0 && (
            <button type="button" className="btn" onClick={clearCompleted}>
              <Trash2 size={16} />
              <span>Dọn {completedTasks.length} việc đã xong</span>
            </button>
          )}
        </div>
        {msg && <p style={{ color: 'var(--low)', fontWeight: 600, fontSize: '0.86rem', marginTop: 12 }}>{msg}</p>}
      </section>
    </div>
  )
}
