import styled from "styled-components"

interface HomeOptionsProps {
  children: JSX.Element | JSX.Element[]
}

export const HomeOptionsWrapper: React.FC<HomeOptionsProps> = (props) => {
  const { children } = props

  return (
    <OptionsWrapper>
      <div>{children}</div>
    </OptionsWrapper>
  )
}

const OptionsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  & > div {
    flex-basis: 700px;
    margin-left: 20px;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
`

export const HomeOptionButton = styled.button`
  padding: 20px;
  display: flex;
  cursor: pointer;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  background-color: var(--color-lightergrey);
  color: var(--color-darkgrey);
  transition: all 0.1s linear;

  &:hover {
    box-shadow: 0 0 3px 1px var(--color-grey);
  }

  h3 {
    font-weight: bold;
    margin: 0;
    text-align: right;
    flex-grow: 1;
  }
`
