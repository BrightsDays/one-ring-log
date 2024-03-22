import { Link } from "react-router-dom"
import { Adventure, Character } from "../types"
import { DeleteRowButton } from "./ui/DeleteRowButton"
import { TextInput } from "./ui/TextInput"
import { Button } from "./ui/Button"

interface Props {
  listType: 'adventure' | 'character'
  list: Adventure[] | Character[]
  maxLength: number
  listEvent: (id: string) => void
  value: string
  setEvent: (val: string) => void
  addEvent: () => void
}

export const EditableList = ({ listType, list, maxLength, listEvent, value, setEvent, addEvent}: Props) => {
  return (
    <div className="pb-2">
      <h2 className="text-lg font-medium pb-2 border-b border-y-orange-700">Your {listType}s:</h2>
      <div className="flex flex-col pt-2 pb-2 gap-1">
        { list.map(item => {
          return (
            <div key={item.id} className="flex justify-between border-b pb-1">
              <Link to={`/one-ring-log/adventure?id=${item.id}`}>
                { listType === 'adventure' ?
                  (item as Adventure).adventure :
                  (item as Character).name
                }
              </Link>
              <DeleteRowButton show={true} buttonEvent={() => listEvent(item.id)} />
            </div>
          )
        })}
      </div>
      { list.length < maxLength ? 
        <div className="flex justify-between gap-2 items-stretch">
          <TextInput
            value={value}
            placeholder={`Instert ${listType} ${listType === 'adventure' ? 'title' : 'name'}`}
            inputEvent={value => setEvent(value)}
          />
          <Button size="small" text="Add" disabled={!value.length} buttonEvent={() => addEvent()} />
        </div> :
        <span>There can only be {maxLength} {listType}s here</span>
      }
    </div>
  )
}