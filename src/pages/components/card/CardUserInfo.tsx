// Packages
import styled from "styled-components"

// Components
import { CardQuantity } from "./CardQuantity"
import { CardSellStatus } from "./CardSellStatus"
import { CardLocation } from "./CardLocation"
import { CardOwnership } from "./CardOwnership"

// Types
import { ICard } from "../../../types/Card"

interface ICardUserInfoProps {
  id: string
  card: ICard
}

export const CardUserInfo: React.FC<ICardUserInfoProps> = (props) => {
  const { card, id } = props
  const {
    name,
    set_name,
    quantity,
    sellStatus,
    location,
    ownership,
    ownershipSubject,
  } = card
  return (
    <CardUserInfoWrapper>
      <CardName>{name}</CardName>
      <CardSet>{set_name}</CardSet>
      <CardQuantity quantity={quantity} id={id} />
      <CardSellStatus sellStatus={sellStatus} id={id} />
      <CardOwnership
        ownership={ownership}
        ownershipSubject={ownershipSubject}
        id={id}
      />
      <CardLocation location={location} id={id} />
    </CardUserInfoWrapper>
  )
}

const CardUserInfoWrapper = styled.div`
  background-color: var(--color-lightergrey);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  flex-basis: 600px;
  flex-shrink: 1;
  align-items: stretch;
  margin-left: 0.5rem;
  padding: 1.1rem;
  position: relative;
`
const CardName = styled.h3`
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: var(--color-darkgrey);
`

const CardSet = styled.p`
  margin-top: 0;
  color: var(--color-grey);
`
