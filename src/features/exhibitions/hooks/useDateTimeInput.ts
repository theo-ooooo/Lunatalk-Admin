import { useEffect, useState } from 'react'
import type { UseFormSetValue } from 'react-hook-form'

export function useDateTimeInput(field: 'startAt' | 'endAt', setValue: UseFormSetValue<any>) {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState('00:00')

  useEffect(() => {
    if (date && time) {
      const [h, m] = time.split(':').map(Number)
      const merged = new Date(date)
      merged.setHours(h, m, 0, 0)
      setValue(field, merged, { shouldValidate: true })
    }
  }, [date, time])

  return { date, time, setDate, setTime }
}
