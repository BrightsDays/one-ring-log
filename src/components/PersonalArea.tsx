import supabase from "../supabaseClient"
import { useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { IRootState } from "../reducers"
import { IAdventure } from "../types"
// import { IAdventure, ICharacter } from "../types"
import { EditableList } from "./EditableList"

const selectUser = (state: IRootState) => state.user

export const PersonalArea = () => {
  const [adventure, setAdventure] = useState('')
  const [adventureList, setAdventureList] = useState<IAdventure[]>([])
  // const [character, setCharacter] = useState('')
  // const [characterList, setCharacterList] = useState<ICharacter[]>([])

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
    setAdventure('')
  }

  const deleteAdventure = async (id: string) => {
    await supabase
      .from('adventures')
      .delete()
      .eq('id', id)

    getAdventures()
  }

  // const getCharacters = async () => {
  //   const { data, error } = await supabase
  //     .from('characters')
  //     .select('id, name')
  //     .eq('loremaster_id', user.id)

  //   if (!error) setCharacterList(data)
  // }

  // const addCharacter = async () => {
  //   await supabase
  //     .from('characters')
  //     .insert([{ name: character, loremaster_id: user.id }])

  //   getCharacters()
  //   setCharacter('')
  // }

  // const deleteCharacter = async (id: string) => {
  //   await supabase
  //     .from('characters')
  //     .delete()
  //     .eq('id', id)

  //   getCharacters()
  // }

  useEffect(() => {
    getAdventures()
    // getCharacters()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col pt-3 pb-3 gap-3">
        {/* <EditableList
          listType="character"
          list={characterList}
          maxLength={5}
          listEvent={(id) => deleteCharacter(id)}
          value={character}
          setEvent={(val) => setCharacter(val)}
          addEvent={() => addCharacter()}
        /> */}
        <EditableList
          listType="adventure"
          list={adventureList}
          maxLength={3}
          listEvent={(id) => deleteAdventure(id)}
          value={adventure}
          setEvent={(val) => setAdventure(val)}
          addEvent={() => addAdventure()}
        />
    </div>
  )
}