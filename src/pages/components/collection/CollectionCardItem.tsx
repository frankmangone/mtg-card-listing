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
  setName: string
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
    setName,
    quantity,
    increaseCardQuantity,
    decreaseCardQuantity,
    deleteCard,
  } = props

  return (
    <CardWrapper>
      <CardInner>
        <CardSet>{setName}</CardSet>
        <CardName to={`/cards/${id}`}>{name}</CardName>
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
  min-width: 0;
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
  padding: 5px;
  transition: all 0.1s linear;

  &:hover {
    box-shadow: 0 0 3px 1px var(--color-grey);
  }
`

const CardSet = styled.p`
  margin: 0;
  margin-right: 10px;
  background-color: var(--color-grey);
  color: var(--color-white);
  display: flex;
  flex-basis: 2rem;
  font-size: 0.8rem;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 4px;
`

const CardName = styled(Link)`
  margin: auto;
  flex: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: var(--color-darkgrey);
  text-decoration: none;
  transition: color 0.1s linear;
  &:hover {
    color: var(--color-grey);
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
