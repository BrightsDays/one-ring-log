import { ChangeEvent } from "react"

interface Props {
  label?: string
  min?: number
  max?: number
  disabled?: boolean
  value: number
  inputEvent: (data: number) => void
}

export const NumberInput = ({label, min, max, value, inputEvent, disabled}: Props) => {
  const sendValue = (event: ChangeEvent<HTMLInputElement>) => {
    inputEvent(+event.target?.value)
  }

  return (
    <label className="flex flex-col items-start gap-1 text-black">
      {label ? label + ':' : ''}
      <input
        className="w-full bg-transparent border-solid border-b-2 border-b-[#D0CACB] text-blue-800"
        type="number"
        min={min ? min : 0}
        max={max}
        value={value}
        disabled={disabled}
        onChange={event => sendValue(event)}
      />
    </label>
  )
}