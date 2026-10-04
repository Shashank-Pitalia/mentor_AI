import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout.jsx'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import AuthLayout from '../layouts/AuthLayout.jsx'
import SectionPlaceholder from '../components/common/SectionPlaceholder.jsx'

function Page({ title, description, items }) {
    return <SectionPlaceholder title={title} description={description} items={items} />
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route index element={<Page title="Landing" description="A front door for your mentorship and interview prep workspace." items={["Hero section", "Value proposition", "Primary call to action"]} />} />
                    <Route path="login" element={<Page title="Login" description="Placeholder sign-in experience." />} />
                    <Route path="register" element={<Page title="Register" description="Placeholder onboarding experience." />} />
                    <Route path="dashboard" element={<DashboardLayout />}>
                        <Route index element={<Page title="Dashboard" description="Overview cards and progress tracking live here." />} />
                    </Route>
                    <Route path="profile" element={<Page title="Profile" description="Profile and preferences page scaffold." />} />
                    <Route path="resume" element={<Page title="Resume" description="Resume review and optimization workspace." />} />
                    <Route path="roadmap" element={<Page title="Roadmap" description="Learning path and milestone planner." />} />
                    <Route path="interview" element={<Page title="Interview" description="Mock interview and feedback tools." />} />
                    <Route path="chat" element={<Page title="AI Chat" description="AI guidance and coaching surface." />} />
                    <Route path="analytics" element={<Page title="Analytics" description="Performance trends and insights." />} />
                    <Route path="settings" element={<Page title="Settings" description="Application preferences and account settings." />} />
                    <Route path="admin" element={<Page title="Admin" description="Administrative controls and moderation tools." />} />
                    <Route path="not-found" element={<Page title="Not Found" description="Route placeholder for the 404 experience." />} />
                    <Route path="*" element={<Navigate to="/not-found" replace />} />
                </Route>
                <Route element={<AuthLayout />}>
                    <Route path="auth" element={<Page title="Authentication" description="Shared auth layout placeholder." />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
