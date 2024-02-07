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
        type="checkbox"
        checked={value}
        disabled={disabled}
        onChange={(event) => sendValue(event)}
      />
    </label>
  )
}