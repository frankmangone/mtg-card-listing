// Packages
import styled from "styled-components"

interface ICardUserInfoProps {
  name: string
  setName: string
}

export const CardUserInfo: React.FC<ICardUserInfoProps> = (props) => {
  const { name, setName } = props
  return (
    <CardUserInfoWrapper>
      <CardName>{name}</CardName>
      <CardSet>{setName}</CardSet>
    </CardUserInfoWrapper>
  )
}

const CardUserInfoWrapper = styled.div`
  background-color: var(--color-lightergrey);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  flex-basis: 500px;
  flex-shrink: 1;
  align-items: stretch;
  margin-left: 0.5rem;
  padding: 1.1rem;
  position: relative;
`
const CardName = styled.h3`
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: var(--color-darkgrey);
`

const CardSet = styled.p`
  margin-top: 0;
  color: var(--color-grey);
  &:after {
    content: "";
    height: 1px;
    background-color: var(--color-lightgrey);
    align-self: stretch;
    display: block;
    margin-top: 0.5rem;
  }
`
