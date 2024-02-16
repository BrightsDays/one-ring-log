/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import supabase from "../../supabaseClient"
import { AnimalStats } from "../../types"
import { NumberInput } from "../ui/NumberInput"
import { TextInput } from "../ui/TextInput"
import { DeleteRowButton } from "../ui/DeleteRowButton"

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
  }// TODO: move deleteData from components to suabaseClient

  const updateData = async (key: 'name' | 'vigour', value: number | string) => {
    await supabase
      .from('animals')
      .update({ [key]: value })
      .eq('id', horse.id)
  }// TODO: move updateData from components to suabaseClient

  useEffect(() => { updateData('name', name) }, [name])
  useEffect(() => { updateData('vigour', vigour) }, [vigour])

  return (
    <div className="grid grid-cols-2 gap-2">
      <TextInput
        value={name}
        disabled={!editable}
        inputEvent={(value) => setName(value)}
      >
        <DeleteRowButton
          show={(!name.length && editable) ? true : false}
          buttonEvent={() => deleteHorse()}
        />
      </TextInput>
      <NumberInput
        max={10}
        value={vigour}
        disabled={!editable}
        inputEvent={(value) => setVigour(value)}
      />
    </div>
  )
}