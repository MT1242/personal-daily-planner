import { signOut } from 'firebase/auth'
import { Moon, Sun } from 'lucide-react'
import { auth } from '../firebase'
import { GoogleLogoIcon } from '../components/Icons'

export default function Settings({ user, theme, setTheme }) {
  return (
    <div className="page narrow">
      <header className="page-head fade-up"><h1>Cài đặt</h1></header>

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
    </div>
  )
}
