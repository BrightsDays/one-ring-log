import { useState } from "react"
import { Card } from "../ui/Card"
import { NumberInput } from "../ui/NumberInput"
import { SelectInput } from "../ui/SelectInput"
import { TextInput } from "../ui/TextInput"

interface Props {
  editable: boolean
}

export const Log = ({ editable }: Props) => {
  const seasons = ['winter', 'spring', 'summer', 'autumn']

  const [year, setYear] = useState(2965)
  const [days, setDays] = useState(0)
  const [journeyFrom, setJourneyFrom] = useState('')
  const [destination, setDestination] = useState('')
  const [season, setSeason] = useState(seasons[0])

  return (
    <Card title="Journey Log">
      <div className="flex flex-col gap-1">
        <NumberInput disabled={!editable} label="Year" min={2965} max={3000} value={year} inputEvent={value => setYear(value)} />
        <SelectInput disabled={!editable} label="Season" value={season} list={seasons} inputEvent={value => setSeason(value)} />
        <TextInput disabled={!editable} label="Journey from" value={journeyFrom} inputEvent={value => setJourneyFrom(value)} />
        <TextInput disabled={!editable} label="Destination" value={destination} inputEvent={value => setDestination(value)} />
        <NumberInput disabled={!editable} label="Days of travel" max={100} value={days} inputEvent={value => setDays(value)}/>
      </div>
    </Card>
  )
}