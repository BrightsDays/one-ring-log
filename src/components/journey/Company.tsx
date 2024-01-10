import { useEffect, useState } from "react"
import { Card } from "../ui/Card"
import { Player } from "./Player"
import { PlayerStats } from "../../types"
import supabase from "../../supabaseClient"

export const Company = () => {
  const table = 'Company'

  const [fetchError, setFetchError] = useState<string | null>(null)
  const [company, setCompany] = useState<PlayerStats[] | null>(null)

  const fetchCompany = async () => {
    const { data, error } = await supabase
      .from(table)
      .select()
    
    if (error) {
      setFetchError('Could not fetch company :(')
      setCompany(null)
    } else if (data) {
      setCompany(data)
      setFetchError(null)
    }
  }

  useEffect(() => {fetchCompany()}, [])

  const updateCompanyItem = async (data: PlayerStats) => {
    const tempList = company?.map(item => item.id === data.id ? data : item)

    if (tempList && JSON.stringify(tempList) !== JSON.stringify(company)) {
      await supabase
        .from(table)
        .update({
          name: data.name,
          role: data.role,
          fatigue: data.fatigue
        })
        .eq('id', data.id)
    }
  }

  return (
    <Card title="The company">
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-3 gap-2">
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
                playerEvent={(data) => updateCompanyItem(data)}
              />
            )
          })
        }
      </div>
    </Card>
  )
}