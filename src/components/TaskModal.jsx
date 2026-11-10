import { useRef, useState } from 'react'
import { X } from 'lucide-react'
import { CATEGORIES, PRIORITIES, STATUSES } from '../utils'

export default function TaskModal({ task, tasks = [], defaultDate, onSave, onClose }) {
  const [form, setForm] = useState({
    title: task?.title || '',
    description: task?.description || '',
    date: task?.date || defaultDate,
    startTime: task?.startTime || '',
    endTime: task?.endTime || '',
    priority: task?.priority || 'medium',
    status: task?.status || 'pending',
    category: task?.category || 'work',
  })
  const [formError, setFormError] = useState('')
  const [saving, setSaving] = useState(false)
  const submitLockRef = useRef(false)

  const set = (k) => (e) => {
    setForm((prev) => ({ ...prev, [k]: e.target.value }))
    setFormError('')
  }

  const submit = async (e) => {
    e.preventDefault()
    // Chặn tuyệt đối bấm spam nhiều lần hoặc giữ phím Enter
    if (submitLockRef.current || saving) return

    const cleanTitle = form.title.trim()
    if (!cleanTitle) {
      setFormError('Vui lòng nhập tiêu đề công việc.')
      return
    }

    if (form.startTime && form.endTime && form.endTime < form.startTime) {
      setFormError('Giờ kết thúc phải lớn hơn hoặc bằng giờ bắt đầu.')
      return
    }

    // Kiểm tra trùng lặp công việc trong cùng ngày
    const isDuplicate = tasks.some(
      (t) =>
        t.id !== task?.id &&
        t.date === form.date &&
        t.title?.trim().toLowerCase() === cleanTitle.toLowerCase() &&
        (t.startTime || '') === (form.startTime || '')
    )
    if (isDuplicate) {
      setFormError('Công việc này đã tồn tại trong ngày và khung giờ đã chọn.')
      return
    }

    submitLockRef.current = true
    setSaving(true)
    try {
      await onSave({
        ...form,
        title: cleanTitle,
        description: form.description.trim(),
      })
    } catch (err) {
      console.error(err)
      submitLockRef.current = false
      setSaving(false)
      setFormError('Có lỗi khi lưu công việc. Vui lòng thử lại.')
    }
  }

  return (
    <div className="overlay" onMouseDown={() => !saving && onClose()}>
      <form className="modal" onSubmit={submit} onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2>{task ? 'Sửa công việc' : 'Thêm công việc'}</h2>
          <button
            type="button"
            className="icon-btn"
            onClick={onClose}
            disabled={saving}
            aria-label="Đóng"
          >
            <X size={18} />
          </button>
        </div>
        <label>
          Tiêu đề
          <input
            autoFocus
            value={form.title}
            onChange={set('title')}
            disabled={saving}
            maxLength={120}
            required
          />
        </label>
        <label>
          Ghi chú
          <textarea
            rows={2}
            value={form.description}
            onChange={set('description')}
            disabled={saving}
            maxLength={500}
          />
        </label>
        <div className="row">
          <label>
            Ngày
            <input type="date" value={form.date} onChange={set('date')} disabled={saving} required />
          </label>
          <label>
            Bắt đầu
            <input type="time" value={form.startTime} onChange={set('startTime')} disabled={saving} />
          </label>
          <label>
            Kết thúc
            <input type="time" value={form.endTime} onChange={set('endTime')} disabled={saving} />
          </label>
        </div>
        {formError && <p className="error" style={{ margin: 0 }}>{formError}</p>}
        <div className="row">
          <label>
            Ưu tiên
            <select value={form.priority} onChange={set('priority')} disabled={saving}>
              {Object.entries(PRIORITIES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </label>
          <label>
            Trạng thái
            <select value={form.status} onChange={set('status')} disabled={saving}>
              {Object.entries(STATUSES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </label>
          <label>
            Danh mục
            <select value={form.category} onChange={set('category')} disabled={saving}>
              {Object.entries(CATEGORIES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </label>
        </div>
        <div className="modal-foot">
          <button type="button" className="btn" onClick={onClose} disabled={saving}>
            Hủy
          </button>
          <button type="submit" className="btn primary" disabled={saving}>
            {saving && <span className="spinner-ring xs" />}
            <span>{saving ? 'Đang lưu…' : 'Lưu'}</span>
          </button>
        </div>
      </form>
    </div>
  )
}
