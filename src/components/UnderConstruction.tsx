import styled from "styled-components"

interface UnderConstructionProps {
  children: JSX.Element | JSX.Element[]
}

export const UnderConstruction: React.FC<UnderConstructionProps> = (props) => {
  const { children } = props

  return (
    <Wrapper>
      {children}
      <Inner>
        <p>Under construction</p>
      </Inner>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border-radius: 5px;
  padding: 1rem;
  position: relative;
  overflow: hidden;
`

const Inner = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(247, 197, 5, 0.6);
  backdrop-filter: blur(2px);
  z-index: 4;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 1.5rem;
    font-weight: 600;
    text-shadow: 0 0 2px rgba(100, 100, 100, 0.7);
  }
`
