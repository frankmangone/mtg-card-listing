export interface ICard {
  colors?: string[]
  imageUrl: string
  legalities: ILegalities
  location: string
  name: string
  ownership: Ownership
  ownershipSubject: string
  prices: IPrices
  quantity: number
  sellStatus: SellStatus
  set?: string
  setName: string
  typeLine?: string
  userId: string
}

export interface ILegalities {
  brawl: string
  commander: string
  duel: string
  future: string
  gladiator: string
  historic: string
  legacy: string
  modern: string
  oldschool: string
  pauper: string
  penny: string
  pioneer: string
  premodern: string
  standard: string
  vintage: string
}

export interface IPrices {
  usd: string
  usd_foil: string
  tix: string
}

export type SellStatus = 1 | 2 | 3
export const SELL_STATUS = {
  INACTIVE: 1,
  SELLING: 2,
  BUYING: 3,
}

export const SELL_STATUS_TEXT = {
  1: "In Collection",
  2: "Selling",
  3: "Buying",
}

export type Ownership = 1 | 2 | 3
export const OWNERSHIP = {
  MINE: 1,
  LENT: 2,
  BORROWED: 3,
}

export const OWNERSHIP_TEXT = {
  1: "Mine",
  2: "Lent",
  3: "Borrowed",
}
