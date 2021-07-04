// Packages
import styled from "styled-components"

// Types
import { IPrices } from "../../../types/Card"

interface ICardPricesProps {
  prices: IPrices
}

const PRICE_KEYS = ["usd", "usd_foil", "tix"]
const PRICE_LABELS = ["Normal", "Foil", "Tix"]
const PRICE_UNITS = ["$ ", "$ ", ""]

export const CardPrices: React.FC<ICardPricesProps> = (props) => {
  const { prices } = props

  return (
    <>
      <CardInfoLabel>Prices</CardInfoLabel>
      <CardPricesWrapper>
        {PRICE_KEYS.map((key, index) => (
          <CardPrice key={key}>
            {/* TODO: Add icons? */}
            <PriceLabel>{PRICE_LABELS[index]}</PriceLabel>
            <PriceValue>
              {PRICE_UNITS[index]}
              {prices[key as keyof typeof prices]}
            </PriceValue>
          </CardPrice>
        ))}
      </CardPricesWrapper>
    </>
  )
}

const CardInfoLabel = styled.h4`
  padding-left: 0.2rem;
  margin: 1rem 0;
  flex-basis: 100%;
`

const CardPricesWrapper = styled.div`
  display: flex;
`

const CardPrice = styled.div`
  align-items: center;
  background-color: var(--color-grey);
  border-radius: 5px;
  box-shadow: 0 0 3px 1px var(--color-lightgrey);
  color: var(--color-white);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`

const PriceLabel = styled.p`
  margin-top: 0;
  margin-bottom: 0.5rem;
`

const PriceValue = styled.p`
  margin: 0;
`
