// Components
import { Select } from "../../../components/Select"
import { CardInfoField, Title, Spacer } from "./CardInfoField"

// Hooks
import { useHandleCards } from "../../../hooks/useHandleCards"

// Helpers
import { capitalize } from "../../../helpers/capitalize"

// Types
import { SELL_STATUSES } from "../../../types/Card"

interface ICardSellStatusProps {
  id: string
  sellStatus: number
}

const sellStatuses = Object.entries(SELL_STATUSES).map(([status, value]) => ({
  value: value,
  displayText: capitalize(status),
}))

export const CardSellStatus: React.FC<ICardSellStatusProps> = (props) => {
  const { sellStatus, id } = props
  const { updateCardField } = useHandleCards()

  const changeSellStatus = (value?: number) => {
    updateCardField(id, "sellStatus", value)
  }

  return (
    <CardInfoField>
      <Title>Status:</Title>
      <Spacer />
      <Select
        initialValue={sellStatus}
        defaultDisplayValue="Select..."
        selectOptions={sellStatuses}
        onSelectionChange={changeSellStatus}
        alignment="right"
      />
    </CardInfoField>
  )
}
