import { useState } from "react"
import { Button } from "../ui/Button"
import { TextInput } from "../ui/TextInput"

export const Auth = () => {
  const [showForm, setShowForm] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <Button
        text="Sign in"
        buttonEvent={() => setShowForm(true)}
      />
      { showForm && 
        <form>
          <TextInput
            label="Email"
            value={email}
            inputEvent={(value) => setEmail(value)}
          />
          <TextInput
            label="Password"
            value={password}
            inputEvent={(value) => setPassword(value)}
          />
          <Button
            text="Confirm"
            buttonEvent={() => setShowForm(false)}
          />
        </form>
      }
    </div>
  )
}