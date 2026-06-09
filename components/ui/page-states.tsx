import { Loader2, AlertCircle, Inbox } from 'lucide-react'

interface LoadingStateProps {
  message?: string
}

export function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-8 text-center">
      <Loader2 className="h-8 w-8 animate-spin text-[#FF6B35] mb-3" />
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  )
}

interface EmptyStateProps {
  title?: string
  message?: string
  action?: { label: string; onClick: () => void }
}

export function EmptyState({
  title = 'No data',
  message = 'Nothing to show here yet.',
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-8 text-center">
      <Inbox className="h-12 w-12 text-gray-300 mb-3" />
      <h3 className="text-base font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#e55a2b] transition-colors text-sm"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'An error occurred. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-8 text-center">
      <AlertCircle className="h-12 w-12 text-red-400 mb-3" />
      <h3 className="text-base font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#e55a2b] transition-colors text-sm"
        >
          Try again
        </button>
      )}
    </div>
  )
}
