// Hooks
import { useFirebase } from "../context/FirebaseContext"
import { useDocumentData } from "react-firebase-hooks/firestore"

// Types
import { ICard } from "../types/Card"

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
        sellStatus: cardDoc.sellStatus,
        prices: cardDoc.prices,
        location: cardDoc.location,
        ownership: cardDoc.ownership,
        ownershipSubject: cardDoc.ownershipSubject,
      }
    : undefined

  return { card, loading, error }
}
