import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import {
  BarChart3, Bell, CalendarDays, Home, Menu, Moon, Plus, Settings as SettingsIcon, Sun,
} from 'lucide-react'
import { auth } from './firebase'
import { useTasks, useTheme } from './hooks'
import { todayStr } from './utils'
import { PlannerLogoIcon, SplashLoader } from './components/Icons'
import Sidebar from './components/Sidebar'
import TaskModal from './components/TaskModal'
import WeatherWidget from './components/WeatherWidget'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Calendar from './pages/Calendar'
import Statistics from './pages/Statistics'
import Settings from './pages/Settings'

export default function App() {
  const [user, setUser] = useState(undefined) // undefined = đang kiểm tra
  const [theme, setTheme] = useTheme()

  useEffect(() => onAuthStateChanged(auth, (u) => setUser(u)), [])

  if (user === undefined) return <SplashLoader text="Đang khởi tạo hệ thống…" />
  if (!user) return <Login />
  return <Planner user={user} theme={theme} setTheme={setTheme} />
}

function Planner({ user, theme, setTheme }) {
  const [page, setPage] = useState('dashboard')
  const [modal, setModal] = useState(null) // { task?, date }
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { tasks, loading, dbError, add, update, remove } = useTasks(user.uid)

  const today = todayStr()
  const pendingTodayCount = tasks.filter(
    (t) => t.date <= today && ['pending', 'in_progress'].includes(t.status)
  ).length

  const navigate = (nextPage) => {
    setPage(nextPage)
    setDrawerOpen(false)
  }

  const actions = {
    onToggle: (t) => update(t.id, { status: t.status === 'completed' ? 'pending' : 'completed' }),
    onEdit: (t) => setModal({ task: t, date: t.date }),
    onDelete: (t) => window.confirm(`Xóa “${t.title}”?`) && remove(t.id),
  }

  const save = async (data) => {
    const editingTask = modal?.task
    setModal(null)
    if (editingTask) await update(editingTask.id, data)
    else await add(data)
  }

  return (
    <div className="shell">
      {drawerOpen && (
        <div
          className="drawer-backdrop fade-in"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      <Sidebar
        page={page}
        onNavigate={navigate}
        onAdd={() => {
          setDrawerOpen(false)
          setModal({ date: todayStr() })
        }}
        user={user}
        drawerOpen={drawerOpen}
        onCloseDrawer={() => setDrawerOpen(false)}
      />

      <div className="workspace">
        <header className="topbar">
          <div className="topbar-inner">
            <div className="topbar-left">
              <button
                type="button"
                className="mobile-menu-btn"
                onClick={() => setDrawerOpen(true)}
                aria-label="Mở menu điều hướng"
              >
                <Menu size={20} />
              </button>

              <div className="mobile-brand" onClick={() => navigate('dashboard')}>
                <PlannerLogoIcon size={32} />
                <strong>Daily Planner</strong>
              </div>

              <button
                type="button"
                className="btn primary top-add-btn"
                onClick={() => setModal({ date: todayStr() })}
              >
                <Plus size={17} />
                <span className="add-btn-text">Thêm công việc</span>
              </button>
            </div>

            <div className="topbar-right">
              <WeatherWidget variant="topbar" />

              <button
                type="button"
                className="notif-btn"
                onClick={() => navigate('dashboard')}
                title={`${pendingTodayCount} công việc cần hoàn thành`}
                aria-label="Thông báo công việc"
              >
                <Bell size={19} />
                {pendingTodayCount > 0 && <span className="notif-badge">{pendingTodayCount}</span>}
              </button>

              <div className="theme-switch" role="group" aria-label="Chế độ giao diện">
                <button
                  type="button"
                  className={theme === 'light' ? 'active' : ''}
                  onClick={() => setTheme('light')}
                  title="Giao diện Sáng"
                  aria-label="Giao diện Sáng"
                >
                  <Sun size={16} />
                </button>
                <button
                  type="button"
                  className={theme === 'dark' ? 'active' : ''}
                  onClick={() => setTheme('dark')}
                  title="Giao diện Tối"
                  aria-label="Giao diện Tối"
                >
                  <Moon size={16} />
                </button>
              </div>
            </div>
          </div>
        </header>

        <main>
          {dbError && <div className="card error-banner">{dbError}</div>}
          {loading ? (
            <SplashLoader inline text="Đang đồng bộ dữ liệu đám mây…" />
          ) : (
            <div key={page} className="page-transition">
              {page === 'dashboard' && (
                <Dashboard
                  tasks={tasks}
                  user={user}
                  actions={actions}
                  onAdd={(d) => setModal({ date: d || todayStr() })}
                  onNavigate={navigate}
                />
              )}
              {page === 'calendar' && (
                <Calendar
                  tasks={tasks}
                  actions={actions}
                  onAdd={(d) => setModal({ date: d })}
                />
              )}
              {page === 'statistics' && <Statistics tasks={tasks} />}
              {page === 'settings' && <Settings user={user} theme={theme} setTheme={setTheme} />}
            </div>
          )}
        </main>

        <nav className="mobile-bottom-nav" aria-label="Điều hướng di động">
          <button
            type="button"
            className={page === 'dashboard' ? 'active' : ''}
            onClick={() => navigate('dashboard')}
          >
            <Home size={19} />
            <span>Trang chủ</span>
          </button>
          <button
            type="button"
            className={page === 'calendar' ? 'active' : ''}
            onClick={() => navigate('calendar')}
          >
            <CalendarDays size={19} />
            <span>Lịch tháng</span>
          </button>
          <button
            type="button"
            className={page === 'statistics' ? 'active' : ''}
            onClick={() => navigate('statistics')}
          >
            <BarChart3 size={19} />
            <span>Thống kê</span>
          </button>
          <button
            type="button"
            className={page === 'settings' ? 'active' : ''}
            onClick={() => navigate('settings')}
          >
            <SettingsIcon size={19} />
            <span>Cài đặt</span>
          </button>
        </nav>
      </div>

      {modal && (
        <TaskModal
          task={modal.task}
          tasks={tasks}
          defaultDate={modal.date}
          onSave={save}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  )
}
