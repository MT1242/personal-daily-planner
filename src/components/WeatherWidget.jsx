import { useEffect, useRef, useState } from 'react'
import { Droplets, MapPin, Navigation, RefreshCw, Wind } from 'lucide-react'

const CITIES = [
  { id: 'hn', name: 'Hà Nội', lat: 21.0285, lon: 105.8542 },
  { id: 'hcm', name: 'TP. Hồ Chí Minh', lat: 10.8231, lon: 106.6297 },
  { id: 'tn', name: 'Thái Nguyên', lat: 21.5942, lon: 105.8482 },
  { id: 'dn', name: 'Đà Nẵng', lat: 16.0544, lon: 108.2022 },
  { id: 'hp', name: 'Hải Phòng', lat: 20.8449, lon: 106.6881 },
  { id: 'ct', name: 'Cần Thơ', lat: 10.0452, lon: 105.7469 },
  { id: 'hue', name: 'Huế', lat: 16.4637, lon: 107.5909 },
  { id: 'dl', name: 'Đà Lạt', lat: 11.9404, lon: 108.4583 },
]

function decodeWeather(code, isDay = 1) {
  if (code === 0) return { label: isDay ? 'Trời quang đãng' : 'Đêm quang đãng', type: isDay ? 'clear' : 'night' }
  if ([1, 2].includes(code)) return { label: 'Ít mây, nắng nhẹ', type: 'partly' }
  if (code === 3) return { label: 'Nhiều mây', type: 'cloudy' }
  if ([45, 48].includes(code)) return { label: 'Có sương mù', type: 'cloudy' }
  if ([51, 53, 55, 61, 63, 80, 81].includes(code)) return { label: 'Có mưa rào', type: 'rain' }
  if ([65, 82].includes(code)) return { label: 'Mưa lớn', type: 'rain' }
  if ([95, 96, 99].includes(code)) return { label: 'Mưa dông', type: 'storm' }
  return { label: 'Thời tiết ổn định', type: 'partly' }
}

// ==================== SHARED GLOBAL WEATHER STORE ====================
function getInitialLoc() {
  try {
    const saved = localStorage.getItem('planner_weather_loc')
    return saved ? JSON.parse(saved) : CITIES[0]
  } catch {
    return CITIES[0]
  }
}

const store = {
  loc: getInitialLoc(),
  weather: null,
  loading: true,
  listeners: new Set(),
}

function notifyStore() {
  const snapshot = {
    loc: store.loc,
    weather: store.weather,
    loading: store.loading,
  }
  store.listeners.forEach((fn) => fn(snapshot))
}

