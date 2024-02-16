import { ChangeEvent } from "react"

interface Props {
  label?: string
  value: boolean
  disabled: boolean
  inputEvent: (data: boolean) => void
}

export const CheckboxInput = ({label, value, disabled, inputEvent}: Props) => {
  const sendValue = (event: ChangeEvent<HTMLInputElement>) => {
    inputEvent(event.target.checked)
  }

  return (
    <label>
      {label ? label + ':' : ''}
      <input
        className="hidden"
        type="checkbox"
        checked={value}
        disabled={disabled}
        onChange={(event) => sendValue(event)}
      />
      <div
        className="flex justify-center items-center w-4 h-4 border-solid border border-orange-700 cursor-pointer"
      >
        { value && <div className="w-3 h-3 rounded-full bg-orange-700" />}
      </div>
    </label>
  )
}