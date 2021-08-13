import { ComponentType } from "react"
import { Route, Redirect } from "react-router-dom"
import { useUser } from "../context/FirebaseContext"

interface AuthRequiredRouteProps {
  path: string
  redirectPath?: string
  component: ComponentType<any>
  exact?: boolean
}

export const AuthRequiredRoute: React.FC<AuthRequiredRouteProps> = (props) => {
  const { user } = useUser()
  const { path, redirectPath = "/", exact = false, component } = props
  return (
    <>
      {user ? (
        <Route path={path} exact={exact} component={component} />
      ) : (
        <Redirect
          to={{
            pathname: redirectPath,
          }}
        />
      )}
    </>
  )
}
