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
  currency: string
  bank: string
  accountName: string
  accountNumber: string
  sortCode: string
}

export interface PaystackPopConfig {
  key: string
  email: string
  amount: number
  currency?: string
  ref?: string
  metadata?: Record<string, unknown>
  callback: (response: { reference: string; transaction: string; status: string }) => void
  onClose: () => void
}

export interface PaystackPop {
  newTransaction(config: PaystackPopConfig): void
}
