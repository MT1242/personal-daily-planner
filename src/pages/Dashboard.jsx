import { useState } from 'react'
import {
  ArrowRight, BarChart2, Calendar as CalIcon, Check, CheckCircle2,
  ChevronLeft, ChevronRight, Clock, MoreHorizontal, PlusCircle,
} from 'lucide-react'
import TaskItem from '../components/TaskItem'
import WeatherWidget from '../components/WeatherWidget'
import {
  KpiBarsGraphic, KpiHourglassGraphic, KpiWaveGraphic,
  SunIllustration, WavingHandIcon,
} from '../components/Icons'
import { CATEGORIES, byTime, fmt, pad, todayStr, weekDays } from '../utils'

const MINI_WEEKDAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']

function monthGridSunday(year, month) {
  const offset = new Date(year, month, 1).getDay()
  return Array.from({ length: 35 }, (_, i) => new Date(year, month, 1 - offset + i))
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Chào buổi sáng'
  if (h < 18) return 'Chào buổi chiều'
  return 'Chào buổi tối'
}

function formatViDateBadge(d = new Date()) {
  const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy']
  return `${days[d.getDay()]}, ${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`
}

export default function Dashboard({ tasks, user, actions, onAdd, onNavigate }) {
  const today = todayStr()
  const [selectedDate, setSelectedDate] = useState(today)
  const [calCursor, setCalCursor] = useState(() => new Date())
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const matchFilter = (t) => {
    if (category !== 'all' && t.category !== category) return false
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      const inTitle = t.title?.toLowerCase().includes(q)
      const inDesc = t.description?.toLowerCase().includes(q)
      if (!inTitle && !inDesc) return false
    }
    return true
  }

  const allDayTasks = tasks.filter((t) => t.date === selectedDate).sort(byTime)
  const visibleDayTasks = allDayTasks.filter(matchFilter)
  const activeDayTasks = allDayTasks.filter((t) => t.status !== 'cancelled')
  const doneDayCount = activeDayTasks.filter((t) => t.status === 'completed').length
  const remainingDayCount = Math.max(0, activeDayTasks.length - doneDayCount)
  const dayPercent = activeDayTasks.length ? Math.round((doneDayCount / activeDayTasks.length) * 100) : 0

  // Thống kê tuần hiện tại
  const currentWeekDates = new Set(weekDays(new Date()).map(fmt))
  const weekTasks = tasks.filter((t) => currentWeekDates.has(t.date) && t.status !== 'cancelled')
  const weekDone = weekTasks.filter((t) => t.status === 'completed').length
  const weekRemaining = Math.max(0, weekTasks.length - weekDone)
  const weekPercent = weekTasks.length ? Math.round((weekDone / weekTasks.length) * 100) : 0

  const miniDays = monthGridSunday(calCursor.getFullYear(), calCursor.getMonth())
  const [selY, selM, selD] = selectedDate.split('-')
  const shortSelected = `${selD}/${selM}`
  const userName = user.displayName || 'Bạn'
  const heroBg = `${import.meta.env.BASE_URL}hero-banner.jpg`

  const stepMonth = (dir) => {
    const next = new Date(calCursor)
    next.setMonth(next.getMonth() + dir)
    setCalCursor(next)
  }

  return (
    <div className="page">
      {/* HERO BANNER */}
      <section
        className="hero-banner fade-up"
        style={{ backgroundImage: `url('${heroBg}')` }}
      >
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-title-row">
            <SunIllustration />
            <div className="hero-text">
              <h1>
                {getGreeting()}, {userName}!{' '}
                <span className="inline-wave"><WavingHandIcon size={28} /></span>
              </h1>
              <p>Hãy hoàn thành những công việc quan trọng trong ngày nhé!</p>
            </div>
          </div>
          <div className="hero-badges-row">
            <div className="hero-date-pill">
              <CalIcon size={15} />
              <span>{formatViDateBadge(new Date())}</span>
            </div>
            <WeatherWidget variant="hero" />
          </div>
        </div>
      </section>

      {/* 3 KPI CARDS */}
      <div className="kpi-row fade-up delay-1">
        <div className="kpi-box blue">
          <div className="kpi-icon blue">
            <Check size={24} strokeWidth={3} />
          </div>
          <div className="kpi-info">
            <strong>{activeDayTasks.length}</strong>
            <span>Tổng công việc</span>
          </div>
          <KpiWaveGraphic />
        </div>

        <div className="kpi-box green">
          <div className="kpi-icon green">
            <CheckCircle2 size={24} strokeWidth={2.5} />
          </div>
          <div className="kpi-info">
            <strong>{doneDayCount}</strong>
            <span>Đã hoàn thành</span>
          </div>
          <KpiBarsGraphic />
        </div>

        <div className="kpi-box orange">
          <div className="kpi-icon orange">
            <Clock size={24} strokeWidth={2.5} />
          </div>
          <div className="kpi-info">
            <strong>{remainingDayCount}</strong>
            <span>Còn lại</span>
          </div>
          <KpiHourglassGraphic />
        </div>
      </div>

      {/* MAIN 2-COLUMN DASHBOARD */}
      <div className="grid-dashboard fade-up delay-2">
        {/* LEFT COLUMN: TODAY SCHEDULE */}
        <section className="card schedule-card">
          <div className="schedule-head">
            <div className="schedule-title">
              <span className="title-check"><Check size={17} strokeWidth={3} /></span>
              <h2>{selectedDate === today ? 'Lịch trình hôm nay' : `Lịch trình ${shortSelected}/${selY}`}</h2>
            </div>

            <div className="schedule-controls">
              {selectedDate !== today && (
                <button
                  type="button"
                  className="btn sm"
                  onClick={() => setSelectedDate(today)}
                >
                  Hôm nay
                </button>
              )}
              <span className="date-chip">
                <CalIcon size={14} />
                {shortSelected}
              </span>
              <button
                type="button"
                className={`more-btn ${showFilters ? 'active' : ''}`}
                onClick={() => setShowFilters((v) => !v)}
                title="Tìm kiếm & Lọc công việc"
                aria-label="Tìm kiếm & Lọc công việc"
              >
                <MoreHorizontal size={17} />
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="filter-bar fade-in">
              <input
                type="search"
                className="filter-input"
                placeholder="Tìm nhanh tiêu đề, ghi chú…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="filter-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="all">Tất cả danh mục</option>
                {Object.entries(CATEGORIES).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
          )}

          <div className="task-list">
            {visibleDayTasks.length === 0 ? (
              <p className="empty">
                {allDayTasks.length === 0
                  ? 'Chưa có công việc nào trong ngày này. Nhấn “Thêm công việc mới” bên dưới để bắt đầu.'
                  : 'Không có công việc nào khớp bộ lọc tìm kiếm.'}
              </p>
            ) : (
              visibleDayTasks.map((t) => <TaskItem key={t.id} task={t} {...actions} />)
            )}
          </div>

          <div className="schedule-progress">
            <div className="progress-head">
              <span><BarChart2 size={17} className="accent-icon" /> Tiến độ hôm nay</span>
              <strong>{dayPercent}%</strong>
            </div>
            <div className="progress-bar-track">
              <div className="progress-bar-fill" style={{ width: `${dayPercent}%` }} />
            </div>
          </div>

          <button
            type="button"
            className="add-banner-btn"
            onClick={() => onAdd(selectedDate)}
          >
            <div className="add-banner-main">
              <PlusCircle size={20} />
              <strong>Thêm công việc mới</strong>
            </div>
            <small>Tạo lịch trình cho ngày {selectedDate === today ? 'hôm nay' : shortSelected}</small>
          </button>
        </section>

        {/* RIGHT COLUMN: MINI CALENDAR + WEEKLY STATS */}
        <div className="stack">
          <section className="card mini-cal-card">
            <div className="card-head">
              <h2 className="icon-heading">
                <span className="section-icon-badge"><CalIcon size={15} /></span>
                <span>Lịch tháng {pad(calCursor.getMonth() + 1)}/{calCursor.getFullYear()}</span>
              </h2>
              <div className="cal-nav-btns">
                <button
                  type="button"
                  className="nav-square-btn"
                  onClick={() => stepMonth(-1)}
                  aria-label="Tháng trước"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  className="nav-square-btn"
                  onClick={() => stepMonth(1)}
                  aria-label="Tháng sau"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="mini-cal">
              {MINI_WEEKDAYS.map((w, idx) => (
                <div key={w} className={`mini-cal-h ${idx === 5 ? 'highlight' : ''}`}>{w}</div>
              ))}
              {miniDays.map((d) => {
                const key = fmt(d)
                const out = d.getMonth() !== calCursor.getMonth()
                const hasTasks = tasks.some((t) => t.date === key && t.status !== 'cancelled')
                return (
                  <button
                    key={key}
                    type="button"
                    className={`mini-cal-d ${out ? 'out' : ''} ${key === today ? 'today' : ''} ${key === selectedDate ? 'sel' : ''}`}
                    onClick={() => setSelectedDate(key)}
                  >
                    <span>{d.getDate()}</span>
                    {hasTasks && <i className="mini-dot" />}
                  </button>
                )
              })}
            </div>
          </section>

          <section className="card weekly-card">
            <div className="card-head">
              <h2 className="icon-heading">
                <span className="section-icon-badge"><BarChart2 size={15} /></span>
                <span>Thống kê tuần này</span>
              </h2>
              <button
                type="button"
                className="link-btn"
                onClick={() => onNavigate('statistics')}
              >
                <span>Xem chi tiết</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="weekly-body">
              <div className="ring green-ring" style={{ '--p': weekPercent }}>
                <span>{weekPercent}%</span>
              </div>
              <div className="weekly-legend">
                <div className="legend-row">
                  <span><i className="dot green" /> Hoàn thành</span>
                  <strong>{weekDone}</strong>
                </div>
                <div className="legend-row">
                  <span><i className="dot gray" /> Còn lại</span>
                  <strong>{weekRemaining}</strong>
                </div>
                <div className="legend-row total">
                  <span>Tổng cộng</span>
                  <strong>{weekTasks.length}</strong>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
