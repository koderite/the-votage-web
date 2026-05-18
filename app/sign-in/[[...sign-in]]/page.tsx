import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <SignIn
      appearance={{
        elements: {
          formButtonPrimary: 'bg-[#FF6B35] hover:bg-[#E85A2A] text-white',
          card: 'shadow-none border border-gray-200',
        }
      }}
      signInUrl="/sign-in"
      afterSignInUrl="/admin/dashboard"
      routing="path"
      path="/sign-in"
    />
  )
}