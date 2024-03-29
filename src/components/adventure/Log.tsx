/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { Card } from "../ui/Card"
import { NumberInput } from "../ui/NumberInput"
import { SelectInput } from "../ui/SelectInput"
import { TextInput } from "../ui/TextInput"
import supabase from "../../supabase/supabaseClient"
import { LogKeys } from "../../types"
import { RootState } from "../../reducers/main"
import { useDispatch, useSelector } from "react-redux"

const selectUser = (state: RootState) => state.user

interface Props {
  adventureId: string
  editable: boolean
}

export const Log = ({ editable, adventureId }: Props) => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const seasonList = ['winter', 'spring', 'summer', 'autumn']

  const [fetched, setFetched] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)

  const [loremasterId, setLoremasterId] = useState<string | null>(null)
  const [year, setYear] = useState(2965)
  const [season, setSeason] = useState(seasonList[0])
  const [from, setFrom] = useState('')
  const [destination, setDestination] = useState('')
  const [days, setDays] = useState(0)
  
  const fetchLog = async () => {
    const { data, error } = await supabase
      .from('adventures')
      .select()
      .eq('id', adventureId) 
    
    if (error) {
      setFetchError('Could not fetch adventure log :(')
    } else if (data && data[0]) {
      setYear(data[0].year)
      setSeason(data[0].season)
      setFrom(data[0].from)
      setDestination(data[0].destination)
      setDays(data[0].days)
      setFetched(true)
      setLoremasterId(data[0].loremaster_id)

      setFetchError(null)
      
      dispatch({ type: 'LOG_LOADED' })
    }
  }

  const fetch = async () => {
    await fetchLog()
  }

  const updateData = async (key: LogKeys, value: number | string) => {
    if (fetched && user.id) await supabase
      .from('adventures')
      .update({ [key]: value, loremaster_id: user.id })
      .eq('id', adventureId)
  }

  useEffect(() => { updateData('year', year) }, [year])
  useEffect(() => { updateData('season', season) }, [season])
  useEffect(() => { updateData('from', from) }, [from])
  useEffect(() => { updateData('destination', destination) }, [destination])
  useEffect(() => { updateData('days', days) }, [days])

  useEffect(() => {
    fetch()
  }, [])

  useEffect(() => {
    const channel = supabase
      .channel('realtime log')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'adventures'
      }, () => {
        fetch()
      })
      .subscribe()

    if (fetched && user.id === loremasterId) {
      supabase.removeChannel(channel)
    }
  }, [supabase, loremasterId, user.id])

  return (
    <Card title="Journey Log">
      <div className="flex flex-col gap-1">
        { fetchError && <span>{ fetchError }</span>}
        <NumberInput disabled={!editable} label="Year" min={2965} max={3000} value={year} inputEvent={value => setYear(value) } />
        <SelectInput disabled={!editable} label="Season" value={season} list={seasonList} inputEvent={value => setSeason(value) } />
        <TextInput disabled={!editable} label="Journey from" value={from} inputEvent={value => setFrom(value) } />
        <TextInput disabled={!editable} label="Destination" value={destination} inputEvent={value => setDestination(value) } />
        <NumberInput disabled={!editable} label="Days of travel" max={100} value={days} inputEvent={value => setDays(value) }/>
      </div>
    </Card>
  )
}