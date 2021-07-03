// Packages
import styled from "styled-components"

// Components
import { CardQuantity } from "./CardQuantity"

// Types
import { ICard } from "../../../types/Card"

interface ICardUserInfoProps {
  id: string
  card: ICard
}

export const CardUserInfo: React.FC<ICardUserInfoProps> = (props) => {
  const { card, id } = props
  const { name, set_name, quantity, sellStatus } = card
  return (
    <CardUserInfoWrapper>
      <CardName>{name}</CardName>
      <CardSet>{set_name}</CardSet>
      <CardQuantity quantity={quantity} id={id} />
      {/* TODO: <CardSellStatus sellStatus={sellStatus} id={id} /> */}
    </CardUserInfoWrapper>
  )
}

const CardUserInfoWrapper = styled.div`
  background-color: var(--color-lightergrey);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  flex-basis: 500px;
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
