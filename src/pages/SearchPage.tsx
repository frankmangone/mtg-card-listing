// Packages
import styled from "styled-components"

// Layout
import { MainLayout } from "../layouts/MainLayout"

// Components
import { SearchBar } from "../components/SearchBar"
import { SearchResultsCardDisplayer } from "../components/SearchResultsCardDisplayer"
import { SearchResultsList } from "../components/SearchResultsList"

// Hooks
import { useState } from "react"
import { useScryfallQuery } from "../hooks/useScryfallQuery"

export const SearchPage: React.FC = () => {
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [imagePreviewURL, setImagePreviewURL] = useState<string>("")

  useScryfallQuery({
    search,
    setSearchResults,
    setLoading,
  })

  return (
    <MainLayout>
      <SearchPageWrapper>
        <SearchBar
          search={search}
          setSearch={setSearch}
          setLoading={setLoading}
        />
        <SearchResultsWrapper>
          <SearchResultsCardDisplayer imagePreviewURL={imagePreviewURL} />
          <SearchResultsList
            loading={loading}
            search={search}
            searchResults={searchResults}
            setImagePreviewURL={setImagePreviewURL}
          />
        </SearchResultsWrapper>
      </SearchPageWrapper>
    </MainLayout>
  )
}

const SearchPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
`

const SearchResultsWrapper = styled.div`
  display: flex;
  align-self: stretch;
  justify-content: center;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 1rem;
`
