// Packages
import styled from "styled-components"

// Hooks
import { useSets } from "../context/SetsContext"

// Components
import { FaSearch } from "react-icons/fa"

interface ISearchBarProps {
  // filters?: any[]
  search: string
  setSearch: React.Dispatch<string>
  set?: string
  setSet?: React.Dispatch<string>
  setLoading?: React.Dispatch<boolean>
}

export const SearchBar: React.FC<ISearchBarProps> = (props) => {
  const { set, setSet, search, setSearch, setLoading } = props
  const { sets } = useSets()

  const handleSearchChange = (event: any) => {
    setSearch(event.target.value)
    if (setLoading) setLoading(true)
  }

  const handleSetChange = (event: any) => {
    if (setSet) setSet(event.target.value)
    if (setLoading) setLoading(true)
  }

  return (
    <SearchInputWrapper>
      <SearchSelect value={set} onChange={handleSetChange}>
        <option value={""}>Set..</option>
        {sets.map((set) => (
          <option key={set.id} value={set.code}>
            {set.name}
          </option>
        ))}
      </SearchSelect>
      <FaSearch />
      <SearchInput value={search} onChange={handleSearchChange} />
    </SearchInputWrapper>
  )
}

const SearchInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.8rem;
  padding-left: 10px;
  padding-right: 10px;
  width: auto;

  svg {
    margin-left: 2rem;
    margin-right: -2rem;
    width: 16px;
    height: 16px;
    z-index: 2;
  }
`

const SearchInput = styled.input`
  background-color: var(--color-lightergrey);
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  outline: none;
  padding: 0.8rem;
  padding-left: 2.8rem;
  transition: all 0.1s linear;

  &:focus,
  &:active {
    box-shadow: 0 0 3px 1px var(--color-darkgrey);
  }
`

const SearchSelect = styled.select`
  align-self: stretch;
  background-color: var(--color-lightergrey);
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  padding-left: 10px;
  padding-right: 10px;
  outline: none;
  width: 100px;

  &:focus,
  &:active {
    box-shadow: 0 0 3px 1px var(--color-darkgrey);
  }
`
