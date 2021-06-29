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
  set: string
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
    >
      <ResultInformation>
        <ResultSet>{searchResult.set.toUpperCase()}</ResultSet>
        <p>{searchResult.name}</p>
      </ResultInformation>
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
  padding: 5px;
  transition: all 0.1s linear;

  &:hover {
    box-shadow: 0 0 3px 1px var(--color-grey);
  }
`

const ResultInformation = styled.div`
  display: flex;
  align-items: center;
`

const ResultSet = styled.p`
  background-color: var(--color-grey);
  border-radius: 3px;
  color: var(--color-white);
  font-size: 0.8rem;
  padding: 5px;
  margin-right: 0.7rem;
  text-align: center;
  width: 30px;
`
