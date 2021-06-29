// Packages
import styled from "styled-components"

// Hooks
import { useHandleCards } from "../hooks/useHandleCards"

// Components
import { Button } from "./Button"
import { FaPlus } from "react-icons/fa"

interface IImageResolutions {
  small: string
  normal: string
  large: string
}
export interface ISearchResult {
  id: string
  name: string
  image_uris?: IImageResolutions
  card_faces?: { image_uris: IImageResolutions }[]
  // TODO: Expand this as needed
}

interface ISearchResultsItemProps {
  searchResult: ISearchResult
  setImagePreviewURL: React.Dispatch<string>
}

export const SearchResultItem: React.FC<ISearchResultsItemProps> = (props) => {
  const { searchResult, setImagePreviewURL } = props
  const { saveCard } = useHandleCards()

  return (
    <ResultItem
      key={searchResult.id}
      onMouseEnter={() => {
        setImagePreviewURL(
          searchResult.image_uris?.normal ||
            searchResult.card_faces?.[0].image_uris?.normal ||
            ""
        )
      }}
      onMouseLeave={() => {
        setImagePreviewURL("")
      }}
    >
      <p>{searchResult.name}</p>
      <Button
        children={<FaPlus />}
        styling="transparent"
        onClick={() =>
          saveCard({
            name: searchResult.name,
            quantity: 1,
          })
        }
      />
    </ResultItem>
  )
}

const ResultItem = styled.div`
  align-items: center;
  background-color: var(--color-lightgrey);
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  height: 30px;
  margin-bottom: 0.5rem;
  padding: 5px 5px 5px 15px;
  transition: all 0.1s linear;

  &:hover {
    box-shadow: 0 0 3px 1px var(--color-grey);
  }
`
