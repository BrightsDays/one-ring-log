import { ChangeEvent, ReactNode } from "react"

interface Props {
  label?: string
  placeholder?: string
  value: string
  isPassword?: boolean
  disabled?: boolean
  oneLine?: boolean
  inputEvent: (data: string) => void
  children?: ReactNode
}

export const TextInput = ({label, placeholder, value, isPassword, inputEvent, disabled, oneLine, children }: Props) => {
  const sendValue = (event: ChangeEvent<HTMLInputElement>) => {
    inputEvent(event.target?.value)
  }

  return (
    <label
      className={
        `${label ? 'gap-1 ' : ''} ${oneLine ? 'flex-raw' : 'flex-col'} relative flex items-start text-black flex-1 border-solid border-b border-b-[#D0CACB] whitespace-nowrap`
      }
    >
      {label ? label + ':' : ''}
      <input
        type={isPassword ? 'password' : 'text'}
        className="w-full bg-transparent text-blue-800 h-full py-1"
        value={value ? value : ''}
        placeholder={placeholder}
        disabled={disabled}
        onChange={event => sendValue(event)}
      />
      <div className="absolute right-0 bottom-1" >{ children }</div>
    </label>
  )
}