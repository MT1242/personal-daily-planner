import { Check, CheckCircle2, TrendingUp } from 'lucide-react'
import {
  KpiBarsGraphic, KpiHourglassGraphic, KpiWaveGraphic,
} from '../components/Icons'
import { CATEGORIES, PRIORITIES, STATUSES, fmt } from '../utils'

export default function Statistics({ tasks }) {
  const valid = tasks.filter((t) => t.status !== 'cancelled')
  const done = valid.filter((t) => t.status === 'completed')
  const rate = valid.length ? Math.round((done.length / valid.length) * 100) : 0

  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    const key = fmt(d)
    return { label: `${d.getDate()}/${d.getMonth() + 1}`, count: done.filter((t) => t.date === key).length }
  })
  const max = Math.max(1, ...last7.map((d) => d.count))

  return (
    <div className="page">
      <header className="page-head fade-up">
        <h1>Thống kê hiệu suất</h1>
      </header>

      <div className="kpi-row fade-up delay-1">
        <div className="kpi-box blue">
          <div className="kpi-icon blue">
            <Check size={24} strokeWidth={3} />
          </div>
          <div className="kpi-info">
            <strong>{tasks.length}</strong>
            <span>Tổng công việc</span>
          </div>
          <KpiWaveGraphic />
        </div>

        <div className="kpi-box green">
          <div className="kpi-icon green">
            <CheckCircle2 size={24} strokeWidth={2.5} />
          </div>
          <div className="kpi-info">
            <strong>{done.length}</strong>
            <span>Đã hoàn thành</span>
          </div>
          <KpiBarsGraphic />
        </div>

        <div className="kpi-box orange">
          <div className="kpi-icon orange">
            <TrendingUp size={24} strokeWidth={2.5} />
          </div>
          <div className="kpi-info">
            <strong>{rate}%</strong>
            <span>Tỷ lệ hoàn thành</span>
          </div>
          <KpiHourglassGraphic />
        </div>
      </div>

      <div className="grid-2 fade-up delay-2">
        <section className="card">
          <h2>Hoàn thành 7 ngày qua</h2>
          <div className="bars">
            {last7.map((d) => (
              <div key={d.label} className="bar">
                <span className="bar-val">{d.count}</span>
                <div className="bar-fill" style={{ height: `${(d.count / max) * 100}%` }} />
                <small>{d.label}</small>
              </div>
            ))}
          </div>
          <h2 className="gap">Theo danh mục</h2>
          {Object.entries(CATEGORIES).map(([k, v]) => {
            const n = tasks.filter((t) => t.category === k).length
            return <Meter key={k} label={v} n={n} total={tasks.length} />
          })}
        </section>

        <section className="card">
          <h2>Theo trạng thái</h2>
          {Object.entries(STATUSES).map(([k, v]) => {
            const n = tasks.filter((t) => t.status === k).length
            return <Meter key={k} label={v} n={n} total={tasks.length} />
          })}
          <h2 className="gap">Theo mức ưu tiên</h2>
          {Object.entries(PRIORITIES).map(([k, v]) => {
            const n = tasks.filter((t) => t.priority === k).length
            return <Meter key={k} label={v} n={n} total={tasks.length} cls={k} />
          })}
        </section>
      </div>
    </div>
  )
}

function Meter({ label, n, total, cls = '' }) {
  return (
    <div className="meter">
      <div><span>{label}</span><b>{n}</b></div>
      <div className="track"><div className={`fill ${cls}`} style={{ width: `${total ? (n / total) * 100 : 0}%` }} /></div>
    </div>
  )
}
