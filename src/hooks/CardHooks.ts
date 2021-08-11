// Hooks
import { useCollection } from "./useCollection"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { useFirebase } from "../context/FirebaseContext"
import { useUser } from "../context/FirebaseContext"

// Types
import { ICard } from "../types/Card"

/**
 * Gets a single card document
 * @param id
 * @returns { card, loading, error }
 */
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

/**
 * Gets multiple documents belonging to a user
 * @param options
 * @returns { cards, loading, error }
 */

interface IOptions {
  limit?: number
}

export const useGetCards = (options?: IOptions) => {
  const limit = options?.limit || 100

  const { user } = useUser()
  const cardsCollection = useCollection("cards")
  const query = cardsCollection
    .orderBy("createdAt", "desc")
    .limit(limit)
    .where("userId", "==", user?.uid)

  const [cards, loading, error] = useCollectionData(query, { idField: "id" })

  return { cards, loading, error }
}
