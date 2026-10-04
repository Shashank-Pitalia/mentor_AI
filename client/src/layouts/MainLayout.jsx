import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
    { to: '/', label: 'Landing' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/roadmap', label: 'Roadmap' },
    { to: '/interview', label: 'Interview' },
    { to: '/chat', label: 'AI Chat' },
]

export default function MainLayout() {
    return (
        <div className="app-shell">
            <header className="app-shell__header">
                <div>
                    <span className="eyebrow">Mentor AI</span>
                    <h1>Career growth hub</h1>
                </div>
                <nav className="app-shell__nav" aria-label="Primary">
                    {navItems.map((item) => (
                        <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'nav-link nav-link--active' : 'nav-link')} end={item.to === '/'}>
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </header>
            <main className="app-shell__main">
                <Outlet />
            </main>
        </div>
    )
}
