import { useState, useEffect, useRef } from 'react'
import './App.css'

// ── Icons ─────────────────────────────────────────────────────────────────────
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M8 5v14l11-7z"/>
  </svg>
)
const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
  </svg>
)
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
    <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
)
const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
  </svg>
)
const ChevronLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
  </svg>
)
const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
  </svg>
)
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
    <path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
  </svg>
)
const ThumbUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
  </svg>
)
const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
  </svg>
)

// ── Mock Data ─────────────────────────────────────────────────────────────────
const HERO = {
  title: 'OBSIDIAN THRONE',
  year: '2024',
  rating: '16+',
  seasons: '2 Seasons',
  match: '97%',
  desc: 'When the last heir to a crumbling empire learns her bloodline is worth more dead than alive, she must outrun four rival factions — while uncovering the secret her ancestors buried beneath the capital.',
  bg: 'https://picsum.photos/seed/ayushflix-hero/1600/900',
}

const mkShow = (seed, title, year, pct) => ({
  id: seed,
  title,
  year,
  pct,
  img: `https://picsum.photos/seed/af${seed}/300/170`,
})

const ROWS = [
  {
    id: 'trending',
    label: 'Trending Now',
    shows: [
      mkShow(101, 'Dark Signal', '2024', '97%'),
      mkShow(102, 'Hollow Earth', '2023', '94%'),
      mkShow(103, 'The Reckoning', '2024', '91%'),
      mkShow(104, 'Neon Requiem', '2024', '89%'),
      mkShow(105, 'Static Drift', '2023', '88%'),
      mkShow(106, 'Parallax', '2024', '86%'),
      mkShow(107, 'Undertow', '2023', '84%'),
      mkShow(108, 'Fracture Point', '2024', '82%'),
    ],
  },
  {
    id: 'popular',
    label: 'Popular on AyushFlix',
    shows: [
      mkShow(201, 'Silverline', '2024', '96%'),
      mkShow(202, 'Marked Territory', '2023', '93%'),
      mkShow(203, 'The Operator', '2024', '90%'),
      mkShow(204, 'Burning Hours', '2024', '87%'),
      mkShow(205, 'Salt & Ash', '2023', '85%'),
      mkShow(206, 'Remnants', '2024', '83%'),
      mkShow(207, 'Night Current', '2023', '81%'),
      mkShow(208, 'Hard Meridian', '2024', '79%'),
    ],
  },
  {
    id: 'action',
    label: 'Action & Adventure',
    shows: [
      mkShow(301, 'Iron Meridian', '2024', '95%'),
      mkShow(302, 'Velocity', '2023', '92%'),
      mkShow(303, 'Storm Front', '2024', '90%'),
      mkShow(304, 'Zero Hour', '2024', '87%'),
      mkShow(305, 'The Circuit', '2023', '85%'),
      mkShow(306, 'Black Horizon', '2024', '83%'),
      mkShow(307, 'Dead Reckoning', '2023', '80%'),
      mkShow(308, 'Aftermath', '2024', '78%'),
    ],
  },
  {
    id: 'acclaimed',
    label: 'Critically Acclaimed',
    shows: [
      mkShow(401, 'Still Waters', '2024', '99%'),
      mkShow(402, 'Architecture of Loss', '2023', '97%'),
      mkShow(403, 'Pale Blue Hour', '2024', '95%'),
      mkShow(404, 'Between Silences', '2024', '93%'),
      mkShow(405, 'Threshold', '2023', '91%'),
      mkShow(406, 'A Slow Kind of Love', '2024', '89%'),
      mkShow(407, 'The Weight of Sky', '2023', '87%'),
      mkShow(408, 'Margins', '2024', '85%'),
    ],
  },
]

