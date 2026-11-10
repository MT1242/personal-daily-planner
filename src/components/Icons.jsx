import React from 'react'

export function SunIllustration({ className = '' }) {
  return (
    <svg className={`sun-svg ${className}`} viewBox="0 0 88 88" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.9" />
          <stop offset="65%" stopColor="#FACC15" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sunCore" x1="20" y1="20" x2="68" y2="68" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="45%" stopColor="#FACC15" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <circle cx="44" cy="44" r="42" fill="url(#sunGlow)" className="sun-pulse" />
      <g className="sun-rays" stroke="#FDE047" strokeWidth="4" strokeLinecap="round">
        <line x1="44" y1="6" x2="44" y2="14" />
        <line x1="44" y1="74" x2="44" y2="82" />
        <line x1="6" y1="44" x2="14" y2="44" />
        <line x1="74" y1="44" x2="82" y2="44" />
        <line x1="17" y1="17" x2="23" y2="23" />
        <line x1="65" y1="65" x2="71" y2="71" />
        <line x1="71" y1="17" x2="65" y2="23" />
        <line x1="23" y1="65" x2="17" y2="71" />
      </g>
      <circle cx="44" cy="44" r="22" fill="url(#sunCore)" stroke="#FEF9C3" strokeWidth="2" />
    </svg>
  )
}

export function WavingHandIcon({ size = 28 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      className="wave-hand-svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="handGrad" x1="6" y1="4" x2="30" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="55%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>
      <path
        d="M8.5 11.5C7.2 10.2 7.2 8.1 8.5 6.8"
        stroke="#FDE047"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M27.5 8.5C29 10 29 12.4 27.5 13.9"
        stroke="#FDE047"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M17.2 5.4C17.9 4.7 19.1 4.7 19.8 5.4C20.5 6.1 20.5 7.3 19.8 8L15.5 12.3L21.6 6.2C22.3 5.5 23.5 5.5 24.2 6.2C24.9 6.9 24.9 8.1 24.2 8.8L18.4 14.6L24.8 8.2C25.5 7.5 26.7 7.5 27.4 8.2C28.1 8.9 28.1 10.1 27.4 10.8L20.8 17.4L25.4 12.8C26.1 12.1 27.3 12.1 28 12.8C28.7 13.5 28.7 14.7 28 15.4L20.4 23C17.1 26.3 11.7 26.3 8.4 23C5.1 19.7 5.1 14.3 8.4 11L13.2 6.2C13.9 5.5 15.1 5.5 15.8 6.2C16.5 6.9 16.5 8.1 15.8 8.8L11.8 12.8C11.4 13.2 12 13.8 12.4 13.4L17.2 5.4Z"
        fill="url(#handGrad)"
      />
    </svg>
  )
}

export function GoogleLogoIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

