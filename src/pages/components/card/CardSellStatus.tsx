// Components
import { Select } from "../../../components/Select"
import { CardInfoField, Title, Spacer } from "./CardInfoField"

// Hooks
import { useHandleCards } from "../../../hooks/useHandleCards"

// Helpers
import { capitalize } from "../../../helpers/capitalize"

// Types
import { SELL_STATUS, SELL_STATUS_TEXT } from "../../../types/Card"

interface ICardSellStatusProps {
  id: string
  sellStatus: number
}

const sellStatuses = Object.entries(SELL_STATUS).map(([status, value]) => ({
  value: value,
  displayText: capitalize(status),
  collapsedDisplayText: capitalize(status),
}))

export const CardSellStatus: React.FC<ICardSellStatusProps> = (props) => {
  const { sellStatus, id } = props
  const { updateCardField } = useHandleCards()

  const initialValue = {
    value: sellStatus,
    displayText: SELL_STATUS_TEXT[sellStatus as keyof typeof SELL_STATUS_TEXT],
    collapsedDisplayText:
      SELL_STATUS_TEXT[sellStatus as keyof typeof SELL_STATUS_TEXT],
  }

  const changeSellStatus = (value?: number) => {
    updateCardField(id, "sellStatus", value)
  }

  return (
    <CardInfoField>
      <Title>Status:</Title>
      <Spacer />
      <Select
        initialValue={initialValue}
        selectOptions={sellStatuses}
        onSelectionChange={changeSellStatus}
        alignment="right"
      />
    </CardInfoField>
  )
}
