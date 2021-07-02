// Packages
import styled from "styled-components"

// Components
import { CardImageDisplayer } from "../../../components/CardImageDisplayer"
interface ICardDisplayProps {
  card: ICard
}

interface ICard {
  name: string
  imageUrl: string
}

export const CardDisplay: React.FC<ICardDisplayProps> = (props) => {
  const { card } = props
  const { name, imageUrl } = card

  return (
    <>
      <CardTitle>{name}</CardTitle>
      <CardDetails>
        <CardImageDisplayer imageUrl={imageUrl} />
      </CardDetails>
    </>
  )
}

const CardTitle = styled.h3``

const CardDetails = styled.div`
  display: flex;
`
