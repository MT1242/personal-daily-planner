import { Clock, Pencil, Trash2 } from 'lucide-react'
import { CATEGORIES, PRIORITIES } from '../utils'

export default function TaskItem({ task, onToggle, onEdit, onDelete, showDate }) {
  const done = task.status === 'completed'
  const timeLabel = task.startTime
    ? `${task.startTime}${task.endTime ? ` – ${task.endTime}` : ''}`
    : 'Cả ngày'

  return (
    <div className={`task ${done ? 'done' : ''} ${task.status === 'cancelled' ? 'cancelled' : ''}`}>
      <div className="task-time">
        {showDate && <span className="task-date">{task.date.split('-').slice(1).reverse().join('/')}</span>}
        <span>{task.startTime || 'Cả ngày'}</span>
      </div>

      <label className="task-check-wrap" title="Đánh dấu hoàn thành">
        <input
          type="checkbox"
          checked={done}
          onChange={() => onToggle(task)}
          aria-label={`Đánh dấu hoàn thành ${task.title}`}
        />
      </label>

      <div className="task-main">
        <strong className="task-title">{task.title}</strong>
        {task.description && <p className="task-desc">{task.description}</p>}
        <div className="task-meta">
          <span className="meta-time">
            <Clock size={12} />
            {showDate && `${task.date.split('-').slice(1).reverse().join('/')} · `}
            {timeLabel}
          </span>
          {task.category && CATEGORIES[task.category] && (
            <span className="cat-badge">{CATEGORIES[task.category]}</span>
          )}
        </div>
      </div>

      <div className="task-actions">
        <span className={`tag ${task.priority}`}>{PRIORITIES[task.priority]}</span>
        <button
          type="button"
          className="action-btn edit"
          onClick={() => onEdit(task)}
          title="Sửa công việc"
          aria-label="Sửa công việc"
        >
          <Pencil size={15} />
        </button>
        <button
          type="button"
          className="action-btn delete"
          onClick={() => onDelete(task)}
          title="Xóa công việc"
          aria-label="Xóa công việc"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  )
}
