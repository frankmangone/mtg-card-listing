// Packages
import styled from "styled-components"

// Components
import { FaSearch } from "react-icons/fa"

interface ISearchBarProps {
  search: string
  setSearch: React.Dispatch<string>
  setLoading: React.Dispatch<boolean>
}

export const SearchBar: React.FC<ISearchBarProps> = (props) => {
  const { search, setSearch, setLoading } = props
  const handleChange = (event: any) => {
    setSearch(event.target.value)
    setLoading(true)
  }

  return (
    <SearchInputWrapper>
      <FaSearch />
      <SearchInput value={search} onChange={handleChange} />
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
  background-color: var(--color-lightgrey);
  border: none;
  border-radius: 5px;
  flex-basis: 400px;
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
