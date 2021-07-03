interface IImageResolutions {
  small: string
  normal: string
  large: string
}

export interface IPrices {
  usd: string
  usd_foil: string
  tix: string
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

export interface ISearchResult {
  id: string
  card_faces?: { image_uris: IImageResolutions }[]
  image_uris?: IImageResolutions
  legalities: ILegalities
  name: string
  prices: IPrices
  set: string
  set_name: string
  // TODO: Expand this as needed
}
