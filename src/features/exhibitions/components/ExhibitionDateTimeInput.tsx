import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Props {
  label: string
  date: Date | undefined
  time: string
  setDate: (date: Date | undefined) => void
  setTime: (time: string) => void
  error?: string
}

export default function ExhibitionDateTimeInput({ label, date, time, setDate, setTime, error }: Props) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border w-full" />
        <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full" />
      </div>
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  )
}
