import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
    return (
        <section className="dashboard-layout">
            <Outlet />
        </section>
    )
}
