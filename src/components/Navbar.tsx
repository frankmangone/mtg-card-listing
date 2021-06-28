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
  background-color: var(--color-primary);
  display: flex;
  justify-content: space-between;
  height: 50px;

  p,
  button {
    font-size: 16px;
    color: white;
    padding: 0px 15px;
  }
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
      <NavbarLink onClick={signOut}>Sign out</NavbarLink>
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

  return <NavbarLink onClick={signInWithGoogle}>Sign In</NavbarLink>
}

const NavbarLink = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`
