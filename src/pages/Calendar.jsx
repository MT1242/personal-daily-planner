import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import TaskItem from '../components/TaskItem'
import { WEEKDAYS, byTime, fmt, monthGrid, todayStr, weekDays } from '../utils'

export default function Calendar({ tasks, actions, onAdd }) {
  const [cursor, setCursor] = useState(new Date())
  const [selected, setSelected] = useState(todayStr())
  const [view, setView] = useState('month')

  const days = view === 'month' ? monthGrid(cursor.getFullYear(), cursor.getMonth()) : weekDays(cursor)
  const step = (dir) => {
    const d = new Date(cursor)
    if (view === 'month') d.setMonth(d.getMonth() + dir)
    else d.setDate(d.getDate() + dir * 7)
    setCursor(d)
  }
  const dayTasks = tasks.filter((t) => t.date === selected).sort(byTime)

  return (
    <div className="page">
      <header className="page-head">
        <h1>Lịch tháng {cursor.getMonth() + 1}/{cursor.getFullYear()}</h1>
        <div className="toolbar">
          <div className="segmented">
            <button type="button" className={view === 'month' ? 'on' : ''} onClick={() => setView('month')}>Tháng</button>
            <button type="button" className={view === 'week' ? 'on' : ''} onClick={() => setView('week')}>Tuần</button>
          </div>
          <button type="button" className="btn icon-only" onClick={() => step(-1)} aria-label="Trước"><ChevronLeft size={18} /></button>
          <button type="button" className="btn" onClick={() => { setCursor(new Date()); setSelected(todayStr()) }}>Hôm nay</button>
          <button type="button" className="btn icon-only" onClick={() => step(1)} aria-label="Sau"><ChevronRight size={18} /></button>
        </div>
      </header>

      <div className="grid-cal">
        <section className="card">
          <div className={`cal ${view}`}>
            {WEEKDAYS.map((w) => <div key={w} className="cal-h">{w}</div>)}
            {days.map((d) => {
              const key = fmt(d)
              const list = tasks.filter((t) => t.date === key && t.status !== 'cancelled')
              return (
                <button
                  key={key}
                  type="button"
                  className={`cal-d ${d.getMonth() !== cursor.getMonth() && view === 'month' ? 'out' : ''} ${key === todayStr() ? 'today' : ''} ${key === selected ? 'sel' : ''}`}
                  onClick={() => setSelected(key)}
                >
                  <span>{d.getDate()}</span>
                  {list.length > 0 && (
                    <i className="dots">
                      {list.slice(0, 3).map((t) => <b key={t.id} className={t.priority} />)}
                      {list.length > 3 && <em>+{list.length - 3}</em>}
                    </i>
                  )}
                </button>
              )
            })}
          </div>
        </section>

        <section className="card">
          <div className="card-head">
            <h2>Ngày {selected.split('-').reverse().join('/')}</h2>
            <button type="button" className="btn primary" onClick={() => onAdd(selected)}>
              <Plus size={16} />
              <span>Thêm việc</span>
            </button>
          </div>
          {dayTasks.length === 0 && <p className="empty">Ngày này chưa có công việc.</p>}
          {dayTasks.map((t) => <TaskItem key={t.id} task={t} {...actions} />)}
        </section>
      </div>
    </div>
  )
}
