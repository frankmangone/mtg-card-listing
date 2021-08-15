// Hooks
import { useCollection } from "./useCollection"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { useFirebase } from "../context/FirebaseContext"
import { useFlashMessage } from "../context/FlashMessageContext"
import { useUser } from "../context/FirebaseContext"

// Types
import {
  ICard,
  ILegalities,
  IPrices,
  SellStatus,
  Ownership,
} from "../types/Card"

import { ISearchResult } from "../types/SearchResult"

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
        imageUrl: cardDoc.imageUrl,
        legalities: cardDoc.legalities,
        location: cardDoc.location,
        name: cardDoc.name,
        prices: cardDoc.prices,
        ownership: cardDoc.ownership,
        ownershipSubject: cardDoc.ownershipSubject,
        quantity: cardDoc.quantity,
        sellStatus: cardDoc.sellStatus,
        setName: cardDoc.setName,
        userId: cardDoc.uid,
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
  cards?: ISearchResult[]
  limit?: number
}

export const useGetCards = (options?: IOptions) => {
  const limit = options?.limit || 100
  const searchedCards = options?.cards?.map((c) => c.name)

  /**
   * Full-text search is not implemented yet because it is a paid service.
   * For text search, only prefix search is implemented in Firebase:
   * https://stackoverflow.com/questions/46568142/google-firestore-query-on-substring-of-a-property-value-text-search
   *
   * Using full-text search engines costs:
   *  - A base for the Blaze plan in Firebase: https://firebase.google.com/pricing?authuser=0
   *  - A fee for the engine usage:
   *    - Elastic: minimum 16 USD / month: https://www.elastic.co/es/pricing/
   *    - Algolia
   *    - Typesense: minimum ~20 USD / month: https://cloud.typesense.org/pricing/calculator
   *
   * See this example for integration:
   * https://www.youtube.com/watch?v=sSDHdWrSqLY
   *
   * ** For this reason, the scryfall is first queried for it's results (full text search),
   * and then those results are queried against Firebase
   * */

  const { user } = useUser()
  const cardsCollection = useCollection("cards")
  let query

  if (!searchedCards) {
    query = cardsCollection
      .orderBy("createdAt", "desc")
      .limit(limit)
      .where("userId", "==", user?.uid)
  } else if (searchedCards.length !== 0) {
    query = cardsCollection
      .orderBy("createdAt", "desc")
      .limit(limit)
      .where("userId", "==", user?.uid)
      .where("name", "in", searchedCards.slice(0, 9))
  } else {
    query = cardsCollection.where("userId", "==", "")
  }

  const [cards, loading, error] = useCollectionData(query, { idField: "id" })
  return { cards, loading, error }
}

/**
 * Returns a function to save card data to firestore
 * @returns { saveCard }
 */
interface ISaveData {
  colors: string[]
  imageUrl: string
  legalities: ILegalities
  location: string
  name: string
  ownership: Ownership
  ownershipSubject: string
  prices: IPrices
  quantity: number
  sellStatus: SellStatus
  set: string // Short name for display purposes
  setName: string
  typeLine: string
}

export const useSaveCard = () => {
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
        cardTypes: data.typeLine.split(" — ")[0].split(" "),
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

  return { saveCard }
}

/**
 * Returns a function to update a field in a card document
 * @returns { updateCardField }
 */
export const useUpdateCardField = () => {
  const cardsCollection = useCollection("cards")

  const updateCardField = async <T extends unknown>(
    id: string,
    field: string,
    value: T
  ) => {
    await cardsCollection?.doc(id).update({
      [field]: value,
    })
  }

  return { updateCardField }
}

/**
 * Returns a function to change quantity of a card
 * @returns { changeCardQuantity }
 */
export const useChangeCardQuantity = () => {
  const cardsCollection = useCollection("cards")

  const changeCardQuantity = async (id: string, value: number) => {
    if (value > 0) {
      await cardsCollection?.doc(id).update({
        quantity: value,
      })
    }
  }

  return { changeCardQuantity }
}

/**
 * Returns a function to delete a single card document
 * TODO: Add permisson check!!
 * @returns { deleteCard }
 */
export const useDeleteCard = () => {
  const cardsCollection = useCollection("cards")
  const { addFlashMessage } = useFlashMessage()

  const deleteCard = async (id: string, name: string) => {
    try {
      await cardsCollection.doc(id).delete()
      addFlashMessage({
        text: `'${name}' was removed from your collection.`,
        theme: "cancel",
      })
    } catch (error) {
      // TODO: Error handling through flash messages?
      console.log(error)
    }
  }

  return { deleteCard }
}
