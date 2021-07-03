// Components
import { CardInfoField, Title, Value, Spacer } from "./CardInfoField"

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

export const CardSellStatus: React.FC<ICardSellStatusProps> = (props) => {
  const { sellStatus, id } = props
  const { updateCardField } = useHandleCards()

  const changeSellStatus = (event: any) => {
    updateCardField(id, "sellStatus", event.target.value)
  }

  return (
    <CardInfoField>
      <Title>Status:</Title>
      <Spacer />
      <select value={sellStatus} onChange={changeSellStatus}>
        {Object.entries(SELL_STATUSES).map(([status, value]) => (
          <option key={status} value={value}>
            {capitalize(status)}
          </option>
        ))}
      </select>
    </CardInfoField>
  )
}
