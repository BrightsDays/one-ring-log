import supabase from "../supabaseClient"
import { Button } from "./ui/Button"
import { useSelector } from 'react-redux'
import { TextInput } from "./ui/TextInput"
import { useEffect, useState } from "react"
import { IRootState } from "../reducers"
import { Link } from "react-router-dom"

type IAdventureList = {
  id: string
  adventure: string
}[]

const selectUser = (state: IRootState) => state.user

export const PersonalArea = () => {
  const [adventure, setAdventure] = useState('')
  const [adventureList, setAdventureList] = useState<IAdventureList>([])

  const user = useSelector(selectUser)

  const getAdventures = async () => {
    const { data, error } = await supabase
      .from('adventures')
      .select('id, adventure')
      .eq('loremaster_id', user.id)

    if (!error) setAdventureList(data)
  }

  const addAdventure = async () => {
    await supabase
      .from('adventures')
      .insert([{ adventure, loremaster_id: user.id }])

    getAdventures()
  }

  const deleteAdventure = async (id: string) => {
    await supabase
      .from('adventures')
      .delete()
      .eq('id', id)

    getAdventures()
  }

  useEffect(() => {
    getAdventures()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col">
      <div>
        <span>Your adventures:</span>
        <div className="flex flex-col">
          { adventureList.map(item => {
            return (
              <div key={item.id} className="flex">
                <Link to={`/one-ring-log/adventure?id=${item.id}`}>{item.adventure}</Link>
                <Button text="delete" buttonEvent={() => deleteAdventure(item.id)} />
              </div>
            )
          })}
        </div>
        <div>
          <TextInput label="Title" value={adventure} inputEvent={value => setAdventure(value)} />
          <Button text="Add" buttonEvent={() => addAdventure()} />
        </div>
      </div>
    </div>
  )
}