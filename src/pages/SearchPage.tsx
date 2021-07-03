// Packages
import styled from "styled-components"

// Layout
import { MainLayout } from "../layouts/MainLayout"

// Components
import { CardImageDisplayer } from "../components/CardImageDisplayer"
import { SearchBar } from "../components/SearchBar"
import { SearchResultsList } from "./components/search/SearchResultsList"

// Context
import { SetsContext, useSetsData } from "../context/SetsContext"

// Hooks
import { useState } from "react"
import { useScryfallQuery } from "../hooks/useScryfallQuery"

export const SearchPage: React.FC = () => {
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [set, setSet] = useState("")
  const [imagePreviewUrl, setImagePreviewUrl] = useState("")

  const { sets, loadingSets } = useSetsData()

  useScryfallQuery({
    set,
    search,
    setSearchResults,
    setLoading,
  })

  return (
    <SetsContext.Provider value={{ sets, loadingSets }}>
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
    </SetsContext.Provider>
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
