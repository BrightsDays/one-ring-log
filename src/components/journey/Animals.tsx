import { useEffect, useState } from "react"
import { Card } from "../ui/Card"
import { Horse } from "./Horse"
import supabase from "../../supabaseClient"
import { AnimalStats } from "../../types"
import { Button } from "../ui/Button"

interface Props {
  adventureId: string
  editable: boolean
}

export const Animals = ({ adventureId, editable }: Props) => {
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [animals, setAnimals] = useState<AnimalStats[] | null>(null)

  const fetchAnimals = async () => {
    const { data, error } = await supabase
      .from('animals')
      .select('id, adventure_id, name, vigour')
      .eq('adventure_id', adventureId)
    
    if (error) {
      setFetchError('Could not fetch animals :(')
      setAnimals(null)
    } else if (data) {
      setAnimals(data)
      setFetchError(null)
    }
  }

  const addAnimal = async () => {
    await supabase
      .from('animals')
      .insert([{ adventure_id: adventureId, name: '', vigour: 0 }])
    fetchAnimals()
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchAnimals() }, [])

  return (
    <Card title="Ponies and horses">
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <span>Name</span>
          <span>Vigour</span>
        </div>
        {fetchError && <span className="text-red-500">{fetchError}</span>}
        {animals && animals
          .sort((a, b) => a.id - b.id)
          .map(item =>
            <Horse
              key={`ponie__${item.id}`}
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