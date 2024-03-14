/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { AnimalStats, UpdateAnimalData } from "../../../types"
import { NumberInput } from "../../ui/NumberInput"
import { TextInput } from "../../ui/TextInput"
import { DeleteRowButton } from "../../ui/DeleteRowButton"

interface Props {
  horse: AnimalStats
  editable: boolean
  updateEvent: ({id, key, value}: UpdateAnimalData) => void
  deleteEvent: (id: number) => void
}

export const Animal = ({ horse, editable, updateEvent, deleteEvent }: Props) => {
  const [name, setName] = useState(horse.name)
  const [vigour, setVigour] = useState(horse.vigour)

  useEffect(() => { updateEvent({id: horse.id, key: 'name', value: name}) }, [name])
  useEffect(() => { updateEvent({id: horse.id, key: 'vigour', value: vigour}) }, [vigour])

  return (
    <div className="grid grid-cols-2 gap-2 items-end">
      <TextInput
        value={name}
        disabled={!editable}
        inputEvent={(value) => setName(value)}
      >
        <DeleteRowButton
          show={(!name.length && editable) ? true : false}
          buttonEvent={() => deleteEvent(horse.id)}
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