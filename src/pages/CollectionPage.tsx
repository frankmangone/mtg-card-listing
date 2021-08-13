// Packages
import styled from "styled-components"

// Layout
import { MainLayout } from "../layouts/MainLayout"

// Components
import { CollectionCardListing } from "./components/collection/CollectionCardListing"
import { UnderConstruction } from "../components/UnderConstruction"
import { SearchBar } from "../components/SearchBar"

// Hooks
import { useState } from "react"
import { useUser } from "../context/FirebaseContext"

export const CollectionPage: React.FC = () => {
  const { user } = useUser()
  const [search, setSearch] = useState("")
  const [set, setSet] = useState<string | undefined>(undefined)

  return (
    <MainLayout>
      {user ? (
        <CollectionListingWrapper>
          {/**
           * Searchbar under construction because of the need to integrate full-text search
           * with Elastic or something
           * https://firebase.google.com/docs/firestore/solutions/search?provider=elastic */}
          <UnderConstruction>
            <SearchBar
              {...{
                search,
                setSearch,
                set,
                setSet,
              }}
            />
          </UnderConstruction>
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
