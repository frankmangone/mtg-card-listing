// Packages
import styled from "styled-components"

// Components
import { CardImageDisplayer } from "../../../components/CardImageDisplayer"
import { CardLegalities } from "./CardLegalities"
import { CardUserInfo } from "./CardUserInfo"

// Types
import { ILegalities } from "../../../types/SearchResult"
interface ICardDisplayProps {
  card: ICard
}

interface ICard {
  name: string
  imageUrl: string
  legalities: ILegalities
  set_name: string
}

export const CardDisplay: React.FC<ICardDisplayProps> = (props) => {
  const { card } = props
  const { name, imageUrl, legalities, set_name } = card

  return (
    <CardViewWrapper>
      <CardDetails>
        <CardImageDisplayer imageUrl={imageUrl} parentFlexDirection="column" />
        <CardLegalities legalities={legalities} />
      </CardDetails>
      <CardUserInfo {...{ name, setName: set_name }} />
    </CardViewWrapper>
  )
}

const CardViewWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 300px;
`
