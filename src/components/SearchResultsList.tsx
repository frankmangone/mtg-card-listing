// Packages
import styled from "styled-components"

// Components
import { LoadSpinner } from "./LoadSpinner"
import { SearchResultItem } from "./SearchResultItem"

// Types
import { ISearchResult } from "./SearchResultItem"

interface ISearchResultsListProps {
  loading: boolean
  search: string
  searchResults: ISearchResult[]
  setImagePreviewURL: React.Dispatch<string>
}

export const SearchResultsList: React.FC<ISearchResultsListProps> = (props) => {
  const { loading, search, searchResults, setImagePreviewURL } = props

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
      {searchResults.map((searchResult) => {
        return (
          <SearchResultItem
            key={searchResult.id}
            {...{ searchResult, setImagePreviewURL }}
          />
        )
      })}
    </ResultsWrapper>
  )
}

const ResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 500px;
  flex-shrink: 1;
  align-items: stretch;
  margin-left: 0.5rem;
  position: relative;
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
