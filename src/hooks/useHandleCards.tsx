// Hooks
import { useCollection } from "./useCollection"
import { useFirebase } from "../context/FirebaseContext"

interface ISaveData {
  name: string
  quantity: number
}

export const useHandleCards = () => {
  const { auth, firestore } = useFirebase()
  const cardsCollection = useCollection("cards")

  const saveCard = async (data: ISaveData, event?: any) => {
    if (event) event.preventDefault() // For form submits, if necessary

    const { name, quantity } = data

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

  const changeCardQuantity = (id: string, amount: number) => {
    const quantity = cardsCollection?.doc(id).quantity

    if (quantity - amount > 0) {
      cardsCollection?.doc(id).update({
        quantity: quantity - amount,
      })
    }
  }

  return { saveCard, changeCardQuantity }
}
