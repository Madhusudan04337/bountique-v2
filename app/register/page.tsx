import { Metadata } from 'next'
import { AuthView } from '@/components/auth-view'

export const metadata: Metadata = {
  title: 'Create Account | AURORA Atelier',
  description: 'Join the AURORA private client circle and unlock bespoke tailoring privileges.',
}

export default function RegisterPage() {
  return <AuthView initialMode="register" />
}
