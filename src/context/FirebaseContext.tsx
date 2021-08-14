import { createContext, useContext } from "react"
import firebase from "firebase/app"

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

type VoidFunction = () => void

export const useUser = () => {
  const { auth } = useFirebase()
  const [user] = useAuthState(auth)

  const signInWithGoogle = (callback?: VoidFunction) => {
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.setCustomParameters({ prompt: "select_account" })
    if (callback) {
      auth.signInWithPopup(provider).then((result: any) => {
        callback()
      })
      return
    }
    auth.signInWithPopup(provider)
  }

  return { user, signInWithGoogle }
}
