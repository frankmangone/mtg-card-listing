// Packages
import styled from "styled-components"

// Components
import { CardInfoField } from "./CardInfoField"

// Hooks
import { useHandleCards } from "../../../hooks/useHandleCards"

interface ICardQuantityProps {
  id: string
  quantity: number
}

export const CardQuantity: React.FC<ICardQuantityProps> = (props) => {
  const { quantity, id } = props
  const { changeCardQuantity } = useHandleCards()

  return (
    <CardInfoField>
      <Title>Quantity:</Title>
      <Spacer />
      <Value>{quantity}</Value>
    </CardInfoField>
  )
}

const Title = styled.p`
  color: var(--color-darkgrey);
  margin-right: 1rem;
`

const Value = styled.p`
  font-weight: bold;
  text-align: right;
  margin-right: 0.35rem;
`
const Spacer = styled.div`
  flex-grow: 1;
  height: 1px;
  background-color: var(--color-lightgrey);
  margin-right: 1rem;
`
