export interface ICard {
  name: string
  imageUrl: string
  legalities: ILegalities
  set_name: string
  quantity: number
  sellStatus: SellStatus
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

export type SellStatus = 0 | 1 | 2
export const SELL_STATUSES = {
  INACTIVE: 0,
  SELLING: 1,
  BUYING: 2,
}
