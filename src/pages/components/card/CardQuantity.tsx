// Components
import { Button } from "../../../components/Button"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
import { CardInfoField, Title, Value, Spacer } from "./CardInfoField"

// Hooks
import { useChangeCardQuantity } from "../../../hooks/CardHooks"

interface ICardQuantityProps {
  id: string
  quantity: number
}

export const CardQuantity: React.FC<ICardQuantityProps> = (props) => {
  const { quantity, id } = props
  const { changeCardQuantity } = useChangeCardQuantity()

  return (
    <CardInfoField>
      <Title>Quantity:</Title>
      <Spacer />
      <Value>{quantity}</Value>
      <Button
        styling="transparent"
        children={<FaChevronDown />}
        fontSize={16}
        onClick={() => changeCardQuantity(id, quantity - 1)}
      />
      <Button
        styling="transparent"
        children={<FaChevronUp />}
        fontSize={16}
        onClick={() => changeCardQuantity(id, quantity + 1)}
      />
    </CardInfoField>
  )
}
