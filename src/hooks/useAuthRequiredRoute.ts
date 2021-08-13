import { useHistory } from "react-router-dom"
import { useUser } from "../context/FirebaseContext"

type TReturn = (redirectPath?: string) => void

export const useAuthRequiredRoute = (): TReturn => {
  const history = useHistory()
  const { user } = useUser()

  return (redirectPath = "/") => {
    if (user) return
    history.push(redirectPath)
  }
}
