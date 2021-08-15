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

export const CollectionPage: React.FC = () => {
  const { user } = useUser()
  const [search, setSearch] = useState<string>("")
  const [set, setSet] = useState<string | undefined>(undefined)

  const authRequiredRoute = useAuthRequiredRoute()
  useEffect(() => {
    authRequiredRoute()
  }, [authRequiredRoute])

  return (
    <MainLayout>
      {user ? (
        <CollectionListingWrapper>
          {/**
           * Full-text search is not implemented yet because it is a paid service.
           * For text search, only prefix search is implemented:
           * https://stackoverflow.com/questions/46568142/google-firestore-query-on-substring-of-a-property-value-text-search
           *  */}
          <SearchBar
            {...{
              search,
              setSearch,
              set,
              setSet,
            }}
          />
          <CollectionCardListing search={search} />
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
