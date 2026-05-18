import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <SignUp
      appearance={{
        elements: {
          formButtonPrimary: 'bg-[#FF6B35] hover:bg-[#E85A2A] text-white',
          card: 'shadow-none border border-gray-200',
        }
      }}
      signUpUrl="/sign-up"
      afterSignUpUrl="/admin/dashboard"
      routing="path"
      path="/sign-up"
    />
  )
}