interface Props {
  label?: string
  list: string[]
}

export const SelectInput = (props: Props) => {
  return (
    <label className="flex flex-col items-start gap-1">
      {props.label ? props.label + ':' : ''}
      <select className="w-full h-full">
        {props.list.map(item => <option key={item}>{item}</option>)}
      </select>
    </label>
  )
}