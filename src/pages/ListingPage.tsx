// Packages
import styled from "styled-components"

// Layout
import { MainLayout } from "../layouts/MainLayout"

// Components
import { AddCardForm } from "../components/AddCardForm"
import { CardListing } from "../components/CardListing"

// Hooks
import { useUser } from "../context/FirebaseContext"

export const ListingPage: React.FC = () => {
  const { user } = useUser()

  return (
    <MainLayout>
      {user ? (
        <CardListingWrapper>
          <AddCardForm />
          <CardListing />
        </CardListingWrapper>
      ) : null}
    </MainLayout>
  )
}

// Styled componentes

const CardListingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
`
