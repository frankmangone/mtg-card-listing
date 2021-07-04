// Packages
import styled from "styled-components"

// Components
import { FaChevronDown } from "react-icons/fa"

// Hooks
import { useEffect, useState } from "react"

interface ISelectProps<T> {
  defaultDisplayValue: string
  initialValue?: T
  selectOptions: ISelectOption<T>[]
  onSelectionChange: (value?: T) => void
  children?: JSX.Element | JSX.Element[]
}

interface ISelectOption<T> {
  value?: T
  displayText?: string
}

/* Reusable custom select component */
export const Select = <T extends string | number>(props: ISelectProps<T>) => {
  // Destructure props
  const {
    defaultDisplayValue,
    initialValue,
    onSelectionChange,
    selectOptions,
  } = props

  // Set state variables
  const [selecting, setSelecting] = useState<boolean>(false)
  const [currentValue, setCurrentValue] = useState<T | undefined>(undefined)

  useEffect(() => {
    if (initialValue) setCurrentValue(initialValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleSelecting = (): void => {
    setSelecting(!selecting)
  }

  const selectValue = (value?: T): void => {
    toggleSelecting()
    setCurrentValue(value)
    onSelectionChange(value)
  }

  return (
    <SelectWrapper>
      <SelectValue selecting={selecting} onClick={toggleSelecting}>
        <p>{currentValue || defaultDisplayValue}</p>
        <FaChevronDown size={10} />
      </SelectValue>
      {selecting && (
        <SelectOptions>
          {selectOptions.map(({ value, displayText }) => (
            <SelectOption
              key={value}
              onClick={() => {
                selectValue(value)
              }}
            >
              <p>{displayText}</p>
            </SelectOption>
          ))}
        </SelectOptions>
      )}
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

const SelectOptions = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  align-items: stretch;
  background-color: var(--color-lightergrey);
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 3px 1px var(--color-darkgrey);
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  margin-top: 0.5rem;
  max-height: 400px;
  width: 250px;
  padding: 0.5rem;
  overflow-y: scroll;
  transition: all 0.1s linear;
  z-index: 20;
`

const SelectOption = styled.button`
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  text-align: left;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  &:hover {
    background-color: var(--color-lightgrey);
  }

  & > p {
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    margin: 0;
  }
`
