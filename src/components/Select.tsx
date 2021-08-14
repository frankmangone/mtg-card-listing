// Packages
import styled from "styled-components"
import randomstring from "randomstring"

// Components
import { FaChevronDown } from "react-icons/fa"

// Hooks
import { useEffect, useState, useRef, useCallback } from "react"

interface ISelectProps<T> {
  defaultDisplayValue?: string
  initialValue?: ISelectOption<T>
  selectOptions: ISelectOption<T>[]
  onSelectionChange: (value?: T) => void
  children?: JSX.Element | JSX.Element[]
  alignment?: string
  fontSize?: string
}

interface ISelectOption<T> {
  value?: T
  displayText?: string
  collapsedDisplayText?: string
}

/* Reusable custom select component */
export const Select = <T extends string | number>(props: ISelectProps<T>) => {
  // Destructure props
  const {
    alignment,
    defaultDisplayValue,
    initialValue,
    onSelectionChange,
    selectOptions,
    fontSize,
  } = props

  // Set state variables
  const [selecting, setSelecting] = useState<boolean>(false)
  const [currentValue, setCurrentValue] = useState<T | undefined>(undefined)

  // Use ref for id value
  const id = useRef<string>(randomstring.generate(8))

  /*
   * Save a ref select component, for event add and remove listeners
   * when clicking outside
   */
  const selectRef = useRef<HTMLElement | null>(null)
  // const dropdownRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    // Save initialValue provided as prop to currentValue, if present
    if (initialValue) setCurrentValue(initialValue.value)

    // Save ref to rendered Select component
    selectRef.current = document.getElementById(id.current)

    return () => window.removeEventListener("click", clickOutsideHandler, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /*
   * Set ref to dropdown when visible
   */
  useEffect(() => {
    if (selecting) selectRef.current = document.getElementById(id.current)
    else selectRef.current = null
  }, [selecting])

  /*
   * A useCallback hook here is needed so that the exact same function is passed
   * to both addEventListener and removeEventListener
   *
   * https://dev.to/marcostreng/how-to-really-remove-eventlisteners-in-react-3och
   */
  const clickOutsideHandler = useCallback((event: any): void => {
    // TODO: Better typing
    // Uses tips from:
    // https://stackoverflow.com/questions/152975/how-do-i-detect-a-click-outside-an-element/3028037#3028037

    if (!selectRef.current?.contains(event.target)) {
      toggleSelecting()
      // Change state manually because clickOutsideHandler can't have toggleSelecting as a dependency
      setSelecting(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /*
   * Toggles select options, while adding listeners for closing when clicking outside
   * of the dropdown
   */
  const toggleSelecting = (): void => {
    // Event listeners handling
    if (!selecting) {
      window.addEventListener("click", clickOutsideHandler, true)
    } else {
      window.removeEventListener("click", clickOutsideHandler, true)
    }

    // Toggle state variable
    setSelecting(!selecting)
  }

  /*
   * Handles value selection
   * Definition is pretty self-explanatory
   */
  const selectValue = (value?: T): void => {
    toggleSelecting()
    setCurrentValue(value)
    onSelectionChange(value)
  }

  /*
   * Current selected value data
   */
  const currentValueOption: ISelectOption<T> | undefined = selectOptions.find(
    (option) => option.value === currentValue
  )

  return (
    <SelectWrapper id={id.current}>
      <SelectValue selecting={selecting} onClick={toggleSelecting}>
        <Text fontSize={fontSize}>
          {currentValueOption?.collapsedDisplayText || defaultDisplayValue}
        </Text>
        <FaChevronDown size={10} />
      </SelectValue>
      {selecting && (
        <SelectOptions alignment={alignment || "left"}>
          {defaultDisplayValue && (
            <SelectOption onClick={() => selectValue(undefined)}>
              <Text fontSize={fontSize}>{defaultDisplayValue}</Text>
            </SelectOption>
          )}
          {selectOptions.map(({ value, displayText }) => (
            <SelectOption
              key={value}
              onClick={() => {
                selectValue(value)
              }}
            >
              <Text fontSize={fontSize}>{displayText}</Text>
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
  ${(props) =>
    props.selecting ? "box-shadow: 0 0 3px 1px var(--color-darkgrey);" : ""}

  & > p {
    margin: 0;
  }

  & > svg {
    margin-left: 0.5rem;
  }
`

interface ISelectOptions {
  alignment: string
}

const SelectOptions = styled.div<ISelectOptions>`
  position: absolute;
  top: 100%;
  ${(props) => (props.alignment === "left" ? "left: 0;" : "")}
  ${(props) => (props.alignment === "right" ? "right: 0;" : "")}
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
  transition: all 0.05s linear;
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
`

interface ITextProps {
  fontSize?: string
}

const Text = styled.p<ITextProps>`
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  margin: 0;

  ${(props) => (props.fontSize ? `font-size: ${props.fontSize};` : "")}
`
