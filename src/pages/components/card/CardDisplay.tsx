// Packages
import styled from "styled-components"

// Components
import { CardImageDisplayer } from "../../../components/CardImageDisplayer"
import { CardLegalities } from "./CardLegalities"
import { CardUserInfo } from "./CardUserInfo"

// Types
import { ICard } from "../../../types/Card"

interface ICardDisplayProps {
  id: string
  card: ICard
}

export const CardDisplay: React.FC<ICardDisplayProps> = (props) => {
  const { card, id } = props
  const { imageUrl, legalities } = card

  return (
    <CardViewWrapper>
      <CardDetails>
        <CardImageDisplayer imageUrl={imageUrl} parentFlexDirection="column" />
        <CardLegalities legalities={legalities} />
      </CardDetails>
      <CardUserInfo card={card} id={id} />
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
