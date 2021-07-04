// Hooks
import { useFirebase } from "../context/FirebaseContext"
import { useDocumentData } from "react-firebase-hooks/firestore"

// Types
import { ICard, SellStatus } from "../types/Card"

export const useGetCard = (id: string) => {
  const { firestore } = useFirebase()
  const [cardDoc, loading, error] = useDocumentData(
    firestore.doc(`cards/${id}`)
  )

  const card: ICard | undefined = cardDoc
    ? {
        name: cardDoc.name,
        imageUrl: cardDoc.imageUrl,
        legalities: cardDoc.legalities,
        set_name: cardDoc.set_name,
        quantity: cardDoc.quantity,
        sellStatus: cardDoc.sellStatus as SellStatus,
        prices: cardDoc.prices,
      }
    : undefined

  return { card, loading, error }
}
