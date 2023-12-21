import { useState } from "react"
import { Card } from "../ui/Card"
import { Player } from "./Player"
import { PlayerStats } from "../../types"

export const Company = () => {
  const [list, setList] = useState([
    {
      id: 1,
      name: '',
      role: 'guide',
      fatigue: 0
    },
    {
      id: 2,
      name: '',
      role: 'guide',
      fatigue: 0
    },
    {
      id: 3,
      name: '',
      role: 'guide',
      fatigue: 0
    },
    {
      id: 4,
      name: '',
      role: 'guide',
      fatigue: 0
    },
    {
      id: 5,
      name: '',
      role: 'guide',
      fatigue: 0
    },
    {
      id: 6,
      name: '',
      role: 'guide',
      fatigue: 0
    },
    {
      id: 7,
      name: '',
      role: 'guide',
      fatigue: 0
    }
  ])

  const updatePlayerList = (data: PlayerStats) => {
    const tempList = list.map(item => item.id === data.id ? data : item)
    if (JSON.stringify(tempList) !== JSON.stringify(list)) setList(tempList)
  }

  return (
    <Card title="The company">
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-3 gap-2">
          <span>Name</span>
          <span>Journey role</span>
          <span>Travel fatigue</span>
        </div>
        {list.map(item => {
          return (
            <Player
              key={`player__${item.id}`}
              player={item as PlayerStats}
              playerEvent={(data) => updatePlayerList(data)}
            />
          )
        })}
      </div>
    </Card>
  )
}