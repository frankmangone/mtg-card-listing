// Hooks
import { useEffect, useState } from "react"
import { useCollection } from "./useCollection"

export const useGetCard = (id: string) => {
  const cardsCollection = useCollection("cards")
  const cardRef = cardsCollection.doc(id)

  const [card, setCard] = useState<any>(undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(undefined)

  useEffect(() => {
    cardRef
      .get()
      .then((doc: any) => {
        if (doc.exists) {
          setCard(doc.data())
        } else {
          setError("No such document!") // TODO: Better error for this!!
        }
      })
      .catch((error: any) => {
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { card, loading, error }
}
