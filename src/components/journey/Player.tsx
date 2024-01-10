import { FatigueList } from "./FatigueList"
import { SelectInput } from "../ui/SelectInput"
import { TextInput } from "../ui/TextInput"
import { useState } from "react"
import { PlayerStats, Roles } from "../../types"
import { useEffect } from "react"

interface Props {
  player: PlayerStats
  playerEvent: (data: PlayerStats) => void
}

export const Player = ({player, playerEvent}: Props) => {
  const roles: Roles[] = ['guide', 'look-out', 'hunter', 'scout']

  const [tempName, setName] = useState(player.name)
  const [tempRole, setRole] = useState(player.role)
  const [tempFatigue, setFatigue] = useState(player.fatigue)

  useEffect(() => {
    playerEvent({
      id: player.id,
      name: tempName,
      role: tempRole,
      fatigue: tempFatigue
    })
  }, [player, playerEvent, tempName, tempRole, tempFatigue])

  return (
    <div className="grid grid-cols-3 gap-2">
      <TextInput value={tempName || ''} inputEvent={(value) => setName(value)} />
      <SelectInput
        list={roles}
        value={tempRole || ''}
        inputEvent={(value) => setRole(value as Roles)}
      />
      <FatigueList
        fatigue={tempFatigue}
        fatigueEvent={(index, value) => setFatigue(!value ? index : index + 1)} />
    </div>
  )
}