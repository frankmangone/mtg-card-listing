// Packages
import styled from "styled-components"

// Hooks
import { useSaveCard } from "../../../hooks/CardHooks"

// Components
import { Button } from "../../../components/Button"
import { FaPlus } from "react-icons/fa"

// Types
import { ISearchResult } from "../../../types/SearchResult"

interface ISearchResultsItemProps {
  searchResult: ISearchResult
  setImagePreviewUrl: React.Dispatch<string>
}

export const SearchResultItem: React.FC<ISearchResultsItemProps> = (props) => {
  const { searchResult, setImagePreviewUrl } = props
  const { saveCard } = useSaveCard()

  const imageUrl =
    searchResult.image_uris?.normal ||
    searchResult.card_faces?.[0].image_uris?.normal ||
    ""

  return (
    <ResultItem
      key={searchResult.id}
      onMouseEnter={() => {
        setImagePreviewUrl(imageUrl)
      }}
    >
      <ResultInformation>
        <ResultSet>{searchResult.set.toUpperCase()}</ResultSet>
        <ResultName>{searchResult.name}</ResultName>
      </ResultInformation>
      <Button
        children={<FaPlus />}
        styling="transparent"
        onClick={() =>
          saveCard({
            imageUrl: imageUrl,
            legalities: searchResult.legalities,
            name: searchResult.name,
            prices: searchResult.prices,
            quantity: 1,
            setName: searchResult.set_name,
            sellStatus: 1,
            ownership: 1,
            ownershipSubject: "",
            location: "",
          })
        }
      />
    </ResultItem>
  )
}

const ResultItem = styled.div`
  align-items: center;
  background-color: var(--color-lightergrey);
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
  flex-grow: 1;
`

const ResultSet = styled.p`
  background-color: var(--color-grey);
  border-radius: 3px;
  color: var(--color-white);
  font-size: 0.8rem;
  padding: 5px;
  margin: 0;
  margin-right: 0.5rem;
  text-align: center;
  flex-basis: 30px;
  flex-shrink: 0;
`
const ResultName = styled.p`
  font-size: 1rem;
`
