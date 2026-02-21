import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import LinkedInOnboardingModal from './LinkedInOnboardingModal'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, userProfile, loading, profileLoading, updateUserProfile } = useAuth()
  const location = useLocation()

  if (loading || (user && profileLoading)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-dark-900">
        <svg
          className="h-8 w-8 animate-spin text-accent-400"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
            className="opacity-25"
          />
          <path
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            fill="currentColor"
            className="opacity-75"
          />
        </svg>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (userProfile && !userProfile.linkedin_url) {
    return (
      <div className="min-h-screen bg-bg-void">
        <LinkedInOnboardingModal
          onSubmit={async (url) => {
            await updateUserProfile({ linkedin_url: url })
          }}
        />
      </div>
    )
  }

  return <>{children}</>
}
