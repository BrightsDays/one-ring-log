import { CheckboxInput } from "../ui/CheckboxInput"

interface Props {
  fatigue: number
  fatigueEvent: (index: number, value: boolean) => void
}

export const FatigueList = ({fatigue, fatigueEvent}: Props) => {
  return (
    <div>
      { Array.from(Array(10).keys()).map((index) => {
          return (
            <CheckboxInput
              key={`fatigue__${index}`}
              value={index < fatigue}
              inputEvent={(value) => fatigueEvent(index, value)}
            />
          )
        })
      }
    </div>
  )
}