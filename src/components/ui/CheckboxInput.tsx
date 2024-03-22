import { ChangeEvent } from "react"

interface Props {
  label?: string
  value: boolean
  disabled: boolean
  inputEvent: (data: boolean) => void
}
//TODO: Circles rise in size
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
        className={`${disabled ? 'cursor-default' : 'cursor-pointer'} flex justify-center items-center w-4 h-4 border-solid border border-orange-700 hover:opacity-80 active:scale-90 transition ease-in-out duration-200`}
      >
        { value && <div className="w-3 h-3 rounded-full bg-orange-700" />}
      </div>
    </label>
  )
}