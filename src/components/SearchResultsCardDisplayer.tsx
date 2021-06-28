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
    <CardDisplayerWrapper>
      <img src={imagePreviewURL} />
    </CardDisplayerWrapper>
  )
}

const CardDisplayerWrapper = styled.div`
  border-radius: 5px;
  background-color: var(--color-lightgrey);
  flex-basis: 300px;
  flex-shrink: 0;
  height: 418.03px;

  img {
    width: 100%;
    object-fit: contain;
  }
`
