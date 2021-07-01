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
  const { card } = useGetCard(id)

  return (
    <MainLayout>
      <CardPageWrapper>
        {card ? <CardDisplay card={card} /> : <LoadSpinner />}
      </CardPageWrapper>
    </MainLayout>
  )
}

const CardPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.8rem;
`
