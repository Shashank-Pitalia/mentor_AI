import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
    return (
        <section className="auth-layout">
            <Outlet />
        </section>
    )
}
