// Packages
import styled from "styled-components"

interface ICardDisplayProps {
  card: any
}

export const CardDisplay: React.FC<ICardDisplayProps> = (props) => {
  const { card } = props
  const { name, imageUrl } = card

  return (
    <>
      <p>{name}</p>
      <p>{imageUrl}</p>
    </>
  )
}
