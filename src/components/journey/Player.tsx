/* eslint-disable react-hooks/exhaustive-deps */
import { FatigueList } from "../ui/FatigueList"
import { SelectInput } from "../ui/SelectInput"
import { TextInput } from "../ui/TextInput"
import { useEffect, useState } from "react"
import { PlayerKeys, PlayerStats, Roles } from "../../types"
import { Button } from "../ui/Button"
import supabase from "../../supabaseClient"

interface Props {
  player: PlayerStats
  editable: boolean
  playerEvent: () => void
}

export const Player = ({player, editable, playerEvent}: Props) => {
  const roles: Roles[] = ['guide', 'look-out', 'hunter', 'scout']

  const [name, setName] = useState(player.name)
  const [role, setRole] = useState(player.role)
  const [fatigue, setFatigue] = useState(player.fatigue)

  const deletePlayer = async () => {
    await supabase
      .from('players')
      .delete()
      .eq('id', player.id)
    playerEvent()
  }

  const updateData = async (key: PlayerKeys, value: number | string) => {
    await supabase
      .from('players')
      .update({ [key]: value })
      .eq('id', player.id)
  }

  useEffect(() => { updateData('name', name) }, [name])
  useEffect(() => { updateData('role', role) }, [role])
  useEffect(() => { updateData('fatigue', fatigue) }, [fatigue])

  return (
    <div className="grid grid-cols-3 gap-2">
      <TextInput disabled={!editable} value={name || ''} inputEvent={(value) => setName(value)} />
      <SelectInput
        disabled={!editable}
        list={roles}
        value={role || ''}
        inputEvent={(value) => setRole(value as Roles)}
      />
      <FatigueList
        disabled={!editable}
        fatigue={fatigue}
        fatigueEvent={(index, value) => setFatigue(!value ? index : index + 1)} />
      {/* {editable && <Button text="X" buttonEvent={() => deletePlayer()} />} */}
    </div>
  )
}