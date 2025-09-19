// src/components/ui/full-page-loader.tsx
import { Spinner } from '@/components/ui/spinner'

export default function FullPageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-2">
        <Spinner className="w-6 h-6 text-primary" />
        <p className="text-sm text-muted-foreground">잠시만 기다려주세요...</p>
      </div>
    </div>
  )
}
