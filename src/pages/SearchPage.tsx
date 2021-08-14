// Packages
import styled from "styled-components"

// Layout
import { MainLayout } from "../layouts/MainLayout"

// Components
import { CardImageDisplayer } from "../components/CardImageDisplayer"
import { SearchBar } from "../components/SearchBar"
import { SearchResultsList } from "./components/search/SearchResultsList"

// Hooks
import { useState } from "react"
import { useLocalStorageState } from "../hooks/useLocalStorageState"
import { useScryfallQuery } from "../hooks/useScryfallQuery"

export const SearchPage: React.FC = () => {
  const [search, setSearch] = useLocalStorageState("searchPageSearchString", "")
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [set, setSet] = useLocalStorageState<string | undefined>(
    "searchPageSet",
    undefined
  )
  const [imagePreviewUrl, setImagePreviewUrl] = useState("")

  useScryfallQuery({
    set,
    search,
    setSearchResults,
    setLoading,
  })

  return (
    <MainLayout>
      <SearchPageWrapper>
        <SearchBar
          {...{
            search,
            setSearch,
            set,
            setSet,
            setLoading,
          }}
        />
        <SearchResultsWrapper>
          <CardImageDisplayer imageUrl={imagePreviewUrl} />
          <SearchResultsList
            {...{
              loading,
              search,
              searchResults,
              setImagePreviewUrl,
            }}
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
  padding-top: 0.8rem;
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
