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
    </MainLayout>
  )
}

const SearchResultsWrapper = styled.div`
  display: flex;
  margin: auto;
  margin-top: 1rem;
  max-width: 1000px;
  width: 100vw;
`