// ── Card ──────────────────────────────────────────────────────────────────────
function Card({ show }) {
  return (
    <div className="card">
      <div className="card__thumb">
        <img
          src={show.img}
          alt={show.title}
          loading="lazy"
          onError={e => { e.currentTarget.src = `https://picsum.photos/seed/fallback${show.id}/300/170` }}
        />
        <div className="card__overlay">
          <div className="card__actions">
            <button className="card__action-btn card__action-btn--play" aria-label="Play">
              <PlayIcon />
            </button>
            <button className="card__action-btn" aria-label="Add to list">
              <PlusIcon />
            </button>
            <button className="card__action-btn" aria-label="Like">
              <ThumbUpIcon />
            </button>
            <button className="card__action-btn card__action-btn--more" aria-label="More info">
              <ChevronDownIcon />
            </button>
          </div>
          <div className="card__meta">
            <span className="card__match-pct">{show.pct} Match</span>
            <span className="card__year">{show.year}</span>
          </div>
          <p className="card__name">{show.title}</p>
        </div>
      </div>
    </div>
  )
}

// ── Row ───────────────────────────────────────────────────────────────────────
function Row({ row }) {
  const trackRef = useRef(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)

  const checkScroll = () => {
    const el = trackRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 4)
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }

  const slide = (dir) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'left' ? -(el.clientWidth * 0.75) : el.clientWidth * 0.75, behavior: 'smooth' })
    setTimeout(checkScroll, 450)
  }

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    checkScroll()
    el.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll)
    return () => {
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [])

  return (
    <section className="row">
      <div className="row__header">
        <h2 className="row__title">{row.label}</h2>
      </div>
      <div className="row__container">
        {canLeft && (
          <button className="row__arrow row__arrow--left" onClick={() => slide('left')} aria-label="Scroll left">
            <ChevronLeftIcon />
          </button>
        )}
        <div className="row__track" ref={trackRef}>
          {row.shows.map(show => <Card key={show.id} show={show} />)}
        </div>
        {canRight && (
          <button className="row__arrow row__arrow--right" onClick={() => slide('right')} aria-label="Scroll right">
            <ChevronRightIcon />
          </button>
        )}
      </div>
    </section>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <div className="hero">
      <div className="hero__bg">
        <img src={HERO.bg} alt="Featured show background" />
        <div className="hero__gradient" />
      </div>
      <div className="hero__content">
        <div className="hero__eyebrow">
          <span className="hero__badge">A</span>
          <span className="hero__series-label">S E R I E S</span>
        </div>
        <h1 className="hero__title">{HERO.title}</h1>
        <div className="hero__meta">
          <span className="hero__match">{HERO.match} Match</span>
          <span className="hero__year">{HERO.year}</span>
          <span className="hero__rating">{HERO.rating}</span>
          <span className="hero__seasons">{HERO.seasons}</span>
        </div>
        <p className="hero__desc">{HERO.desc}</p>
        <div className="hero__actions">
          <button className="hero__btn hero__btn--play">
            <PlayIcon />
            Play
          </button>
          <button className="hero__btn hero__btn--info">
            <InfoIcon />
            More Info
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 55)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__left">
        <a href="#" className="navbar__logo">AyushFlix</a>
        <ul className="navbar__links">
          {['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List'].map((link, i) => (
            <li key={link}>
              <a href="#" className={`navbar__link${i === 0 ? ' navbar__link--active' : ''}`}>{link}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar__right">
        <button className="navbar__icon-btn" aria-label="Search"><SearchIcon /></button>
        <button className="navbar__icon-btn" aria-label="Notifications"><BellIcon /></button>
        <div className="navbar__avatar" role="button" aria-label="Profile">A</div>
      </div>
    </nav>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <div className="rows">
          {ROWS.map(row => <Row key={row.id} row={row} />)}
        </div>
      </main>
      <footer className="footer">
        <ul className="footer__links">
          {['FAQ', 'Help Centre', 'Account', 'Media Centre', 'Investor Relations', 'Jobs', 'Cookie Preferences', 'Privacy', 'Terms of Use'].map(l => (
            <li key={l}><a href="#">{l}</a></li>
          ))}
        </ul>
        <p className="footer__copy">&copy; 2024 AyushFlix. Entertainment purposes only.</p>
      </footer>
    </div>
  )
}
