import { useEffect, useState } from 'react'
import './App.css'
import { Company } from './components/journey/Company'
import { Log } from './components/journey/Log'
import { Ponies } from './components/journey/Ponies'
import supabase from './supabaseClient'
import { Card } from './components/ui/Card'
import { Player } from './types'

function App() {
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [players, setPlayers] = useState<Player[] | null>(null)

  const fetchPlayers = async () => {
    const { data, error } = await supabase
      .from('Players')
      .select()
    
    if (error) {
      setFetchError('Could not fetch players :(')
      setPlayers(null)
      console.log(error)
    } else if (data) {
      setPlayers(data)
      setFetchError(null)
    }
  }

  useEffect(() => {fetchPlayers()}, [])

  return (
    <div className='flex gap-5'>
      <Card>
        {fetchError && <span>{fetchError}</span>}
        {players && players.map(player => 
          <span key={`player_${player.id}`}>{player.name}</span>)}
      </Card>
      <Log />
      <Company />
      <Ponies />
    </div>
  )
}

export default App
