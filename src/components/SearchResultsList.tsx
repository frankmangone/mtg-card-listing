// Packages
import styled from "styled-components"

// Components
import { FaPlus } from "react-icons/fa"
import { Button } from "./Button"
import { LoadSpinner } from "./LoadSpinner"

// Hooks
import { useHandleCards } from "../hooks/useHandleCards"

interface ISearchResultsListProps {
  loading: boolean
  search: string
  searchResults: any[] // TODO: Better typing
}

export const SearchResultsList: React.FC<ISearchResultsListProps> = (props) => {
  const { loading, search, searchResults } = props

  const { saveCard } = useHandleCards()

  return (
    <ResultsWrapper>
      {/* Show spinner while loading */}
      {loading && (
        <SpinnerContainer>
          <LoadSpinner />
        </SpinnerContainer>
      )}

      {/* Show message before searching */}
      {search === "" && searchResults.length === 0 && (
        <Message>Search for cards to add to your collection</Message>
      )}

      {/* Show message when no matching results */}
      {search !== "" && !loading && searchResults.length === 0 && (
        <Message>No matching results</Message>
      )}

      {/* Show results */}
      {searchResults.map((searchResult) => (
        <ResultItem key={searchResult.id}>
          <p>{searchResult.name}</p>
          <Button
            children={<FaPlus />}
            styling="transparent"
            onClick={() =>
              saveCard({
                name: searchResult.name,
                quantity: 1,
              })
            }
          />
        </ResultItem>
      ))}
    </ResultsWrapper>
  )
}

const ResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: stretch;
  margin-left: 0.5rem;
  position: relative;
`

const ResultItem = styled.div`
  align-items: center;
  background-color: var(--color-lightgrey);
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  height: 30px;
  margin-bottom: 0.5rem;
  padding: 5px 5px 5px 15px;
`

const Message = styled.div`
  align-items: center;
  background-color: var(--color-lightgrey);
  border-radius: 5px;
  color: var(--color-grey);
  display: flex;
  justify-content: center;
  height: 30px;
  padding: 5px;
`

const SpinnerContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  justify-content: center;
  position: absolute;
  padding-top: 20px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
`
