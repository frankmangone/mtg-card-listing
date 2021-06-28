// Packages
import styled from "styled-components"

// Hooks
import { useCollection } from "../hooks/useCollection"
import { useCollectionData } from "react-firebase-hooks/firestore"

// Components
import { CardItem } from "./CardItem"

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
        <CardItem
          key={id}
          name={name}
          quantity={quantity}
          increaseCardQuantity={() => increaseCardQuantity(id, quantity)}
          decreaseCardQuantity={() => decreaseCardQuantity(id, quantity)}
          deleteCard={() => deleteCard(id)}
        />
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
