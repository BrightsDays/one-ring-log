/* eslint-disable react-hooks/exhaustive-deps */
import { Card } from "../../ui/Card"
import { Player } from "./Player"
import { PlayerStats, UpdatePlaterData } from "../../../types"
import supabase from "../../../supabase/supabaseClient"
import { useEffect, useState } from "react"
import { Button } from "../../ui/Button"
import { RootState } from "../../../store/reducers"
import { useSelector } from "react-redux"

const selectUser = (state: RootState) => state.user

interface Props {
  adventureId: string
  editable: boolean
}

export const PlayerList = ({ adventureId, editable }: Props) => {
  const user = useSelector(selectUser)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [company, setCompany] = useState<PlayerStats[] | null>(null)
  const [loremasterId, setLoremasterId] = useState<string | null>(null)

  const getPlayers = async () => {
    const { data, error } = await supabase
      .from('players')
      .select('id, adventure_id, loremaster_id, name, role, fatigue')
      .eq('adventure_id', adventureId)
    
    if (error) {
      setFetchError('Could not fetch company :(')
      setCompany(null)
    } else if (data) {
      setCompany(data)
      setFetchError(null)
      if (data[0]?.loremaster_id) setLoremasterId(data[0].loremaster_id)
    }
  }

  const addPlayer = async () => {
    await supabase
      .from('players')
      .insert([{ adventure_id: adventureId, loremaster_id: user.id, name: '', role: 'guide', fatigue: 0 }])
    getPlayers()
  }

  const updatePlayer = async (data: UpdatePlaterData) => {
    await supabase
      .from('players')
      .update({ [data.key]: data.value })
      .eq('id', data.id)
  }

  const deletePlayer = async (id: number) => {
    await supabase
      .from('players')
      .delete()
      .eq('id', id)
    getPlayers()
  }

  useEffect(() => { getPlayers() }, [])

  useEffect(() => {
    const channel = supabase
      .channel('realtime players')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'players'
      }, () => {
        getPlayers()
      })
      .subscribe()      

    if (loremasterId && user.id === loremasterId) {
      supabase.removeChannel(channel)
    }
  }, [supabase, loremasterId, user.id])

  return (
    <Card title="The company">
      <div className="flex flex-col gap-2">
        <div className="grid sm:grid-cols-3 grid-cols-2 gap-2 text-black">
          <span>Name</span>
          <span>Journey role</span>
          <span className="hidden sm:block">Travel fatigue</span>
        </div>
        {fetchError && <span className="text-red-500">{fetchError}</span>}
        {company && company
          .sort((a, b) => a.id - b.id)
          .map(item => {
            return (
              <Player
                key={`${item.id}-${item.name}-${item.fatigue}-${item.role}`}
                player={item as PlayerStats}
                editable={editable}
                updateEvent={(data) => updatePlayer(data)}
                deleteEvent={(value) => deletePlayer(value)}
              />
            )
          })
        }
        {(company && editable && company.length < 7) && <Button text="Add player" buttonEvent={() => addPlayer()} />}
      </div>
    </Card>
  )
}