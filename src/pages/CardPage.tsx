// Packages
import styled from "styled-components"

// Layout
import { MainLayout } from "../layouts/MainLayout"

// Hooks
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useGetCard } from "../hooks/CardHooks"
import { usePrivateRoute } from "../hooks/usePrivateRoute"

// Components
import { LoadSpinner } from "../components/LoadSpinner"
import { CardDisplay } from "./components/card/CardDisplay"

interface IRouteParams {
  id: string
}

export const CardPage: React.FC = () => {
  const { id } = useParams<IRouteParams>()
  const { card, loading, error } = useGetCard(id)

  const privateRoute = usePrivateRoute()
  useEffect(() => {
    if (card?.userId) privateRoute(card.userId)
  }, [card?.userId, privateRoute])

  return (
    <>
      <MainLayout>
        <CardPageWrapper>
          {/* Spinner while loading */}
          {loading && (
            <SpinnerContainer>
              <LoadSpinner />
            </SpinnerContainer>
          )}

          {/* Show card when succesfully retrieved */}
          {card && <CardDisplay card={card} id={id} />}

          {/* Show error message when load fails */}
          {error && <p>Error: {error.message}</p>}
        </CardPageWrapper>
      </MainLayout>
    </>
  )
}

const CardPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 0.8rem;
`

const SpinnerContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
`
