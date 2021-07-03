// Packages
import styled from "styled-components"

// Types
import { ILegalities } from "../../../types/SearchResult"

// Helpers
import { capitalize } from "../../../helpers/capitalize"

interface ICardLegalitiesProps {
  legalities: ILegalities
}

export const CardLegalities: React.FC<ICardLegalitiesProps> = (props) => {
  const { legalities } = props
  return (
    <CardLegalitiesWrapper>
      <h4>Legality:</h4>
      {Object.entries(legalities).map(([key, value]) => {
        return (
          <CardLegality key={key} legal={value}>
            {capitalize(key)}
          </CardLegality>
        )
      })}
    </CardLegalitiesWrapper>
  )
}

const CardLegalitiesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  h4 {
    padding-left: 0.2rem;
    margin: 1rem 0;
    flex-basis: 100%;
  }
`

interface ILegalityValueProps {
  legal: string
}

const CardLegality = styled.p<ILegalityValueProps>`
  display: flex;
  font-size: 0.9rem;
  ${(props) =>
    props.legal === "legal"
      ? "background-color: var(--color-primary);"
      : "background-color: var(--color-darkgrey);"}
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  padding: 5px;
  margin: 0.2rem;
  color: var(--color-white);
  box-shadow: 0 0 3px 1px var(--color-lightgrey);
`
