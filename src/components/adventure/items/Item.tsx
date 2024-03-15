/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
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
  const [itemType, setItemType] = useState(item.type)
  const [craftsmanship, setCraftsmanship] = useState(item.craftsmanship)
  const [bane, setBane] = useState(item.bane)
  const [qualities, setQualities] = useState(item.qualities)

  useEffect(() => { updateEvent({id: item.id, key: 'player_hero', value: playerHero}) }, [playerHero])
  useEffect(() => { updateEvent({id: item.id, key: 'item', value: itemName}) }, [itemName])

  return (
    <div
      className="flex flex-col gap-2 sm:gap-5 p-3 sm:p-5 border-solid border-2 rounded-lg border-orange-700"
    >
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
      <TextInput
        disabled={!editable}
        label="Type"
        oneLine
        value={itemType}
        inputEvent={(value) => setItemType(value)}
      />
      <TextInput
        disabled={!editable}
        label="Craftsmanship"
        oneLine
        value={craftsmanship}
        inputEvent={(value) => setCraftsmanship(value)}
      />
      <TextInput
        disabled={!editable}
        label="Bane"
        oneLine
        value={bane}
        inputEvent={(value) => setBane(value)}
      />
      <TextInput
        disabled={!editable}
        label="Qualities"
        oneLine
        value={qualities}
        inputEvent={(value) => setQualities(value)}
      />
    </div>
  )
}