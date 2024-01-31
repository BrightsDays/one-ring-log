import supabase from "../supabaseClient"
import { Button } from "./ui/Button"
import { useSelector, useDispatch } from 'react-redux'
import { TextInput } from "./ui/TextInput"
import { useState } from "react"
import { IRootState } from "../reducers"

const selectUser = (state: IRootState) => state.user

export const PersonalArea = () => {
  const [adventure, setAdventure] = useState('')

  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const signOut = () => {
    supabase.auth.signOut()
    dispatch({ type: 'clear'})
  }

  return (
    <div className="flex flex-col">
      <div className="flex place-content-between">
        <span>{ user.name }</span>
        <Button text='OUT' buttonEvent={() => signOut()} />
      </div>
      <div>
        <span>Your adventures: {adventure}</span>
        <TextInput label="Title" value={adventure} inputEvent={value => setAdventure(value)} />
      </div>
    </div>
  )
}