// Packages
import styled from "styled-components"

// Hooks
import { useSets } from "../context/SetsContext"

// Components
import { FaSearch } from "react-icons/fa"
import { Select } from "./Select"

interface ISearchBarProps {
  // filters?: any[]
  search: string
  setSearch: React.Dispatch<string>
  set?: string
  noSets?: boolean
  setSet?: React.Dispatch<string | undefined>
  setLoading?: React.Dispatch<boolean>
}

export const SearchBar: React.FC<ISearchBarProps> = (props) => {
  const { set, setSet, search, setSearch, setLoading, noSets } = props
  const { sets } = useSets()

  // TODO: Rename "set" to something less confusing
  const setNames =
    sets?.map((set) => ({
      value: set.code,
      displayText: set.name,
      collapsedDisplayText: set.code?.toUpperCase(),
    })) || []

  const setOption = (targetSet?: string) => {
    const setData = sets?.find((set) => set.code === targetSet)
    if (!setData) return undefined
    else
      return {
        value: setData.code,
        displayText: setData.name,
        collapsedDisplayText: setData.code?.toUpperCase(),
      }
  }

  const handleSearchChange = (event: any) => {
    setSearch(event.target.value)
    if (setLoading) setLoading(true)
  }

  const handleSetChange = (value?: string) => {
    if (setSet) setSet(value)
    if (setLoading) setLoading(true)
  }

  return (
    <SearchInputWrapper>
      {!noSets && (
        <Select<string>
          initialValue={setOption(set)}
          selectOptions={setNames}
          defaultDisplayValue={"Set..."}
          onSelectionChange={handleSetChange}
        ></Select>
      )}
      <FaSearch />
      <SearchInput value={search} onChange={handleSearchChange} />
    </SearchInputWrapper>
  )
}

const SearchInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  width: auto;

  & > svg {
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
