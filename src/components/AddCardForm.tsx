// Packages
import styled from "styled-components"

// Hooks
import { useState } from "react"
import { useFirebase, useCollection } from "../context/FirebaseContext"

// Components
import { Button } from './Button'

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
      <CardNameInput value={name} onChange={(event) => setName(event.target.value)} />

      <CardQuantityInput>
        <Button type="button" onClick={decreaseQuantity} disabled={quantity === 1}>
          -
        </Button>
        <p>{quantity}</p>
        <Button type="button" onClick={increaseQuantity}>
          +
        </Button>        
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
  padding: 10px;
  margin-right: 20px;
`

const CardQuantityInput = styled.div`
  border: 1px solid grey;
  margin-right: 20px;
  display: flex;

  button {
    width: 50px;
    border: none;
    border-radius: 0;
    cursor: pointer;
  }

  p {
    width: 50px;
    text-align: center;
  }
`