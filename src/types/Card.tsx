import { ILegalities } from "./SearchResult"

export interface ICard {
  name: string
  imageUrl: string
  legalities: ILegalities
  set_name: string
  quantity: number
}
