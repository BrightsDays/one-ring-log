import { Skill } from "../../types"

interface Props {
  title: string
  skills: Skill[]
}

export const StatBlock = ({ title, skills }: Props) => {
  return (
    <div>
      <div>
        <span>{title}</span>
      </div>
      <div>
        {skills.map((item) => (
          <div>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  )
}