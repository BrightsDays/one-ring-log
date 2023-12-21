import { ChangeEvent } from "react"

interface Props {
  label?: string
  value: boolean
  inputEvent: (data: boolean) => void
}

export const CheckboxInput = ({label, value, inputEvent}: Props) => {
  const sendValue = (event: ChangeEvent<HTMLInputElement>) => {
    inputEvent(event.target.checked)
  }

  return (
    <label>
      {label ? label + ':' : ''}
      <input type="checkbox" checked={value} onChange={(event) => sendValue(event)}/>
    </label>
  )
}