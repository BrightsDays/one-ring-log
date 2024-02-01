import { ChangeEvent } from "react"

interface Props {
  label?: string
  value: string
  list: string[]
  disabled?: boolean
  inputEvent: (data: string) => void
}

export const SelectInput = ({label, value, list, inputEvent, disabled}: Props) => {
  const sendValue = (event: ChangeEvent<HTMLSelectElement>) => {
    inputEvent(event.target?.value)
  }

  return (
    <label className="flex flex-col items-start gap-1">
      {label ? label + ':' : ''}
      <select
        className="w-full h-full"
        value={value}
        disabled={disabled}
        onChange={event => sendValue(event)}
      >
        {list.map(item => <option key={item}>{item}</option>)}
      </select>
    </label>
  )
}