// Packages
import styled from "styled-components"

// Hooks
import { useHistory } from "react-router-dom"
import { useCollection } from "../../../hooks/useCollection"
import { useHandleCards } from "../../../hooks/useHandleCards"
import { useFlashMessage } from "../../../context/FlashMessageContext"
import { useUser } from "../../../context/FirebaseContext"
import { useCollectionData } from "react-firebase-hooks/firestore"

// Components
import { Button } from "../../../components/Button"
import { CollectionCardItem } from "./CollectionCardItem"
import { LoadSpinner } from "../../../components/LoadSpinner"

export const CollectionCardListing: React.FC = () => {
  const { user } = useUser()
  const history = useHistory()
  const cardsCollection = useCollection("cards")
  const query = cardsCollection
    .orderBy("createdAt", "desc")
    .limit(100)
    .where("userId", "==", user?.uid)

  const [cards, loading, error] = useCollectionData(query, { idField: "id" })
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
      {/* Show spinner while loading */}
      {loading && (
        <SpinnerContainer>
          <LoadSpinner />
        </SpinnerContainer>
      )}

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

      {cards && cards.length === 0 && (
        <NoDataContainer>
          <p>You have no cards in your collection</p>
          <Button
            onClick={() => {
              history.push("/search")
            }}
          >
            Add cards
          </Button>
        </NoDataContainer>
      )}
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

const SpinnerContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
`

const NoDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;

  p {
    color: var(--color-grey);
  }
`
