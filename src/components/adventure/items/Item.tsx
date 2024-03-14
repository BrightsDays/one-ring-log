import { Card } from "../../ui/Card"
import { TextInput } from "../../ui/TextInput"

export const Item = () => {
  return (
    <Card>
      <TextInput label="Player-hero" oneLine value="" inputEvent={()=>{}} />
      <TextInput label="Item" oneLine value="" inputEvent={()=>{}} />
      <TextInput label="Type" oneLine value="" inputEvent={()=>{}} />
      <TextInput label="Craftsmanship" oneLine value="" inputEvent={()=>{}} />
      <TextInput label="Bane" oneLine value="" inputEvent={()=>{}} />
      <TextInput label="Qualities" oneLine value="" inputEvent={()=>{}} />
    </Card>
  )
}