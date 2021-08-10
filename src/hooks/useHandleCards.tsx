// Hooks
import { useCollection } from "./useCollection"
import { useFlashMessage } from "../context/FlashMessageContext"
import { useFirebase } from "../context/FirebaseContext"

// Types
import { ILegalities, IPrices, SellStatus, Ownership } from "../types/Card"

interface ISaveData {
  name: string
  imageUrl: string
  legalities: ILegalities
  prices: IPrices
  quantity: number
  sellStatus: SellStatus
  ownership: Ownership
  ownershipSubject: string
  location: string
  set_name: string
}

export const useHandleCards = () => {
  const { auth, firestore } = useFirebase()
  const cardsCollection = useCollection("cards")
  const { addFlashMessage } = useFlashMessage()

  const saveCard = async (data: ISaveData, event?: any) => {
    if (event) event.preventDefault() // For form submits, if necessary

    if (auth.currentUser) {
      const { uid } = auth.currentUser

      const success = await cardsCollection.add({
        userId: uid,
        createdAt: firestore.FieldValue?.serverTimestamp() || new Date(),
        ...data,
      })

      if (success) {
        addFlashMessage({
          text: `'${data.name}' was added to your collection`,
          theme: "success",
        })
      }
    }
  }

  const updateCardField = async <T extends unknown>(
    id: string,
    field: string,
    value: T
  ) => {
    await cardsCollection?.doc(id).update({
      [field]: value,
    })
  }

  const changeCardQuantity = async (id: string, value: number) => {
    if (value > 0) {
      await cardsCollection?.doc(id).update({
        quantity: value,
      })
    }
  }

  return { saveCard, changeCardQuantity, updateCardField }
}
