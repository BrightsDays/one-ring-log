import { Card } from "../ui/Card"
import { NumberInput } from "../ui/NumberInput"
import { TextInput } from "../ui/TextInput"

export const Ponies = () => {
  const list = Array.from(Array(7).keys())

  return (
    <Card title="Ponies and horses">
      <div className="grid grid-cols-2 gap-2">
        <span>Name</span>
        <span>Vigour</span>
        {list.map(() =>
        <>
          <TextInput />
          <NumberInput max={10} />
        </>
        )}
      </div>
    </Card>
  )
}