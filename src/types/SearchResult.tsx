import { ILegalities, IPrices } from "./Card"

interface IImageResolutions {
  small: string
  normal: string
  large: string
}

export interface ISearchResult {
  id: string
  card_faces?: { image_uris: IImageResolutions }[]
  color_identity: string[]
  color_indicator: string[]
  colors: string[]
  image_uris?: IImageResolutions
  legalities: ILegalities
  name: string
  prices: IPrices
  set: string
  set_name: string
  type_line: string
  // TODO: Expand this as needed
}
