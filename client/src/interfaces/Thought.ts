export interface ThoughtI {
  id?: number
  thoughtContent: string
  typeId: number
  UserId?: number
}

export interface ThoughtCompleteI extends ThoughtI {
  date: string
}

