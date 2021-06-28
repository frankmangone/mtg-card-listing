import { useContext } from 'react'
import { FirebaseContext } from '../context/FirebaseContext'

export const useCollection = (collectionName: string) => {
  const { firestore } = useContext(FirebaseContext)
  return firestore.collection(collectionName)
}
