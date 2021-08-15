// Packages
import styled from "styled-components"

// Hooks
import { useHistory } from "react-router-dom"
import {
  useChangeCardQuantity,
  useDeleteCard,
  useGetCards,
} from "../../../hooks/CardHooks"

// Components
import { Button } from "../../../components/Button"
import { CollectionCardItem } from "./CollectionCardItem"
import { LoadSpinner } from "../../../components/LoadSpinner"

// Types
import { ISearchResult } from "../../../types/SearchResult"

interface ICollectionCardListingProps {
  search?: ISearchResult[]
}

export const CollectionCardListing: React.FC<ICollectionCardListingProps> = (
  props
) => {
  const history = useHistory()
  const { search } = props // Scryfall results
  const { cards, loading, error } = useGetCards({ cards: search })
  const { changeCardQuantity } = useChangeCardQuantity()
  const { deleteCard } = useDeleteCard()

  return (
    <CollectionListWrapper>
      {/* Show spinner while loading */}
      {loading && (
        <SpinnerContainer>
          <LoadSpinner />
        </SpinnerContainer>
      )}

      {/* If no cards are found, show that info to user */}
      {!search && cards && cards?.length === 0 && (
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

      {/* If no cards are found with a specific search */}
      {search && cards && cards?.length === 0 && (
        <NoDataContainer>
          <p>No matching results</p>
          <span>If results should be found, try a more specific search</span>
        </NoDataContainer>
      )}

      {/* If errors are present, show message */}
      {error && (
        <ErrorContainer>
          <p>An error ocurring while loading you collection</p>
        </ErrorContainer>
      )}

      {/* When cards have loaded, show both add button & cards */}
      {cards?.length !== 0 && !error && !loading && (
        <ButtonWrapper>
          <Button
            padding="0.6rem 2rem"
            theme="success"
            fontSize={16}
            onClick={() => {
              history.push("/search")
            }}
          >
            Add card
          </Button>
        </ButtonWrapper>
      )}
      {cards?.map(({ id, name, quantity, set, colors }) => (
        <CollectionCardItem
          key={id}
          id={id}
          name={name}
          colors={colors}
          set={set?.toUpperCase()}
          quantity={quantity}
          increaseCardQuantity={() => changeCardQuantity(id, quantity + 1)}
          decreaseCardQuantity={() => changeCardQuantity(id, quantity - 1)}
          deleteCard={() => deleteCard(id, name)}
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
  text-align: center;

  p {
    color: var(--color-grey);
  }

  span {
    color: var(--color-grey);
    font-style: italic;
  }
`

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;

  p {
    color: var(--color-cancel);
  }
`

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
`
