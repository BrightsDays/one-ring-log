import { ChangeEvent } from "react"

interface Props {
  label?: string
  value: string
  isPassword?: boolean
  inputEvent: (data: string) => void
}

export const TextInput = ({label, value, isPassword, inputEvent}: Props) => {
  const sendValue = (event: ChangeEvent<HTMLInputElement>) => {
    inputEvent(event.target?.value)
  }

  return (
    <label className="flex flex-col items-start gap-1">
      {label ? label + ':' : ''}
      <input
        type={isPassword ? 'password' : 'text'}
        className="w-full"
        value={value}
        onChange={event => sendValue(event)}
      ></input>
    </label>
  )
}