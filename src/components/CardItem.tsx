// Packages
import styled from "styled-components"

// Components
import { Button } from "./Button"
import { FaPlus, FaMinus, FaTimes } from "react-icons/fa"

interface ICardItemProps {
  key: string
  name: string
  quantity: number
  increaseCardQuantity: () => void
  decreaseCardQuantity: () => void
  deleteCard: () => void
}

export const CardItem: React.FC<ICardItemProps> = (props) => {
  const {
    name,
    quantity,
    increaseCardQuantity,
    decreaseCardQuantity,
    deleteCard,
  } = props

  return (
    <CardWrapper>
      <CardInner>
        <CardName>{name}</CardName>
        <CardQuantityWrapper>
          <Button
            type="button"
            fontSize={14}
            onClick={decreaseCardQuantity}
            children={<FaMinus />}
          />
          <CardQuantity>{quantity}</CardQuantity>
          <Button
            type="button"
            fontSize={14}
            onClick={increaseCardQuantity}
            children={<FaPlus />}
          />
        </CardQuantityWrapper>
        <Button
          theme="cancel"
          children={<FaTimes />}
          fontSize={16}
          onClick={deleteCard}
        />
      </CardInner>
    </CardWrapper>
  )
}

const CardWrapper = styled.div`
  flex-basis: 100%;
  @media (min-width: 550px) {
    flex-basis: 50%;
  }
  @media (min-width: 1000px) {
    flex-basis: 33.3%;
  }
`
const CardInner = styled.div`
  background-color: var(--color-primary-lighter);
  border-radius: 5px;
  display: flex;
  align-items: stretch;
  margin: 5px;
  padding: 15px;
`
const CardName = styled.p`
  margin: auto;
  flex: 1;
`

const CardQuantityWrapper = styled.div`
  display: flex;
  align-items: stretch;
  margin-right: 10px;
`

const CardQuantity = styled.p`
  margin: auto;
  width: 40px;
  text-align: center;
`
