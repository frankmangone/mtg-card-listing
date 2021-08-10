import styled from "styled-components"

// Components
import { Select } from "../../../components/Select"
import { CardInfoField, Input, Title, Spacer } from "./CardInfoField"

// Hooks
import { useHandleCards } from "../../../hooks/useHandleCards"

// Types
import { OWNERSHIP, OWNERSHIP_TEXT } from "../../../types/Card"
import React from "react"

interface ICardOwnershipProps {
  id: string
  ownership: number
  ownershipSubject: string
}

const ownerships = Object.entries(OWNERSHIP).map(([ownership, value]) => ({
  value: value,
  displayText: OWNERSHIP_TEXT[value as keyof typeof OWNERSHIP_TEXT],
  collapsedDisplayText: OWNERSHIP_TEXT[value as keyof typeof OWNERSHIP_TEXT],
}))

export const CardOwnership: React.FC<ICardOwnershipProps> = (props) => {
  const { ownership, ownershipSubject, id } = props
  const { updateCardField } = useHandleCards()

  const initialValue = {
    value: ownership,
    displayText: OWNERSHIP_TEXT[ownership as keyof typeof OWNERSHIP_TEXT],
    collapsedDisplayText:
      OWNERSHIP_TEXT[ownership as keyof typeof OWNERSHIP_TEXT],
  }

  const changeOwnership = (value?: number) => {
    updateCardField(id, "ownership", value)
    if (value === OWNERSHIP.MINE) {
      updateCardField(id, "ownershipSubject", "")
    }
  }

  const changeOwnershipSubject = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateCardField(id, "ownershipSubject", event.target.value)
  }

  return (
    <CardInfoField>
      <Title>Ownership status:</Title>
      <Spacer />
      {ownership === OWNERSHIP.LENT && (
        <>
          <Text>To:</Text>
          <Input
            value={ownershipSubject}
            placeholder="Who has the card(s)?"
            onChange={changeOwnershipSubject}
          />
        </>
      )}
      {ownership === OWNERSHIP.BORROWED && (
        <>
          <Text>From:</Text>
          <Input
            value={ownershipSubject}
            placeholder="Who are the card(s) from?"
            onChange={changeOwnershipSubject}
          />
        </>
      )}
      <Select
        fontSize="1rem"
        initialValue={initialValue}
        selectOptions={ownerships}
        onSelectionChange={changeOwnership}
        alignment="right"
      />
    </CardInfoField>
  )
}

const Text = styled.p`
  margin-left: 1rem;
  margin-right: 1rem;
`
