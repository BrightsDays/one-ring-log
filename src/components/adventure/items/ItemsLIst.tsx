/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../reducers/main"
import { Item } from "./Item"
import { useEffect, useState } from "react"
import { ItemStats, UpdateItemData } from "../../../types"
import supabase from "../../../supabase/supabaseClient"
import { Button } from "../../ui/Button"
import { Loading } from "../../ui/Loading"

const selectUser = (state: RootState) => state.user

interface Props {
  adventureId: string
  editable: boolean
}

export const ItemsList = ({ adventureId, editable }: Props) => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [items, setItems] = useState<ItemStats[] | null>(null)
  const [loremasterId, setLoremasterId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const getItems = async () => {
    const { data, error } = await supabase
      .from('items')
      .select('id, adventure_id, loremaster_id, player_hero, item, type, craftsmanship, bane, qualities')
      .eq('adventure_id', adventureId)
    
    if (error) {
      setFetchError('Could not fetch items :(')
      setItems(null)
    } else if (data) {
      setItems(data)
      setFetchError(null)
      if (data[0]?.loremaster_id) setLoremasterId(data[0].loremaster_id)
      dispatch({ type: 'ITEMS_LOADED' })
      setLoading(false)
    }
  }

  const addItem = async () => {
    setLoading(true)
    await supabase
      .from('items')
      .insert([{
        adventure_id: adventureId,
        loremaster_id: user.id,
        player_hero: '',
        item: '',
        type: '',
        craftsmanship: '',
        bane: '',
        qualities: ''
      }])
    getItems()
  }

  const updateItem = async (data: UpdateItemData) => {
    await supabase
      .from('items')
      .update({ [data.key]: data.value })
      .eq('id', data.id)
  }

  const deleteItem = async (id: number) => {
    setLoading(true)
    await supabase
      .from('items')
      .delete()
      .eq('id', id)
    getItems()
  }

  useEffect(() => { getItems() }, [])

  useEffect(() => {
    const channel = supabase
      .channel('realtime items')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'items'
      }, () => {
        getItems()
      })
      .subscribe()      

    if (loremasterId && user.id === loremasterId) {
      supabase.removeChannel(channel)
    }
  }, [supabase, loremasterId, user.id])

  return (
    <div className="relative grid grid-cols-1 sm:grid-cols-3 w-full gap-1">
      {loading && <Loading />}
      {fetchError && <span className="text-red-500">{fetchError}</span>}
      {items && items
        .sort((a, b) => a.id - b.id)
        .map(item => {
          return (
            <Item
              key={`${item.id}-${item.player_hero}-${item.item}-${item.type}-${item.bane}-${item.qualities}-${item.craftsmanship}`}
              item={item as ItemStats}
              editable={editable}
              updateEvent={(data) => updateItem(data)}
              deleteEvent={(value) => deleteItem(value)}
            />
          )
        })
      }
      {(items && editable && items.length < 6) && <Button text="Add item" buttonEvent={() => addItem()} />}
    </div>
  )
}