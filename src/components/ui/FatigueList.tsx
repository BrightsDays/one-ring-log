import { CheckboxInput } from "./CheckboxInput"

interface Props {
  fatigue: number
  disabled: boolean
  fatigueEvent: (index: number, value: boolean) => void
}

export const FatigueList = ({fatigue, disabled, fatigueEvent}: Props) => {
  return (
    <div className="flex gap-1 items-center mb-2 sm:mb-0">
      <span className="xl:hidden text-black whitespace-nowrap">Travel fatigue: </span>
      { Array.from(Array(10).keys()).map((index) => {
          return (
            <CheckboxInput
              key={`fatigue__${index}`}
              value={index < fatigue}
              disabled={disabled}
              inputEvent={(value) => fatigueEvent(index, value)}
            />
          )
        })
      }
    </div>
  )
}