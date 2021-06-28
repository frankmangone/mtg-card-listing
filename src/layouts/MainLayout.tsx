// Packages
import styled from "styled-components"

// Components
import { Navbar } from "../components/Navbar"
import { FlashMessages } from "../components/FlashMessages"
interface ILayout {
  children?: JSX.Element | JSX.Element[] | null
}

export const MainLayout: React.FC<ILayout> = (props) => {
  const { children } = props

  return (
    <LayoutWrapper>
      <Navbar />
      <FlashMessages />
      {children}
    </LayoutWrapper>
  )
}

const LayoutWrapper = styled.div`
  min-height: 100vh;
`
