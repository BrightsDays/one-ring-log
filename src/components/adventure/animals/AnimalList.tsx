import { useEffect, useState } from "react"
import { Card } from "../../ui/Card"
import { Animal } from "./Animal"
import supabase from "../../../supabase/supabaseClient"
import { AnimalStats, UpdateAnimalData } from "../../../types"
import { Button } from "../../ui/Button"
import { RootState } from "../../../reducers/main"
import { useDispatch, useSelector } from "react-redux"
import { Loading } from "../../ui/Loading"

const selectUser = (state: RootState) => state.user

interface Props {
  adventureId: string
  editable: boolean
}

export const AnimalList = ({ adventureId, editable }: Props) => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [animals, setAnimals] = useState<AnimalStats[] | null>(null)
  const [loremasterId, setLoremasterId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const getAnimals = async () => {
    setLoading(true)

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
      if (data[0]?.loremaster_id) setLoremasterId(data[0].loremaster_id)
      dispatch({ type: 'ANIMALS_LOADED' })
      setLoading(false)
    }
  }

  const createAnimal = async () => {
    await supabase
      .from('animals')
      .insert([{ adventure_id: adventureId, loremaster_id: user.id, name: '', vigour: 0 }])
    getAnimals()
  }

  const updateAnimal = async (data: UpdateAnimalData) => {
    await supabase
      .from('animals')
      .update({ [data.key]: data.value })
      .eq('id', data.id)
  }

  const deleteAnimal = async (id: number) => {
    await supabase
      .from('animals')
      .delete()
      .eq('id', id)
    getAnimals()
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { getAnimals() }, [])

  useEffect(() => {
    const channel = supabase
      .channel('realtime animals')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'animals'
      }, () => {
        getAnimals()
      })
      .subscribe()

    if (loremasterId && user.id === loremasterId) {
      supabase.removeChannel(channel)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase, loremasterId, user.id])

  return (
    <Card title="Ponies and horses">
      <div className="relative flex flex-col gap-2">
        {loading && <Loading />}
        <div className="grid grid-cols-2 gap-2 text-black">
          <span>Name</span>
          <span>Vigour</span>
        </div>
        {fetchError && <span className="text-red-500">{fetchError}</span>}
        {animals && animals
          .sort((a, b) => a.id - b.id)
          .map(item =>
            <Animal
              key={`${item.id}-${item.name}-${item.vigour}`}
              horse={item}
              editable={editable}
              updateEvent={(data) => updateAnimal(data)}
              deleteEvent={(value) => deleteAnimal(value)}
            />
          )
        }
        {(animals && editable && animals.length < 7) && <Button text="Add animal" buttonEvent={() => createAnimal()} />}
      </div>
    </Card>
  )
}