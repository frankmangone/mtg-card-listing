// Packages
import styled from "styled-components"

// Components
import { Link } from "react-router-dom"
import { Button } from "../../../components/Button"
import { FaChevronDown, FaChevronUp, FaTimes } from "react-icons/fa"

interface ICollectionCardItemProps {
  key: string
  id: string
  name: string
  quantity: number
  increaseCardQuantity: () => void
  decreaseCardQuantity: () => void
  deleteCard: () => void
}

export const CollectionCardItem: React.FC<ICollectionCardItemProps> = (
  props
) => {
  const {
    id,
    name,
    quantity,
    increaseCardQuantity,
    decreaseCardQuantity,
    deleteCard,
  } = props

  return (
    <CardWrapper>
      <CardInner>
        <CardName>
          <Link to={`/cards/${id}`}>{name}</Link>
        </CardName>
        <CardQuantityWrapper>
          <CardQuantity>{quantity}</CardQuantity>
          <Button
            type="button"
            styling="transparent"
            fontSize={14}
            onClick={decreaseCardQuantity}
            children={<FaChevronDown />}
          />
          <Button
            type="button"
            styling="transparent"
            fontSize={14}
            onClick={increaseCardQuantity}
            children={<FaChevronUp />}
          />
        </CardQuantityWrapper>
        <Button
          theme="cancel"
          styling="transparent"
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
  background-color: var(--color-lightergrey);
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: stretch;
  margin: 5px;
  padding: 5px 5px 5px 15px;
  transition: all 0.1s linear;

  &:hover {
    box-shadow: 0 0 3px 1px var(--color-grey);
  }
`

const CardName = styled.p`
  margin: auto;
  flex: 1;

  a {
    color: var(--color-darkgrey);
    text-decoration: none;
    transition: color 0.1s linear;
    &:hover {
      color: var(--color-grey);
    }
  }
`

const CardQuantityWrapper = styled.div`
  display: flex;
  align-items: stretch;
`

const CardQuantity = styled.p`
  margin: auto;
  text-align: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`
