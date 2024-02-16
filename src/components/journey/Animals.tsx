import { useEffect, useState } from "react"
import { Card } from "../ui/Card"
import { Horse } from "./Horse"
import supabase from "../../supabaseClient"
import { AnimalStats } from "../../types"
import { Button } from "../ui/Button"
import { IRootState } from "../../reducers"
import { useSelector } from "react-redux"

const selectUser = (state: IRootState) => state.user

interface Props {
  adventureId: string
  editable: boolean
}

export const Animals = ({ adventureId, editable }: Props) => {
  const user = useSelector(selectUser)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [animals, setAnimals] = useState<AnimalStats[] | null>(null)
  const [loremasterId, setLoremasterId] = useState<string | null>(null)

  const fetchAnimals = async () => {
    const { data, error } = await supabase
      .from('animals')
      .select('id, adventure_id, loremaster_id, name, vigour')
      .eq('adventure_id', adventureId)
    
    if (error) {
      setFetchError('Could not fetch animals :(')
      setAnimals(null)
    } else if (data) {
      setAnimals(data)
      setFetchError(null)
      setLoremasterId(data[0].loremaster_id)
    }
  }// TODO: move fetchData from components to suabaseClient

  const addAnimal = async () => {
    await supabase
      .from('animals')
      .insert([{ adventure_id: adventureId, loremaster_id: user.id, name: '', vigour: 0 }])
    fetchAnimals()
  }// TODO: move addData from components to suabaseClient

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchAnimals() }, [])

  useEffect(() => {
    const channel = supabase
      .channel('realtime anumals')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'animals'
      }, () => {
        fetchAnimals()
      })
      .subscribe()      

    if (loremasterId && user.id === loremasterId) {
      supabase.removeChannel(channel)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase, loremasterId, user.id])

  return (
    <Card title="Ponies and horses">
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2 text-black">
          <span>Name</span>
          <span>Vigour</span>
        </div>
        {fetchError && <span className="text-red-500">{fetchError}</span>}
        {animals && animals
          .sort((a, b) => a.id - b.id)
          .map(item =>
            <Horse
              key={`${item.id}-${item.name}-${item.vigour}`}
              horse={item}
              editable={editable}
              horseEvent={() => fetchAnimals()}
            />
          )
        }
        {(animals && editable && animals.length < 7) && <Button text="Add animal" buttonEvent={() => addAnimal()} />}
      </div>
    </Card>
  )
}