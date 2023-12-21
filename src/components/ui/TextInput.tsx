import { ChangeEvent } from "react"

interface Props {
  label?: string
  value: string
  inputEvent: (data: string) => void
}

export const TextInput = ({label, value, inputEvent}: Props) => {
  const sendValue = (event: ChangeEvent<HTMLInputElement>) => {
    inputEvent(event.target?.value)
  }

  return (
    <label className="flex flex-col items-start gap-1">
      {label ? label + ':' : ''}
      <input className="w-full" value={value} onChange={event => sendValue(event)}></input>
    </label>
  )
}