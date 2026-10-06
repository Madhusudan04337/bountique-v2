import { Metadata } from 'next'
import { AuthView } from '@/components/auth-view'

export const metadata: Metadata = {
  title: 'Sign In | AURORA Atelier',
  description: 'Log in to your private AURORA client account.',
}

export default function LoginPage() {
  return <AuthView initialMode="login" />
}