export function PlannerLogoIcon({ size = 54 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="logoBg" x1="8" y1="8" x2="56" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="logoTop" x1="8" y1="10" x2="56" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <rect x="8" y="12" width="48" height="44" rx="13" fill="url(#logoBg)" />
      <path d="M8 24C8 17.3726 13.3726 12 20 12H44C50.6274 12 56 17.3726 56 24V25H8V24Z" fill="url(#logoTop)" />
      <rect x="20" y="6" width="6" height="12" rx="3" fill="#E0F2FE" />
      <rect x="38" y="6" width="6" height="12" rx="3" fill="#E0F2FE" />
      <rect x="14" y="23" width="36" height="27" rx="8" fill="#EFF6FF" />
      <path
        d="M24 36.5L30 42.5L41 30.5"
        stroke="#2563EB"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function KpiWaveGraphic() {
  return (
    <svg className="kpi-watermark" viewBox="0 0 120 70" fill="none" aria-hidden="true">
      <path
        d="M10 70C22 42 32 28 45 48C56 64 66 14 80 34C92 50 102 22 116 70H10Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function KpiBarsGraphic() {
  return (
    <svg className="kpi-watermark" viewBox="0 0 110 70" fill="none" aria-hidden="true">
      <rect x="14" y="38" width="14" height="32" rx="4" fill="currentColor" />
      <rect x="36" y="24" width="14" height="46" rx="4" fill="currentColor" />
      <rect x="58" y="10" width="14" height="60" rx="4" fill="currentColor" />
      <rect x="80" y="28" width="14" height="42" rx="4" fill="currentColor" />
    </svg>
  )
}

export function KpiHourglassGraphic() {
  return (
    <svg className="kpi-watermark" viewBox="0 0 90 76" fill="none" aria-hidden="true">
      <path
        d="M22 8H68M22 68H68M26 8C26 24 45 32 45 38C45 44 26 52 26 68H64C64 52 45 44 45 38C45 32 64 24 64 8H26Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function LoginSparkleLogoIcon({ size = 78 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 88 88" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="loginLogoGrad" x1="12" y1="16" x2="72" y2="76" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="55%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#9333EA" />
        </linearGradient>
      </defs>
      {/* Golden sparkle rays on top right */}
      <g stroke="#FBBF24" strokeWidth="3.5" strokeLinecap="round">
        <line x1="68" y1="14" x2="73" y2="6" />
        <line x1="74" y1="20" x2="83" y2="15" />
        <line x1="76" y1="28" x2="85" y2="27" />
      </g>
      {/* Calendar body */}
      <rect x="14" y="20" width="54" height="52" rx="14" fill="url(#loginLogoGrad)" />
      {/* Rings */}
      <rect x="27" y="13" width="6.5" height="14" rx="3.25" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
      <rect x="48.5" y="13" width="6.5" height="14" rx="3.25" fill="#6366F1" stroke="#FFFFFF" strokeWidth="2" />
      {/* Inner white card */}
      <rect x="20" y="32" width="42" height="33" rx="9" fill="#FFFFFF" />
      {/* Checkmark */}
      <path
        d="M31 48.5L38.5 55.5L51.5 41.5"
        stroke="url(#loginLogoGrad)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ShieldLockIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M16 3L5 7.5V15.2C5 22.1 9.7 28.4 16 30C22.3 28.4 27 22.1 27 15.2V7.5L16 3Z"
        fill="#3B82F6"
      />
      <rect x="12" y="15" width="8" height="6.5" rx="1.8" fill="#FFFFFF" />
      <path
        d="M13.5 15V13.2C13.5 11.8 14.6 10.7 16 10.7C17.4 10.7 18.5 11.8 18.5 13.2V15"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function BrushUnderlineSvg() {
  return (
    <svg className="hero-brush-underline" viewBox="0 0 260 18" fill="none" aria-hidden="true">
      <path
        d="M4 13.5C68 4.5 164 3.5 256 11.5"
        stroke="#FBBF24"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function SplashLoader({ text = 'Đang tải dữ liệu…', inline = false }) {
  if (inline) {
    return (
      <div className="skeleton-wrap" aria-live="polite">
        <div className="loader-header">
          <div className="spinner-ring sm" />
          <span>{text}</span>
        </div>
        <div className="skeleton-banner shimmer" />
        <div className="skeleton-kpis">
          <div className="skeleton-box shimmer" />
          <div className="skeleton-box shimmer" />
          <div className="skeleton-box shimmer" />
        </div>
        <div className="skeleton-grid">
          <div className="skeleton-main shimmer" />
          <div className="skeleton-side shimmer" />
        </div>
      </div>
    )
  }

  return (
    <div className="splash-screen" aria-live="polite">
      <div className="splash-card">
        <div className="splash-logo-wrap">
          <div className="spinner-ring" />
          <PlannerLogoIcon size={52} />
        </div>
        <strong>Personal Daily Planner</strong>
        <p>{text}</p>
        <div className="loading-dots">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  )
}

