import styled from "styled-components"

interface ICardColorsProps {
  colors: string[]
}

export const CardColors: React.FC<ICardColorsProps> = (props) => {
  const { colors } = props

  return (
    <BulletWrapper>
      {colors?.map((color) => (
        <Bullet key={color} color={color as TColor} />
      ))}
    </BulletWrapper>
  )
}

const BulletWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 0.5rem;
  left: 4rem;
`

type TColor = "R" | "G" | "B" | "U" | "W"
interface IBulletProps {
  color: TColor
}

const Bullet = styled.div<IBulletProps>`
  width: 1.5rem;
  height: 4px;
  background-color: ${(props) => getCardColor(props.color)};
  border-radius: 2px;
  box-shadow: 0 0 1px var(--color-grey);
  margin-right: 0.2rem;
`

const getCardColor = (color: TColor) => {
  switch (color) {
    case "R":
      return "var(--color-mtg-red)"
    case "G":
      return "var(--color-mtg-green)"
    case "U":
      return "var(--color-mtg-blue)"
    case "B":
      return "var(--color-mtg-black)"
    case "W":
      return "var(--color-mtg-white)"
  }
}
