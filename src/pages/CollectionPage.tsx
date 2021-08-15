// Packages
import styled from "styled-components"

// Layout
import { MainLayout } from "../layouts/MainLayout"

// Components
import { CollectionCardListing } from "./components/collection/CollectionCardListing"
import { SearchBar } from "../components/SearchBar"

// Hooks
import { useEffect, useRef, useState } from "react"
import { useUser } from "../context/FirebaseContext"
import { useAuthRequiredRoute } from "../hooks/useAuthRequiredRoute"

export const CollectionPage: React.FC = () => {
  const { user } = useUser()
  const [set, setSet] = useState<string | undefined>(undefined)
  const [search, setSearch] = useState<string>("")
  const [debouncedSearch, setDebouncedSearch] = useState<string>("")
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const authRequiredRoute = useAuthRequiredRoute()
  useEffect(() => {
    authRequiredRoute()
  }, [authRequiredRoute])

  // Search debounce
  useEffect(() => {
    if (searchTimeout.current !== null) clearTimeout(searchTimeout.current)
    searchTimeout.current = setTimeout(() => {
      clearTimeout(searchTimeout.current as ReturnType<typeof setTimeout>)
      searchTimeout.current = null
      setDebouncedSearch(search)
    }, 500)
  }, [search])

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
          <CollectionCardListing search={debouncedSearch} />
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
