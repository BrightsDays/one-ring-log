// import { useEffect, useState } from "react"
import { Card } from "../ui/Card"
import { Player } from "./Player"
import { PlayerStats } from "../../types"
import supabase from "../../supabaseClient"
import { useEffect, useState } from "react"
import { Button } from "../ui/Button"
import { IRootState } from "../../reducers"
import { useSelector } from "react-redux"

const selectUser = (state: IRootState) => state.user

interface Props {
  adventureId: string
  editable: boolean
}

export const Company = ({ adventureId, editable }: Props) => {
  const user = useSelector(selectUser)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [company, setCompany] = useState<PlayerStats[] | null>(null)

  const fetchCompany = async () => {
    const { data, error } = await supabase
      .from('players')
      .select('id, adventure_id, name, role, fatigue')
      .eq('adventure_id', adventureId)
    
    if (error) {
      setFetchError('Could not fetch company :(')
      setCompany(null)
    } else if (data) {
      setCompany(data)
      setFetchError(null)
    }
  }

  const addPlayer = async () => {
    await supabase
      .from('players')
      .insert([{ adventure_id: adventureId, loremaster_id: user.id, name: '', role: 'guide', fatigue: 0 }])
    fetchCompany()
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchCompany() }, [])

  return (
    <Card title="The company">
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-3 gap-2 text-black">
          <span>Name</span>
          <span>Journey role</span>
          <span>Travel fatigue</span>
        </div>
        {fetchError && <span className="text-red-500">{fetchError}</span>}
        {company && company
          .sort((a, b) => a.id - b.id)
          .map(item => {
            return (
              <Player
                key={`player__${item.id}`}
                player={item as PlayerStats}
                editable={editable}
                playerEvent={() => fetchCompany()}
              />
            )
          })
        }
        {(company && editable && company.length < 7) && <Button text="Add player" buttonEvent={() => addPlayer()} />}
      </div>
    </Card>
  )
}