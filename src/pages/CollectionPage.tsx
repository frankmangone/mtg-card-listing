// Packages
import styled from "styled-components"

// Layout
import { MainLayout } from "../layouts/MainLayout"

// Components
import { CollectionCardListing } from "./components/collection/CollectionCardListing"
import { SearchBar } from "../components/SearchBar"

// Hooks
import { useEffect, useState } from "react"
import { useUser } from "../context/FirebaseContext"
import { useAuthRequiredRoute } from "../hooks/useAuthRequiredRoute"
import { useScryfallQuery } from "../hooks/useScryfallQuery"

export const CollectionPage: React.FC = () => {
  const { user } = useUser()
  const [set, setSet] = useState<string | undefined>(undefined)
  const [search, setSearch] = useState<string>("")
  const { searchResults, loading, error } = useScryfallQuery({ set, search })

  const authRequiredRoute = useAuthRequiredRoute()
  useEffect(() => {
    authRequiredRoute()
  }, [authRequiredRoute])

  return (
    <MainLayout>
      {user ? (
        <CollectionListingWrapper>
          <SearchBar
            {...{
              search,
              setSearch,
              set,
              setSet,
            }}
          />
          <CollectionCardListing search={searchResults} />
        </CollectionListingWrapper>
      ) : null}
    </MainLayout>
  )
}

const CollectionListingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0.8rem;
  padding-left: 1rem;
  padding-right: 1rem;
`
