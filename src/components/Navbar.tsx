// Packages
import styled from "styled-components"
import firebase from "firebase/app"
import { Link } from "react-router-dom"

// Hooks
import { useAuthState } from "react-firebase-hooks/auth"
import { useFirebase, useUser } from "../context/FirebaseContext"
import { useHistory } from "react-router-dom"

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
  a,
  button {
    font-size: 16px;
    padding: 0px 15px;
  }

  p {
    color: var(--color-white);
  }

  a,
  button {
    transition: color 0.1s linear;
    color: var(--color-lightergrey);
  }

  a {
    padding-right: 0;
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  a:visited {
    color: var(--color-lightergrey);
  }

  a:hover,
  button:hover {
    color: var(--color-white);
    text-shadow: 0 0 2px 3px var(--color-white);
  }
`

interface ISignedInNavbarProps {
  auth?: any
  user?: any
}

const SignedInNavbar: React.FC<ISignedInNavbarProps> = (props) => {
  const { auth, user } = props
  const history = useHistory()

  const signOut = () => {
    if (auth.currentUser) auth.signOut()
    history.push({
      pathname: "/",
    })
  }

  return (
    <>
      <LeftContent>
        <p>
          <Link to="/">{user.displayName}</Link>
        </p>
        <Link to="/search">Find cards</Link>
        <Link to="/collection">My collection</Link>
      </LeftContent>
      <NavbarLink onClick={signOut}>Sign out</NavbarLink>
    </>
  )
}

interface ISignedOutNavbarProps {
  auth?: any
}

const SignedOutNavbar: React.FC<ISignedOutNavbarProps> = (props) => {
  const { signInWithGoogle } = useUser()

  const handleSignInClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    signInWithGoogle()
  }

  return (
    <>
      <LeftContent>
        <p>Guest</p>
        <Link to="/search">Find cards</Link>
      </LeftContent>
      <NavbarLink onClick={handleSignInClick}>Sign in</NavbarLink>
    </>
  )
}

const NavbarLink = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`

const LeftContent = styled.div`
  display: flex;
  align-items: stretch;
  p {
    border-right: 1px solid var(--color-primary-dark);
  }

  p > a {
    padding-left: 0;
  }
`
