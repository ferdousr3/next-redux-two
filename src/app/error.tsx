'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <div className="bg-destructive/10 p-4 rounded-full">
        <AlertCircle className="h-10 w-10 text-destructive" />
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold">Something went wrong!</h2>
        <p className="text-muted-foreground max-w-md">
          {error.message || "An unexpected error occurred. Please try again later."}
        </p>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => window.location.href = '/'} variant="outline">
          Go Home
        </Button>
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </div>
  )
}
