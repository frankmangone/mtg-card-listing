// Packages
import styled from "styled-components"

export const CardInfoField = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`
export const Title = styled.p`
  color: var(--color-darkgrey);
  margin-right: 1rem;
`

export const Value = styled.p`
  font-size: 1rem;
  text-align: right;
  margin-right: 0.35rem;
`
export const Spacer = styled.div`
  flex-grow: 1;
  height: 1px;
  background-color: var(--color-lightgrey);
  margin-right: 1rem;
`

export const Input = styled.input`
  background-color: var(--color-lightgrey);
  border: none;
  border-radius: 3px;
  font-family: inherit;
  font-size: 1rem;
  outline: none;
  padding: 0.8rem;
`
