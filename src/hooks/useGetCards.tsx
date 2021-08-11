import { useCollectionData } from "react-firebase-hooks/firestore"
import { useCollection } from "./useCollection"
import { useUser } from "../context/FirebaseContext"

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
