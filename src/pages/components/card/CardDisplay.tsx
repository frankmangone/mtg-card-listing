// Packages
import styled from "styled-components"

// Components
import { CardImageDisplayer } from "../../../components/CardImageDisplayer"
import { CardLegalities } from "./CardLegalities"

// Types
import { ILegalities } from "../../../types/SearchResult"
interface ICardDisplayProps {
  card: ICard
}

interface ICard {
  name: string
  imageUrl: string
  legalities: ILegalities
}

export const CardDisplay: React.FC<ICardDisplayProps> = (props) => {
  const { card } = props
  const { name, imageUrl, legalities } = card

  return (
    <>
      <CardTitle>{name}</CardTitle>
      <CardViewWrapper>
        <CardDetails>
          <CardImageDisplayer
            imageUrl={imageUrl}
            parentFlexDirection="column"
          />
          <CardLegalities legalities={legalities} />
        </CardDetails>
      </CardViewWrapper>
    </>
  )
}

const CardTitle = styled.h3``

const CardViewWrapper = styled.div`
  display: flex;
`

const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
`
