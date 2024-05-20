/* eslint-disable react-hooks/exhaustive-deps */
import { FatigueList } from "../../ui/FatigueList"
import { SelectInput } from "../../ui/SelectInput"
import { TextInput } from "../../ui/TextInput"
import { useEffect, useState } from "react"
import { PlayerStats, Roles, UpdatePlaterData } from "../../../types"
import { DeleteRowButton } from "../../ui/DeleteRowButton"

interface Props {
  player: PlayerStats
  editable: boolean
  updateEvent: (data: UpdatePlaterData) => void
  deleteEvent: (id: number) => void
}

export const Player = ({ player, editable, updateEvent, deleteEvent }: Props) => {
  const roles: Roles[] = ['guide', 'look-out', 'hunter', 'scout']

  const [name, setName] = useState(player.name)
  const [role, setRole] = useState(player.role)
  const [fatigue, setFatigue] = useState(player.fatigue)

  useEffect(() => { updateEvent({id: player.id, key: 'name', value: name}) }, [name])
  useEffect(() => { updateEvent({id: player.id, key: 'role', value: role}) }, [role])
  useEffect(() => { updateEvent({id: player.id, key: 'fatigue', value: fatigue}) }, [fatigue])

  return (
    <div className="grid xl:grid-cols-3 grid-cols-2 gap-2" text-data-id='player'>
      <TextInput disabled={!editable} value={name || ''} inputEvent={(value) => setName(value)}>
        <DeleteRowButton
          show={(!name.length && editable) ? true : false}
          buttonEvent={() => deleteEvent(player.id)}
        />
      </TextInput>
      <SelectInput
        disabled={!editable}
        list={roles}
        value={role || ''}
        inputEvent={(value) => setRole(value as Roles)}
      />
      <FatigueList
        disabled={!editable}
        fatigue={fatigue}
        fatigueEvent={(index, value) => setFatigue(!value ? index : index + 1)}
      />
    </div>
  )
}