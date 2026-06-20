export interface User {
  id: number
  username: string
  email: string
  is_staff: boolean
  is_active: boolean
}

export interface ApiError {
  detail: string
  status: number
}

export interface TransferData {
  title: string
  beneficiaryAccountNumber: string
  forFinalCredit: string
  correspondentBank: string
  swiftCode: string
  creditOf: {
    bankName: string
    accessBankAccount: string
    beneficiaryBankSwift: string
  }
}

export interface PaystackPopConfig {
  key: string
  email: string
  amount: number
  currency?: string
  ref?: string
  metadata?: Record<string, unknown>
  channels?: string[]
  callback: (response: { reference: string; transaction?: string; status?: string }) => void
  onClose: () => void
}

export interface PaystackPop {
  setup(config: PaystackPopConfig): { openIframe: () => void }
}
