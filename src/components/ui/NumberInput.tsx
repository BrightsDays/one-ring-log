import { ChangeEvent } from "react"

interface Props {
  label?: string
  min?: number
  max?: number
  value: number
  inputEvent: (data: number) => void
}

export const NumberInput = ({label, min, max, value, inputEvent}: Props) => {
  const sendValue = (event: ChangeEvent<HTMLInputElement>) => {
    inputEvent(+event.target?.value)
  }

  return (
    <label className="flex flex-col items-start gap-1">
      {label ? label + ':' : ''}
      <input
        className="w-full"
        type="number"
        min={min ? min : 0}
        max={max}
        value={value}
        onChange={event => sendValue(event)}
      />
    </label>
  )
}