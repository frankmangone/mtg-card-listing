// Packages
import styled from "styled-components"
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa"

// Hooks
import { useCollection } from "../context/FirebaseContext"
import { useCollectionData } from "react-firebase-hooks/firestore"

// Components
import { Button } from "./Button"

export const CardListing: React.FC = () => {
  const cardsCollection = useCollection("cards")
  const query = cardsCollection.orderBy("createdAt", "desc").limit(100)

  const [cards] = useCollectionData(query, { idField: "id" })

  const decreaseCardQuantity = (id: string, originalQty: number) => {
    if (originalQty > 1) {
      cardsCollection?.doc(id).update({
        quantity: originalQty - 1,
      })
    }
  }

  const increaseCardQuantity = (id: string, originalQty: number) => {
    cardsCollection?.doc(id).update({
      quantity: originalQty + 1,
    })
  }

  const deleteCard = (id: string) => {
    cardsCollection.doc(id).delete()
  }

  return (
    <CardsContainer>
      {cards?.map(({ id, name, quantity }) => (
        <CardWrapper key={id}>
          <CardInnerBorder>
            <CardName>{name}</CardName>
            <CardQuantityWrapper>
              <Button
                type="button"
                fontSize={18}
                onClick={() => decreaseCardQuantity(id, quantity)}
                children={<FaMinus />}
              />
              <CardQuantity>{quantity}</CardQuantity>
              <Button
                type="button"
                fontSize={18}
                onClick={() => increaseCardQuantity(id, quantity)}
                children={<FaPlus />}
              />
            </CardQuantityWrapper>
            <Button
              theme="cancel"
              children={<FaTimes />}
              fontSize={18}
              onClick={() => {
                deleteCard(id)
              }}
            />
          </CardInnerBorder>
        </CardWrapper>
      ))}
    </CardsContainer>
  )
}

// Styled components

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1100px;
  margin-top: 10px;
`
const CardWrapper = styled.div`
  flex-basis: 100%;
  @media (min-width: 550px) {
    flex-basis: 50%;
  }
  @media (min-width: 1000px) {
    flex-basis: 33.3%;
  }
`
const CardInnerBorder = styled.div`
  border: 1px solid black;
  display: flex;
  align-items: stretch;
  margin: 5px;
  padding: 15px 10px 15px 20px;
`
const CardName = styled.p`
  margin: auto;
  flex: 1;
`

const CardQuantityWrapper = styled.div`
  display: flex;
  border: 1px solid black;
  align-items: stretch;
  margin-right: 10px;
`

const CardQuantity = styled.p`
  margin: auto 15px;
  width: 13px;
  text-align: center;
`
