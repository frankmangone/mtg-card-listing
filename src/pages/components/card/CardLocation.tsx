import { CardInfoField, Input, Title, Spacer } from "./CardInfoField"

// Hooks
import { useUpdateCardField } from "../../../hooks/CardHooks"
import React from "react"

interface ICardLocationProps {
  id: string
  placeholder?: string
  location: string
}

export const CardLocation: React.FC<ICardLocationProps> = (props) => {
  const { location, id } = props
  const { updateCardField } = useUpdateCardField()

  const changeLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateCardField(id, "location", event.target.value)
  }

  return (
    <CardInfoField>
      <Title>Location:</Title>
      <Spacer />
      <Input
        placeholder="Add location..."
        value={location}
        onChange={changeLocation}
      />
    </CardInfoField>
  )
}
