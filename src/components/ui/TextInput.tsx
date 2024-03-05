import { ChangeEvent, ReactNode } from "react"

interface Props {
  label?: string
  placeholder?: string
  value: string
  isPassword?: boolean
  disabled?: boolean
  inputEvent: (data: string) => void
  children?: ReactNode
}

export const TextInput = ({label, placeholder, value, isPassword, inputEvent, disabled, children }: Props) => {
  const sendValue = (event: ChangeEvent<HTMLInputElement>) => {
    inputEvent(event.target?.value)
  }

  return (
    <label
      className={`${label ? 'gap-1 ' : ''}relative flex flex-col items-start text-black flex-1`}
    >
      {label ? label + ':' : ''}
      <input
        type={isPassword ? 'password' : 'text'}
        className="w-full bg-transparent border-solid border-b border-b-[#D0CACB] text-blue-800 h-full"
        value={value ? value : ''}
        placeholder={placeholder}
        disabled={disabled}
        onChange={event => sendValue(event)}
      />
      <div className="absolute right-0" >{ children }</div>
    </label>
  )
}