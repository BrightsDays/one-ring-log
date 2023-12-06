import { Card } from "../ui/Card"
import { NumberInput } from "../ui/NumberInput"
import { TextInput } from "../ui/TextInput"

export const Ponies = () => {
  const list = Array.from(Array(7).keys())

  return (
    <Card title="Ponies and horses">
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <span>Name</span>
          <span>Vigour</span>
        </div>
        {list.map(item =>
          <div key={item} className="grid grid-cols-2 gap-2">
            <TextInput />
            <NumberInput max={10} />
          </div>
        )}
      </div>
    </Card>
  )
}