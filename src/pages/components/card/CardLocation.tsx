import { CardInfoField, Input, Title, Spacer } from "./CardInfoField"

// Hooks
import { useHandleCards } from "../../../hooks/useHandleCards"
import React from "react"

interface ICardLocationProps {
  id: string
  placeholder?: string
  location: string
}

export const CardLocation: React.FC<ICardLocationProps> = (props) => {
  const { location, placeholder, id } = props
  const { updateCardField } = useHandleCards()

  const changeLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateCardField(id, "location", event.target.value)
  }

  return (
    <CardInfoField>
      <Title>Location:</Title>
      <Spacer />
      <Input
        placeholder={placeholder || ""}
        value={location}
        onChange={changeLocation}
      />
    </CardInfoField>
  )
}
