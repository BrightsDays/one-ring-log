/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { Card } from "../../ui/Card"
import { TextInput } from "../../ui/TextInput"
import { ItemStats, UpdateItemData } from "../../../types"
import { DeleteRowButton } from "../../ui/DeleteRowButton"

interface Props {
  item: ItemStats
  editable: boolean
  updateEvent: (data: UpdateItemData) => void
  deleteEvent: (id: number) => void
}

export const Item = ({ item, editable, updateEvent, deleteEvent }: Props) => {
  const [playerHero, setPlayerHero] = useState(item.player_hero)
  const [itemName, setItemName] = useState(item.item)
  // const [itemType, setItemType] = useState(item.type)
  // const [craftsmanship, setCraftsmanship] = useState(item.craftsmanship)
  // const [bane, setBane] = useState(item.bane)
  // const [qualities, setQualities] = useState(item.qualities)

  useEffect(() => { updateEvent({id: item.id, key: 'player_hero', value: playerHero}) }, [playerHero])
  useEffect(() => { updateEvent({id: item.id, key: 'item', value: itemName}) }, [itemName])

  return (
    <Card>
      <TextInput
        disabled={!editable}
        label="Item" 
        oneLine
        value={itemName || ''}
        inputEvent={(value) => setItemName(value)}
      >
        <DeleteRowButton
          show={(!itemName.length && editable) ? true : false}
          buttonEvent={() => deleteEvent(item.id)}
        />
      </TextInput>
      <TextInput
        disabled={!editable}
        label="Player-hero"
        oneLine
        value={playerHero || ''} 
        inputEvent={(value) => setPlayerHero(value)}
      />
      {/* <TextInput
        disabled={!editable}
        label="Type" oneLine value="" inputEvent={()=>{}} />
      <TextInput
        disabled={!editable}
        label="Craftsmanship" oneLine value="" inputEvent={()=>{}} />
      <TextInput
        disabled={!editable}
        label="Bane" oneLine value="" inputEvent={()=>{}} />
      <TextInput
        disabled={!editable}
        label="Qualities" oneLine value="" inputEvent={()=>{}} /> */}
    </Card>
  )
}