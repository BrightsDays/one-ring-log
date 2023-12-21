export type PlayerStats = {
  id: number
  name: string
  role: Roles
  fatigue: number
}

export type Roles = 'guide' | 'look-out' | 'hunter' | 'scout'