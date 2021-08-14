import styled from "styled-components"

import { MainLayout } from "../layouts/MainLayout"
import { LoggedInHome } from "./components/home/LoggedInHome"

import { useUser } from "../context/FirebaseContext"

export const HomePage: React.FC = () => {
  const { user } = useUser()

  return (
    <MainLayout>
      <HomePageWrapper>
        {user ? <LoggedInHome /> : <p>User is not logged in</p>}
      </HomePageWrapper>
    </MainLayout>
  )
}

const HomePageWrapper = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  text-align: center;
`
