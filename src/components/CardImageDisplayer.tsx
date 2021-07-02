// Packages
import styled from "styled-components"

interface ICardDisplayerProps {
  imageUrl: string
  parentFlexDirection?: "column" | "row"
}

export const CardImageDisplayer: React.FC<ICardDisplayerProps> = (props) => {
  const { imageUrl, parentFlexDirection } = props
  return (
    <CardDisplayerWrapper
      hasImage={imageUrl !== ""}
      parentFlexDirection={parentFlexDirection}
    >
      <img src={imageUrl} alt="" />
    </CardDisplayerWrapper>
  )
}

interface ICardDisplayerWrapperProps {
  hasImage: boolean
  parentFlexDirection?: "column" | "row"
}

const CardDisplayerWrapper = styled.div<ICardDisplayerWrapperProps>`
  border-radius: 15px;
  background-color: var(--color-lightgrey);
  flex-shrink: 0;
  ${(props) =>
    props.parentFlexDirection === "column"
      ? `  
    width: 300px;
    flex-basis: 418.03px;
  `
      : `
    flex-basis: 300px;
    height: 418.03px;
  `}
  overflow: hidden;
  ${(props) =>
    props.hasImage ? "box-shadow: 0 0 3px 1px var(--color-grey);" : ""}
  img {
    width: 100%;
    object-fit: contain;
  }
`
