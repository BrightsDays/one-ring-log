import { useState } from "react"
import { Card } from "../ui/Card"
import { NumberInput } from "../ui/NumberInput"
import { TextInput } from "../ui/TextInput"

export const Ponies = () => {
  const [ponies, setPonies] = useState([
    {
      id: 1,
      name: '',
      vigour: 0
    },
    {
      id: 2,
      name: '',
      vigour: 0
    },
    {
      id: 3,
      name: '',
      vigour: 0
    },
    {
      id: 4,
      name: '',
      vigour: 0
    },
    {
      id: 5,
      name: '',
      vigour: 0
    },
    {
      id: 6,
      name: '',
      vigour: 0
    },
    {
      id: 7,
      name: '',
      vigour: 0
    }
  ])

  const updatePonie = (value: string | number, id: number, type: 'name' | 'vigour') => {
    const tempList = ponies.map(item => item.id === id ? {...item, [type]: value} : item)
    if (JSON.stringify(tempList) !== JSON.stringify(ponies)) setPonies(tempList)
  }

  return (
    <Card title="Ponies and horses">
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <span>Name</span>
          <span>Vigour</span>
        </div>
        {ponies.map(item =>
          <div key={`ponie__${item.id}`} className="grid grid-cols-2 gap-2">
            <TextInput
              value={item.name}
              inputEvent={(value) => updatePonie(value, item.id, 'name')}
            />
            <NumberInput
              max={10}
              value={item.vigour}
              inputEvent={(value) => updatePonie(value, item.id, 'vigour')}
            />
          </div>
        )}
      </div>
    </Card>
  )
}