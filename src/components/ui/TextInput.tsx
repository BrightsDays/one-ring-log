interface Props {
  label?: string
}

export const TextInput = (props: Props) => {
  return (
    <label className="flex flex-col items-start gap-1">
      {props.label ? props.label + ':' : ''}
      <input className="w-full"></input>
    </label>
  )
}