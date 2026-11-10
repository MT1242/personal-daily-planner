export const pad = (n) => String(n).padStart(2, '0')
export const fmt = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
export const todayStr = () => fmt(new Date())

export const PRIORITIES = { high: 'Cao', medium: 'Trung bình', low: 'Thấp' }
export const STATUSES = {
  pending: 'Chưa thực hiện',
  in_progress: 'Đang thực hiện',
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy',
}
export const CATEGORIES = {
  work: 'Công việc',
  learning: 'Học tập',
  personal: 'Cá nhân',
  health: 'Sức khỏe',
}
export const WEEKDAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']

// Lưới tháng 6 tuần, bắt đầu từ thứ Hai
export function monthGrid(year, month) {
  const offset = (new Date(year, month, 1).getDay() + 6) % 7
  return Array.from({ length: 42 }, (_, i) => new Date(year, month, 1 - offset + i))
}

export function weekDays(date) {
  const offset = (date.getDay() + 6) % 7
  return Array.from({ length: 7 }, (_, i) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate() - offset + i)
  )
}

export const byTime = (a, b) => (a.startTime || '99:99').localeCompare(b.startTime || '99:99')
