import { useState } from "react"
import { Button } from "../ui/Button"
import { TextInput } from "../ui/TextInput"
// import { useDetectClickOutside } from "react-detect-click-outside"
import supabase from "../../supabaseClient"

// interface Props {
//   closeForm?: () => void
// }

export const AuthForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // const ref = useDetectClickOutside({ onTriggered: closeForm })

  async function signUpNewUser() {
    await supabase.auth.signUp({
      email: 'example1@email.com',
      password: 'qwerty',
      options: {
        // emailRedirectTo: 'https://example.com/welcome'
      }
    })
  }

  const signInWithEmail = async () => {
    await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })
  }

  return (
    <form
      className="min-w-80 flex flex-col gap-5 p-5 border-solid border border-sky-500 rounded-lg bg-slate-900"
    >
      <TextInput
        label="Email"
        value={email}
        inputEvent={(value) => setEmail(value)}
      />
      <TextInput
        label="Password"
        value={password}
        isPassword
        inputEvent={(value) => setPassword(value)}
      />
      <Button
        text="Confirm"
        buttonEvent={() => signInWithEmail()}
      />
      <Button text="ADD" buttonEvent={() => signUpNewUser()} />
    </form>
  )
}