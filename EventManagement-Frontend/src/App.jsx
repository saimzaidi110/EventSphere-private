import { useContext } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/Auth/LoginPage.jsx'
import PremiumPage from './pages/PremiumPage'
import BlogPage from './pages/BlogPage'
import ContactusPage from './pages/ContactusPage'
import MainDashboard from './pages/maindashboard'
import ProfilePage from './pages/ProfilePage'
import SettingPage from './pages/dashboardpages/SettingPage.jsx'
import HelpPAge from './pages/dashboardpages/HelpPAge.jsx'
import Dashboard from "./pages/dashboardpages/Dashboard.jsx";
import SignupPage from "./pages/Auth/SignupPage.jsx"
import { UserContext } from './context/UserContext'
import UserPage from './pages/dashboardpages/Organizer/UserPage.jsx'
import CreateEvent from './pages/dashboardpages/Organizer/CreateEvent.jsx'
import ExpoEventsTable from './pages/dashboardpages/Organizer/ExpoEventsTable.jsx'
import ExpoList from './pages/ExpoList.jsx'
import EventDetail from './pages/EventDetail.jsx'
import ExhibitorExpoList from './pages/dashboardpages/Exhibitor/ExhibitorExpoList.jsx'
import RegisterExpo from './pages/dashboardpages/Exhibitor/RegisterExpo.jsx'
import ExhibitorRequestList from './pages/dashboardpages/Organizer/ExhibitorRequestList.jsx'
import ScheduleManagement from './pages/dashboardpages/Organizer/ScheduleManagement.jsx'
import AnalyticsPage from './pages/dashboardpages/Organizer/AnalyticsPage.jsx'
import ExhibitorsTable from './pages/ExhibitorsTable.jsx'
import ExhibitorProfile from './pages/dashboardpages/Exhibitor/ExhibitorProfile.jsx'
import EventSchedules from './pages/EventSchedules.jsx'
import EventManagementChatAppUI from './pages/Chat/EventManagementChatAppUI.jsx'

// 🟢 Yeh hi chatbot hai
import GeminiPage from './pages/chatbot/GeminiPage'
import About from './pages/About.jsx'
import NotificationPage from './pages/dashboardpages/Exhibitor/NotificationPage.jsx'
import FeedbacksOrganizer from './pages/dashboardpages/Organizer/FeedbacksOrganizer.jsx'

function App() {
  const { user } = useContext(UserContext)

  const router = createBrowserRouter([
    { path: '/', element: <HomePage /> },
    { path: '/contact', element: <ContactusPage /> },
     { path: '/about', element: <About/> },
    { path: '/exhibitor', element: <ExhibitorsTable /> },
    { path: '/exhibitor/:id', element: <ExhibitorProfile /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/signup', element: <SignupPage /> },
    { path: '/eventschedules', element: <EventSchedules /> },
    { path: '/blog', element: <BlogPage /> },
    { path: '/events', element: <ExpoList /> },
    { path: '/event/:id', element: <EventDetail /> },
    { path: '/chat', element: <EventManagementChatAppUI /> },
    // Agar full page chatbot bhi chahiye
    { path: "/chatbot", element: <GeminiPage /> },

    {
      path: '/dashboard',
      element: user && user?.role !== "attendee" ? <MainDashboard /> : <Navigate to={'/'} />,
      children: [
        { path: '/dashboard', element: <Dashboard /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'feedbacks', element:user?.role == "organizer" ? <FeedbacksOrganizer />:<Navigate to={'/dashboard'} />  },
        { path: 'analytics', element:user?.role == "organizer" ? <AnalyticsPage />:<Navigate to={'/dashboard'} />  },
        { path: 'users',element:  user?.role == "organizer" ?<UserPage /> :<Navigate to={'/dashboard'} /> },
        { path: 'createevent', element:  user?.role == "organizer" ?<CreateEvent />:<Navigate to={'/dashboard'} />  },
        { path: 'events', element: user?.role == "organizer" ? <ExpoEventsTable /> : <ExhibitorExpoList /> },
        { path: 'exporegister/:id', element: user?.role !== "organizer" ? <RegisterExpo />:<Navigate to={'/dashboard'}/> },
        { path: 'notifictaions', element: user?.role !== "organizer" ? <NotificationPage />:<Navigate to={'/dashboard'}/> },
        { path: 'exhibitorrequestlist', element: user?.role == "organizer" ? <ExhibitorRequestList /> :<Navigate to={'/dashboard'}/>},
        { path: 'setting', element: <SettingPage /> },
        { path: 'help', element: <HelpPAge /> },
        { path: 'schedulemanagement', element:  user?.role == "organizer" ?<ScheduleManagement />:<Navigate to={'/dashboard'}/> },
      ]
    }
  ])

  return (
    <>
      {/* Router sab pages render karega */}
      <RouterProvider router={router} />

      {/* 🟢 Floating chatbot GeminiPage har page pe bottom right */}
      <GeminiPage />
    </>
  )
}

export default App
