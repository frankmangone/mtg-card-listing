// Packages
import styled from "styled-components"

// Layout
import { MainLayout } from "../layouts/MainLayout"

// Components
import { CollectionCardListing } from "./components/collection/CollectionCardListing"
import { SearchBar } from "../components/SearchBar"

// Hooks
import { useState } from "react"
import { useUser } from "../context/FirebaseContext"

export const CollectionPage: React.FC = () => {
  const { user } = useUser()
  const [search, setSearch] = useState("")

  return (
    <MainLayout>
      {user ? (
        <CollectionListingWrapper>
          <SearchBar {...{ search, setSearch }} />
          <CollectionCardListing />
        </CollectionListingWrapper>
      ) : null}
    </MainLayout>
  )
}

const CollectionListingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
`
