import { useState } from 'react'
import { signInWithPopup } from 'firebase/auth'
import { BarChart3, CalendarCheck2, CalendarDays, Check, Cloud, Heart } from 'lucide-react'
import { auth, googleProvider } from '../firebase'
import {
  BrushUnderlineSvg, GoogleLogoIcon, LoginSparkleLogoIcon, ShieldLockIcon,
} from '../components/Icons'

function getAuthErrorMessage(err) {
  const code = err?.code || ''
  if (code === 'auth/configuration-not-found' || code === 'auth/operation-not-allowed') {
    return `Lỗi (${code}): Bạn chưa bật Google Sign-In trong mục Authentication trên Firebase Console.`
  }
  if (code === 'auth/unauthorized-domain') {
    return `Lỗi (${code}): Tên miền "${window.location.hostname}" chưa được thêm vào Authorized domains trên Firebase Console.`
  }
  if (code === 'auth/popup-blocked') {
    return 'Trình duyệt đã chặn cửa sổ bật lên (Popup). Vui lòng cho phép popup cho trang này.'
  }
  if (code === 'auth/popup-closed-by-user') {
    return 'Bạn đã đóng cửa sổ đăng nhập trước khi hoàn tất.'
  }
  if (code === 'auth/invalid-api-key') {
    return 'API Key Firebase không hợp lệ. Hãy kiểm tra file .env và khởi động lại npm run dev.'
  }
  return `Không đăng nhập được (${code || err?.message || 'Lỗi không xác định'}).`
}

const FEATURES = [
  { icon: Check, lines: ['Quản lý', 'công việc'] },
  { icon: CalendarDays, lines: ['Lịch linh hoạt', 'ngày/tuần/tháng'] },
  { icon: BarChart3, lines: ['Theo dõi', 'tiến độ'] },
  { icon: Cloud, lines: ['Đồng bộ', 'đám mây'] },
]

export default function Login() {
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const bgUrl = `${import.meta.env.BASE_URL}login-bg.jpg`

  const login = async () => {
    if (busy) return
    setError('')
    setBusy(true)
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (e) {
      setError(getAuthErrorMessage(e))
      console.error(e)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div
      className="login-showcase"
      style={{ backgroundImage: `url('${bgUrl}')` }}
    >
      <div className="login-backdrop" />

      <div className="login-container">
        {/* LEFT SHOWCASE CONTENT */}
        <section className="login-hero fade-up">
          <div className="login-brand">
            <div className="login-brand-icon">
              <CalendarCheck2 size={28} />
            </div>
            <div>
              <strong>Personal Daily Planner</strong>
              <span>Plan • Focus • Achieve</span>
            </div>
          </div>

          <h1 className="login-headline">
            <span>Lên kế hoạch hôm nay,</span>
            <br />
            <span>
              kiến tạo{' '}
              <em className="underline-wrap">
                ngày mai tốt hơn!
                <BrushUnderlineSvg />
              </em>
            </span>
          </h1>

          <p className="login-lead">
            Ứng dụng quản lý công việc cá nhân hiện đại,
            <br />
            đồng bộ trên mọi thiết bị với tài khoản Google.
          </p>

          <div className="login-features">
            {FEATURES.map(({ icon: Icon, lines }, idx) => (
              <div key={idx} className="login-feat-item">
                <div className="login-feat-circle">
                  <Icon size={18} strokeWidth={2.5} />
                </div>
                <div className="login-feat-text">
                  <span>{lines[0]}</span>
                  <span>{lines[1]}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RIGHT FLOATING LOGIN CARD */}
        <section className="login-card-modern fade-up delay-1">
          <div className="login-card-logo">
            <LoginSparkleLogoIcon size={82} />
          </div>

          <h2>Đăng nhập để bắt đầu</h2>
          <p className="login-card-sub">
            Sử dụng tài khoản Google của bạn
            <br />
            để truy cập Personal Daily Planner
          </p>

          <button
            type="button"
            className="login-google-cta"
            onClick={login}
            disabled={busy}
          >
            <span className="google-circle">
              {busy ? <span className="spinner-ring sm" /> : <GoogleLogoIcon size={20} />}
            </span>
            <span>{busy ? 'Đang kết nối Google…' : 'Tiếp tục với Google'}</span>
          </button>

          {error && <p className="error">{error}</p>}

          <div className="login-divider">
            <span>hoặc</span>
          </div>

          <div className="login-security-box">
            <ShieldLockIcon size={28} />
            <p>
              Dữ liệu của bạn được bảo vệ an toàn
              <br />
              và chỉ bạn mới có thể truy cập.
            </p>
          </div>

          <div className="login-card-foot">
            <Heart size={14} className="heart-icon" fill="#f43f5e" stroke="#f43f5e" />
            <span>Personal Daily Planner v2.0</span>
          </div>
        </section>
      </div>
    </div>
  )
}
