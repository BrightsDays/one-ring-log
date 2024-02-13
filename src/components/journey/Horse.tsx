/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import supabase from "../../supabaseClient"
import { AnimalStats } from "../../types"
import { Button } from "../ui/Button"
import { NumberInput } from "../ui/NumberInput"
import { TextInput } from "../ui/TextInput"

interface Props {
  horse: AnimalStats
  editable: boolean
  horseEvent: () => void
}

export const Horse = ({ horse, editable, horseEvent }: Props) => {
  const [name, setName] = useState(horse.name)
  const [vigour, setVigour] = useState(horse.vigour)

  const deleteHorse = async () => {
    await supabase
      .from('animals')
      .delete()
      .eq('id', horse.id)
    horseEvent()
  }

  const updateData = async (key: 'name' | 'vigour', value: number | string) => {
    await supabase
      .from('animals')
      .update({ [key]: value })
      .eq('id', horse.id)
  }

  useEffect(() => { updateData('name', name) }, [name])
  useEffect(() => { updateData('vigour', vigour) }, [vigour])

  return (
    <div className={`grid grid-cols-${editable ? '3' : '2'} gap-2`}>
      <TextInput
        value={name}
        disabled={!editable}
        inputEvent={(value) => setName(value)}
      />
      <NumberInput
        max={10}
        value={vigour}
        disabled={!editable}
        inputEvent={(value) => setVigour(value)}
      />
      {editable && <Button text="X" buttonEvent={() => deleteHorse()} />}
    </div>
  )
}