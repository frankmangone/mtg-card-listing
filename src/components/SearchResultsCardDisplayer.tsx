// Packages
import styled from "styled-components"

interface ICardDisplayerProps {
  imagePreviewURL: string
}

export const SearchResultsCardDisplayer: React.FC<ICardDisplayerProps> = (
  props
) => {
  const { imagePreviewURL } = props
  return (
    <CardDisplayerWrapper hasImage={imagePreviewURL !== ""}>
      <img src={imagePreviewURL} alt="" />
    </CardDisplayerWrapper>
  )
}

interface ICardDisplayerWrapperProps {
  hasImage: boolean
}

const CardDisplayerWrapper = styled.div<ICardDisplayerWrapperProps>`
  border-radius: 15px;
  background-color: var(--color-lightgrey);
  flex-basis: 300px;
  flex-shrink: 0;
  height: 418.03px;
  overflow: hidden;
  ${(props) =>
    props.hasImage ? "box-shadow: 0 0 3px 1px var(--color-grey);" : ""}
  img {
    width: 100%;
    object-fit: contain;
  }
`
