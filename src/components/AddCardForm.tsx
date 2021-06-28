// Packages
import styled from "styled-components"

// Hooks
import { useState } from "react"
import { useFirebase } from "../context/FirebaseContext"
import { useCollection } from "../hooks/useCollection"

// Components
import { Button } from "./Button"
import { FaPlus, FaMinus } from "react-icons/fa"

export const AddCardForm: React.FC = () => {
  const { auth, firestore } = useFirebase()
  const cardsCollection = useCollection("cards")

  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState(1)

  const saveCard = async (event: any) => {
    event.preventDefault()
    if (auth.currentUser) {
      const { uid } = auth.currentUser

      await cardsCollection.add({
        name,
        quantity,
        userId: uid,
        createdAt: firestore.FieldValue?.serverTimestamp() || new Date(),
      })
    }
  }

  const increaseQuantity = (): void => {
    setQuantity(quantity + 1)
  }

  const decreaseQuantity = (): void => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <Form onSubmit={saveCard}>
      <CardNameInput
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <CardQuantityInput>
        <Button
          type="button"
          fontSize={16}
          onClick={decreaseQuantity}
          disabled={quantity === 1}
          children={<FaMinus />}
        />
        <p>{quantity}</p>
        <Button
          type="button"
          fontSize={16}
          onClick={increaseQuantity}
          children={<FaPlus />}
        />
      </CardQuantityInput>

      <Button type="submit">Agregar carta</Button>
    </Form>
  )
}

// Styled Components

const Form = styled.form`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
  position: sticky;
`

const CardNameInput = styled.input`
  font-size: 18px;
  margin-right: 20px;
  border-radius: 5px;
  padding: 0px 10px;
  border: none;
  outline: none;
`

const CardQuantityInput = styled.div`
  margin-right: 20px;
  display: flex;

  p {
    width: 40px;
    font-size: 20px;
    margin: auto;
    text-align: center;
  }
`
