// Packages
import styled from "styled-components"
import firebase from "firebase/app"

// Hooks
import { useAuthState } from "react-firebase-hooks/auth"
import { useFirebase } from "../context/FirebaseContext"

export const Navbar: React.FC = () => {
  const { auth } = useFirebase()
  const [user] = useAuthState(auth)

  return (
    <NavbarWrapper>
      {user ? (
        <SignedInNavbar auth={auth} user={user} />
      ) : (
        <SignedOutNavbar auth={auth} />
      )}
    </NavbarWrapper>
  )
}

const NavbarWrapper = styled.nav`
  width: 100%;
  position: sticky;
  background-color: orange;
  display: flex;
  justify-content: flex-end;
`

interface ISignedInNavbarProps {
  auth?: any
  user?: any
}

const SignedInNavbar: React.FC<ISignedInNavbarProps> = (props) => {
  const { auth, user } = props

  const signOut = () => {
    if (auth.currentUser) auth.signOut() // TODO: Firebase object typings?
  }

  return (
    <>
      <p>{user.displayName}</p>
      <button onClick={signOut}>Sign out</button>
    </>
  )
}

interface ISignedOutNavbarProps {
  auth?: any
}

const SignedOutNavbar: React.FC<ISignedOutNavbarProps> = (props) => {
  const { auth } = props

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return <button onClick={signInWithGoogle}>Sign In</button>
}
