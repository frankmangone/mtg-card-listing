import styled from "styled-components"

import { MainLayout } from "../layouts/MainLayout"
import { LoggedInHome } from "./components/home/LoggedInHome"
import { LoggedOutHome } from "./components/home/LoggedOutHome"

import { useUser } from "../context/FirebaseContext"

export const HomePage: React.FC = () => {
  const { user } = useUser()

  return (
    <MainLayout>
      <HomePageWrapper>
        {user ? <LoggedInHome /> : <LoggedOutHome />}
      </HomePageWrapper>
    </MainLayout>
  )
}

const HomePageWrapper = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  text-align: center;

  p,
  h1 {
    color: var(--color-darkgrey);
  }

  span {
    color: var(--color-green);
  }
`
