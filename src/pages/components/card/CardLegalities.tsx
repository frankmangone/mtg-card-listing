// Packages
import styled from "styled-components"

// Types
import { ILegalities } from "../../../types/SearchResult"

interface ICardLegalitiesProps {
  legalities: ILegalities
}

export const CardLegalities: React.FC<ICardLegalitiesProps> = (props) => {
  const { legalities } = props
  return (
    <CardLegalitiesWrapper>
      {Object.entries(legalities).map(([key, value]) => (
        <p key={key}>
          {key}: {value}
        </p>
      ))}
    </CardLegalitiesWrapper>
  )
}

const CardLegalitiesWrapper = styled.div``
