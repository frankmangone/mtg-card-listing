// Packages
import styled from "styled-components"

// Components
import { FaChevronDown } from "react-icons/fa"

// Hooks
import { useState } from "react"

interface ISelectProps<T> {
  currentValue?: T
  selectOptions: T[]
  onSelectionChange: () => void
  children?: JSX.Element | JSX.Element[]
}

export const Select = <T extends unknown>(props: ISelectProps<T>) => {
  const [selecting, setSelecting] = useState(false)

  const toggleSelecting = () => {
    setSelecting(!selecting)
  }

  return (
    <SelectWrapper>
      <SelectValue selecting={selecting} onClick={toggleSelecting}>
        <p>Test</p>
        <FaChevronDown size={10} />
      </SelectValue>
      <SelectOptions selecting={selecting}>
        <SelectOption>a</SelectOption>
        <SelectOption>b</SelectOption>
        <SelectOption>c</SelectOption>
        <SelectOption>d</SelectOption>
      </SelectOptions>
    </SelectWrapper>
  )
}

interface ISelecting {
  selecting: boolean
}

const SelectWrapper = styled.div`
  position: relative;
`

const SelectValue = styled.div<ISelecting>`
  align-items: center;
  background-color: var(--color-lightergrey);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  font-size: 1.2rem;
  outline: none;
  padding: 0.8rem;
  transition: all 0.1s linear;
  ${(props) =>
    props.selecting ? "box-shadow: 0 0 3px 1px var(--color-darkgrey);" : ""}

  & > p {
    margin: 0;
  }

  & > svg {
    margin-left: 0.5rem;
  }
`

const SelectOptions = styled.div<ISelecting>`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: var(--color-lightergrey);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  margin-top: 0.5rem;
  padding: 0.8rem;
  overflow: hidden;
  transition: all 0.1s linear;
  ${(props) =>
    props.selecting ? "box-shadow: 0 0 3px 1px var(--color-darkgrey);" : ""}
`

const SelectOption = styled.button``
