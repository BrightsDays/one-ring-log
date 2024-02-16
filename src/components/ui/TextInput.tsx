import { ChangeEvent, ReactNode } from "react"

interface Props {
  label?: string
  value: string
  isPassword?: boolean
  disabled?: boolean
  inputEvent: (data: string) => void
  children?: ReactNode
}

export const TextInput = ({label, value, isPassword, inputEvent, disabled, children }: Props) => {
  const sendValue = (event: ChangeEvent<HTMLInputElement>) => {
    inputEvent(event.target?.value)
  }

  return (
    <label className="relative flex flex-col items-start gap-1 text-black">
      {label ? label + ':' : ''}
      <input
        type={isPassword ? 'password' : 'text'}
        className="w-full bg-transparent border-solid border-b-2 border-b-[#D0CACB] text-blue-800"
        value={value ? value : ''}
        disabled={disabled}
        onChange={event => sendValue(event)}
      />
      <div className="absolute right-0" >{ children }</div>
    </label>
  )
}