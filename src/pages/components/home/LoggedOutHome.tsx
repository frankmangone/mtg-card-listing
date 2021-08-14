import styled from "styled-components"
import { HomeOptionsWrapper } from "./HomeOptions"
import { FaUser } from "react-icons/fa"
import firebase from "firebase/app"
import { useFirebase } from "../../../context/FirebaseContext"

export const LoggedOutHome = () => {
  const { auth } = useFirebase()

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.setCustomParameters({ prompt: "select_account" })
    auth.signInWithPopup(provider)
  }

  return (
    <>
      <h1>Welcome!</h1>
      <p>
        This website allows you to organize and maintain your MTG card
        collection
      </p>
      <p>Let's get started!</p>
      <HomeOptionsWrapper>
        <SigninButton onClick={signInWithGoogle}>
          <FaUser size={20} />
          <h3>Sign in with google</h3>
        </SigninButton>
      </HomeOptionsWrapper>
    </>
  )
}

const SigninButton = styled.button`
  padding: 20px;
  display: flex;
  cursor: pointer;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  background-color: var(--color-primary);
  color: var(--color-white);
  transition: all 0.1s linear;

  &:hover {
    background-color: var(--color-primary-dark);
  }

  h3 {
    font-weight: bold;
    margin: 0;
    text-align: right;
    flex-grow: 1;
  }
`
