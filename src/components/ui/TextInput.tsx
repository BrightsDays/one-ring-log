interface Props {
  label: string
}

export const TextInput = (props: Props) => {
  return (
    <label className="flex justify-between gap-3">
      {props.label}:
      <input></input>
    </label>
  )
}