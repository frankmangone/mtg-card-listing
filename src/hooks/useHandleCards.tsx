// Hooks
import { useCollection } from "./useCollection"
import { useFlashMessage } from "../context/FlashMessageContext"
import { useFirebase } from "../context/FirebaseContext"

interface ISaveData {
  name: string
  quantity: number
}

export const useHandleCards = () => {
  const { auth, firestore } = useFirebase()
  const cardsCollection = useCollection("cards")
  const { addFlashMessage } = useFlashMessage()

  const saveCard = async (data: ISaveData, event?: any) => {
    if (event) event.preventDefault() // For form submits, if necessary

    const { name, quantity } = data

    if (auth.currentUser) {
      const { uid } = auth.currentUser

      const success = await cardsCollection.add({
        name,
        quantity,
        userId: uid,
        createdAt: firestore.FieldValue?.serverTimestamp() || new Date(),
      })

      if (success) {
        addFlashMessage({
          text: `'${name}' was added to your collection`,
          theme: "success",
        })
      }
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
