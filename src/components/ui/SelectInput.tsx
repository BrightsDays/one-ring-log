import { ChangeEvent } from "react"

interface Props {
  label?: string
  value: string
  list: string[]
  inputEvent: (data: string) => void
}

export const SelectInput = ({label, value, list, inputEvent}: Props) => {
  const sendValue = (event: ChangeEvent<HTMLSelectElement>) => {
    inputEvent(event.target?.value)
  }

  return (
    <label className="flex flex-col items-start gap-1">
      {label ? label + ':' : ''}
      <select
        className="w-full h-full"
        value={value}
        onChange={event => sendValue(event)}
      >
        {list.map(item => <option key={item}>{item}</option>)}
      </select>
    </label>
  )
}