import { ChangeEvent } from "react"

interface Props {
  label?: string
  value: string
  list: string[]
  disabled?: boolean
  inputEvent: (data: string) => void
}
//TODO: create custom select input
export const SelectInput = ({label, value, list, inputEvent, disabled}: Props) => {
  const sendValue = (event: ChangeEvent<HTMLSelectElement>) => {
    inputEvent(event.target?.value)
  }

  return (
    <label className="flex flex-col items-start gap-1 text-black">
      {label ? label + ':' : ''}
      <select
        className="w-full h-full bg-transparent border-solid border-b border-b-[#D0CACB] text-blue-800"
        value={value}
        disabled={disabled}
        onChange={event => sendValue(event)}
      >
        {list.map(item => <option key={item}>{item}</option>)}
      </select>
    </label>
  )
}