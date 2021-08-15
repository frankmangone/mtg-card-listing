// Packages
import styled from "styled-components"

// Layout
import { MainLayout } from "../layouts/MainLayout"

// Components
import { CollectionCardListing } from "./components/collection/CollectionCardListing"

// Hooks
import { useEffect, useState } from "react"
import { useUser } from "../context/FirebaseContext"
import { useAuthRequiredRoute } from "../hooks/useAuthRequiredRoute"

export const CollectionPage: React.FC = () => {
  const { user } = useUser()
  const [set, setSet] = useState<string | undefined>(undefined)

  const authRequiredRoute = useAuthRequiredRoute()
  useEffect(() => {
    authRequiredRoute()
  }, [authRequiredRoute])

  return (
    <MainLayout>
      {user ? (
        <CollectionListingWrapper>
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
  padding-top: 0.8rem;
  padding-left: 1rem;
  padding-right: 1rem;
`