async function fetchSharedWeather(targetLoc = store.loc) {
  store.loading = true
  notifyStore()
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${targetLoc.lat}&longitude=${targetLoc.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,is_day&timezone=auto`
    const res = await fetch(url)
    const data = await res.json()
    if (data?.current) {
      const info = decodeWeather(data.current.weather_code, data.current.is_day)
      store.weather = {
        temp: Math.round(data.current.temperature_2m),
        feelsLike: Math.round(data.current.apparent_temperature),
        humidity: data.current.relative_humidity_2m,
        wind: Math.round(data.current.wind_speed_10m),
        ...info,
      }
    }
  } catch (e) {
    console.warn('Weather fetch error:', e)
  } finally {
    store.loading = false
    notifyStore()
  }
}

function setSharedLocation(nextLoc) {
  store.loc = nextLoc
  try {
    localStorage.setItem('planner_weather_loc', JSON.stringify(nextLoc))
  } catch {
    // ignore
  }
  fetchSharedWeather(nextLoc)
}

let initialized = false

function useSharedWeather() {
  const [state, setState] = useState({
    loc: store.loc,
    weather: store.weather,
    loading: store.loading,
  })

  useEffect(() => {
    store.listeners.add(setState)
    if (!initialized) {
      initialized = true
      fetchSharedWeather(store.loc)
      setInterval(() => fetchSharedWeather(store.loc), 15 * 60 * 1000)
    }
    return () => {
      store.listeners.delete(setState)
    }
  }, [])

  return state
}

export function WeatherSvgIcon({ type = 'partly', size = 34 }) {
  if (type === 'clear') {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="24" cy="24" r="12" fill="url(#wSun)" />
        <g stroke="#FACC15" strokeWidth="3" strokeLinecap="round">
          <line x1="24" y1="4" x2="24" y2="8" />
          <line x1="24" y1="40" x2="24" y2="44" />
          <line x1="4" y1="24" x2="8" y2="24" />
          <line x1="40" y1="24" x2="44" y2="24" />
          <line x1="9.8" y1="9.8" x2="12.7" y2="12.7" />
          <line x1="35.3" y1="35.3" x2="38.2" y2="38.2" />
          <line x1="38.2" y1="9.8" x2="35.3" y2="12.7" />
          <line x1="12.7" y1="35.3" x2="9.8" y2="38.2" />
        </g>
        <defs>
          <linearGradient id="wSun" x1="12" y1="12" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FEF08A" />
            <stop offset="1" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
      </svg>
    )
  }

  if (type === 'rain' || type === 'storm') {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path
          d="M14 31H34C38.4 31 42 27.4 42 23C42 18.9 38.9 15.5 34.9 15.1C33.4 9.9 28.6 6 23 6C16.1 6 10.5 11.6 10.5 18.5C10.5 18.8 10.5 19.1 10.6 19.4C7.9 20.5 6 23.1 6 26.2C6 28.9 8.1 31 10.8 31H14Z"
          fill="url(#wCloudRain)"
        />
        {type === 'storm' ? (
          <path d="M25 28L19 37H25L23 45L31 35H25L25 28Z" fill="#FACC15" />
        ) : (
          <g stroke="#60A5FA" strokeWidth="2.8" strokeLinecap="round">
            <line x1="16" y1="35" x2="14" y2="42" />
            <line x1="24" y1="35" x2="22" y2="42" />
            <line x1="32" y1="35" x2="30" y2="42" />
          </g>
        )}
        <defs>
          <linearGradient id="wCloudRain" x1="8" y1="8" x2="40" y2="31" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E2E8F0" />
            <stop offset="1" stopColor="#94A3B8" />
          </linearGradient>
        </defs>
      </svg>
    )
  }

  if (type === 'night') {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path
          d="M31.5 29.8C24.6 29.8 19 24.2 19 17.3C19 13.7 20.5 10.5 23 8.2C15.5 9.2 9.8 15.6 9.8 23.4C9.8 31.9 16.7 38.8 25.2 38.8C31.7 38.8 37.3 34.7 39.5 29C37.1 29.5 34.4 29.8 31.5 29.8Z"
          fill="#FDE047"
        />
        <circle cx="35" cy="14" r="1.8" fill="#FEF08A" />
        <circle cx="40" cy="20" r="1.3" fill="#FEF08A" />
      </svg>
    )
  }

  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="19" cy="18" r="9" fill="#FACC15" />
      <path
        d="M16 35H35C38.9 35 42 31.9 42 28C42 24.3 39.2 21.3 35.6 21C34.2 16.4 30 13 25 13C18.9 13 14 17.9 14 24C14 24.3 14 24.6 14.1 24.9C11.7 25.8 10 28.1 10 30.8C10 33.1 11.9 35 14.2 35H16Z"
        fill="url(#wCloud)"
      />
      <defs>
        <linearGradient id="wCloud" x1="12" y1="14" x2="40" y2="35" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#CBD5E1" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function WeatherWidget({ variant = 'hero' }) {
  const { loc, weather, loading } = useSharedWeather()
  const [openMenu, setOpenMenu] = useState(false)
  const wrapRef = useRef(null)

  // Tự động đóng menu khi click ra ngoài
  useEffect(() => {
    if (!openMenu) return
    const onDocClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpenMenu(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [openMenu])

  const selectCity = (city) => {
    setSharedLocation(city)
    setOpenMenu(false)
  }

  const detectGps = () => {
    if (!navigator.geolocation) return
    store.loading = true
    notifyStore()
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = Number(pos.coords.latitude.toFixed(4))
        const lon = Number(pos.coords.longitude.toFixed(4))
        let name = 'Vị trí của bạn'
        try {
          const r = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=vi`
          )
          const g = await r.json()
          name = (g.city || g.locality || g.principalSubdivision || 'Vị trí của bạn')
            .replace(/^Tỉnh\s+/i, '')
            .replace(/^Thành phố\s+/i, '')
        } catch {
          // fallback name
        }
        selectCity({ id: 'gps', name, lat, lon })
      },
      () => {
        store.loading = false
        notifyStore()
        setOpenMenu(false)
      },
      { timeout: 6000 }
    )
  }

  if (variant === 'topbar') {
    return (
      <div className="weather-top-wrap" ref={wrapRef}>
        <button
          type="button"
          className="weather-top-pill"
          onClick={() => setOpenMenu((v) => !v)}
          title="Xem & đổi khu vực thời tiết"
        >
          <WeatherSvgIcon type={weather?.type || 'partly'} size={22} />
          <strong>{weather ? `${weather.temp}°C` : '…'}</strong>
          <span className="weather-top-city">{loc.name}</span>
        </button>

        {openMenu && (
          <div className="weather-dropdown fade-in">
            <div className="weather-dropdown-head">
              <strong>Khu vực thời tiết</strong>
              <button
                type="button"
                className="weather-gps-btn"
                onClick={detectGps}
              >
                <Navigation size={13} />
                <span>Định vị GPS</span>
              </button>
            </div>
            <div className="weather-city-list">
              {CITIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`weather-city-item ${loc.name === c.name ? 'active' : ''}`}
                  onClick={() => selectCity(c)}
                >
                  <MapPin size={13} />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="hero-weather-card" ref={wrapRef}>
      <div className="hero-weather-main">
        <WeatherSvgIcon type={weather?.type || 'partly'} size={42} />
        <div className="hero-weather-temp">
          <strong>{weather ? `${weather.temp}°C` : '--°C'}</strong>
          <span>{loading && !weather ? 'Đang tải…' : weather?.label || 'Thời tiết'}</span>
        </div>
      </div>

      <div className="hero-weather-meta">
        <button
          type="button"
          className="hero-weather-loc"
          onClick={() => setOpenMenu((v) => !v)}
          title="Đổi tỉnh/thành phố hoặc định vị GPS"
        >
          <MapPin size={13} />
          <span>{loc.name}</span>
        </button>

        {weather && (
          <div className="hero-weather-stats">
            <span title="Độ ẩm"><Droplets size={13} /> {weather.humidity}%</span>
            <span title="Tốc độ gió"><Wind size={13} /> {weather.wind} km/h</span>
            <button
              type="button"
              className="weather-refresh-btn"
              onClick={() => fetchSharedWeather(loc)}
              title="Cập nhật thời tiết"
              aria-label="Cập nhật thời tiết"
            >
              <RefreshCw size={12} className={loading ? 'spin' : ''} />
            </button>
          </div>
        )}
      </div>

      {openMenu && (
        <div className="weather-dropdown hero-drop fade-in">
          <div className="weather-dropdown-head">
            <strong>Khu vực thời tiết</strong>
            <button type="button" className="weather-gps-btn" onClick={detectGps}>
              <Navigation size={13} />
              <span>Định vị GPS</span>
            </button>
          </div>
          <div className="weather-city-list">
            {CITIES.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`weather-city-item ${loc.name === c.name ? 'active' : ''}`}
                onClick={() => selectCity(c)}
              >
                <MapPin size={13} />
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
