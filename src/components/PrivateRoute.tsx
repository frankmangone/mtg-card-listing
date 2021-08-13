import { Redirect } from "react-router-dom"
import { useUser } from "../context/FirebaseContext"

interface PrivateRouteProps {
  userId: string
  redirectPath?: string
}

/**
 * Usage: place in the component associated with the private route,
 * and provide the usedId from the resource
 * @param props
 * @returns
 */
export const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const { user } = useUser()
  const { userId, redirectPath = "/" } = props

  return (
    <>
      {userId !== user?.uid && (
        <Redirect
          to={{
            pathname: redirectPath,
          }}
        />
      )}
    </>
  )
}
