import { signOut } from 'firebase/auth'
import {
  BarChart3, CalendarDays, ChevronDown, Home, Settings, X,
} from 'lucide-react'
import { auth } from '../firebase'
import { GoogleLogoIcon, PlannerLogoIcon } from './Icons'

const ITEMS = [
  { id: 'dashboard', label: 'Trang chủ', icon: Home },
  { id: 'calendar', label: 'Lịch tháng', icon: CalendarDays },
  { id: 'statistics', label: 'Thống kê', icon: BarChart3 },
  { id: 'settings', label: 'Cài đặt', icon: Settings },
]

export default function Sidebar({ page, onNavigate, user, drawerOpen, onCloseDrawer }) {
  const rocketBg = `${import.meta.env.BASE_URL}rocket-card.jpg`

  return (
    <aside className={`sidebar ${drawerOpen ? 'drawer-open' : ''}`}>
      <button
        type="button"
        className="drawer-close-btn"
        onClick={onCloseDrawer}
        aria-label="Đóng menu"
      >
        <X size={18} />
      </button>

      <div className="brand-block">
        <div className="brand-logo-wrap">
          <PlannerLogoIcon size={56} />
        </div>
        <div className="brand-text">
          <strong>Personal<br />Daily Planner</strong>
          <small>Plan • Focus • Achieve</small>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Điều hướng chính">
        {ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            className={`nav-item ${page === id ? 'active' : ''}`}
            onClick={() => onNavigate(id)}
          >
            <Icon size={19} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-user">
        <button
          type="button"
          className="account-trigger"
          onClick={() => onNavigate('settings')}
          title="Cài đặt tài khoản"
        >
          {user.photoURL ? (
            <img src={user.photoURL} alt="" referrerPolicy="no-referrer" />
          ) : (
            <div className="avatar-fallback">{(user.displayName || user.email || 'U')[0].toUpperCase()}</div>
          )}
          <div className="account-info">
            <strong>{user.displayName || 'Người dùng'}</strong>
          </div>
          <ChevronDown size={15} className="account-caret" />
        </button>

        <button type="button" className="btn-logout" onClick={() => signOut(auth)}>
          <span className="google-badge"><GoogleLogoIcon size={14} /></span>
          <span>Đăng xuất</span>
        </button>
      </div>

      <div
        className="sidebar-quote"
        style={{ backgroundImage: `url('${rocketBg}')` }}
      >
        <div className="sidebar-quote-overlay">
          <p>“Mỗi ngày là một cơ hội để tốt hơn!”</p>
        </div>
      </div>
    </aside>
  )
}
