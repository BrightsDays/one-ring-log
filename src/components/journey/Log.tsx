import { Card } from "../ui/Card"
import { NumberInput } from "../ui/NumberInput"
import { SelectInput } from "../ui/SelectInput"
import { TextInput } from "../ui/TextInput"

export const Log = () => {
  const seasons = ['winter', 'spring', 'summer', 'autumn']

  return (
    <Card title="Journey Log">
      <div className="flex flex-col gap-1">
        <NumberInput label="Year" min={2000} max={3000} />
        <SelectInput label="Season" list={seasons} />
        <TextInput label="Journey from"/>
        <TextInput label="Destination"/>
        <NumberInput label="Days of travel" max={100} />
      </div>
    </Card>
  )
}