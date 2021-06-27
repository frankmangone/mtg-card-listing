import { createContext, useContext } from "react"

// Hooks
import { useAuthState } from "react-firebase-hooks/auth"

interface IFirebaseValue {
  auth: any
  firestore: any
}

export const defaultValue: IFirebaseValue = {
  auth: null,
  firestore: null,
}

export const FirebaseContext = createContext(defaultValue)

export const useFirebase = () => {
  return useContext(FirebaseContext)
}

export const useCollection = (collectionName: string) => {
  const { firestore } = useContext(FirebaseContext)
  return firestore.collection(collectionName)
}

export const useUser = () => {
  const { auth } = useFirebase()
  const [user] = useAuthState(auth)
  return { user }
}
