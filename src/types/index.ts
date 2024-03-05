export type IAdventure = {
  id: string
  adventure: string
}

export type ICharacter = {
  id: string
  name: string
}

export type PlayerStats = {
  id: number
  name: string
  role: Roles
  fatigue: number
}

export type AnimalStats = {
  id: number
  name: string
  vigour: number
}

export type LogKeys = 'year' | 'season' | 'from' | 'destination' | 'days'
export type PlayerKeys = 'name' | 'role' | 'fatigue'
export type Roles = 'guide' | 'look-out' | 'hunter' | 'scout'