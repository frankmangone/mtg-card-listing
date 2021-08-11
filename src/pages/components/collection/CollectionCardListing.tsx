// Packages
import styled from "styled-components"

// Hooks
import { useCollection } from "../../../hooks/useCollection"
import { useHandleCards } from "../../../hooks/useHandleCards"
import { useFlashMessage } from "../../../context/FlashMessageContext"
import { useCollectionData } from "react-firebase-hooks/firestore"

// Components
import { CollectionCardItem } from "./CollectionCardItem"

export const CollectionCardListing: React.FC = () => {
  const cardsCollection = useCollection("cards")
  const query = cardsCollection.orderBy("createdAt", "desc").limit(100)

  const [cards] = useCollectionData(query, { idField: "id" })
  const { changeCardQuantity, deleteCard } = useHandleCards()
  const { addFlashMessage } = useFlashMessage()

  const deleteCardById = (id: string, name: string) => {
    addFlashMessage({
      text: `'${name}' was removed from your collection.`,
      theme: "cancel",
    })
    deleteCard(id)
  }

  return (
    <CollectionListWrapper>
      {cards?.map(({ id, name, quantity }) => (
        <CollectionCardItem
          key={id}
          id={id}
          name={name}
          quantity={quantity}
          increaseCardQuantity={() => changeCardQuantity(id, quantity + 1)}
          decreaseCardQuantity={() => changeCardQuantity(id, quantity - 1)}
          deleteCard={() => deleteCardById(id, name)}
        />
      ))}
    </CollectionListWrapper>
  )
}

// Styled components

const CollectionListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1100px;
  margin-top: 10px;
`
