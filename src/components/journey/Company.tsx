import { Card } from "../ui/Card"
import { SelectInput } from "../ui/SelectInput"
import { TextInput } from "../ui/TextInput"

export const Company = () => {
  const roles = ['guide', 'look-out', 'hunter', 'scout']
  const list = Array.from(Array(7).keys())

  return (
    <Card title="The company">
      <div className="grid grid-cols-3 gap-2">
        <span>Name</span>
        <span>Journey role</span>
        <span>Travel fatigue</span>
        {list.map(() =>
        <>
          <TextInput />
          <SelectInput list={roles} />
          <TextInput />
        </>
        )}
      </div>
    </Card>
  )
}