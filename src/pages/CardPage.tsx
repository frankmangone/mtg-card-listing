// Packages
import styled from "styled-components"

// Layout
import { MainLayout } from "../layouts/MainLayout"

// Hooks
import { useParams } from "react-router-dom"
import { useGetCard } from "../hooks/useGetCard"

// Components
import { LoadSpinner } from "../components/LoadSpinner"
import { CardDisplay } from "./components/card/CardDisplay"

interface IRouteParams {
  id: string
}

export const CardPage: React.FC = () => {
  const { id } = useParams<IRouteParams>()
  const { loading, card, error } = useGetCard(id)

  return (
    <MainLayout>
      <CardPageWrapper>
        {/* Spinner while loading */}
        {loading && <LoadSpinner />}

        {/* Show card when succesfully retrieved */}
        {card && <CardDisplay card={card} />}

        {/* Show error message when load fails */}
        {error && <p>Error: {error.message}</p>}
      </CardPageWrapper>
    </MainLayout>
  )
}

const CardPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.8rem;
`
