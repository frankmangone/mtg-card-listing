import { useHistory } from "react-router-dom"
import { useUser } from "../context/FirebaseContext"

type TReturn = (userId: string, redirectPath?: string) => void

export const usePrivateRoute = (): TReturn => {
  const history = useHistory()
  const { user } = useUser()

  return (userId: string, redirectPath = "/") => {
    if (userId !== user?.uid) {
      history.push(redirectPath)
    }
  }
}
