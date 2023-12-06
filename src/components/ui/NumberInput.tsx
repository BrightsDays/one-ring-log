interface Props {
  label?: string
  min?: number
  max?: number
}

export const NumberInput = (props: Props) => {
  return (
    <label className="flex flex-col items-start gap-1">
      {props.label ? props.label + ':' : ''}
      <input className="w-full" type="number" min={props.min ? props.min : 0} max={props.max}></input>
    </label>
  )
}