// Packages
import { useState } from "react"
import { createGlobalStyle } from "styled-components"
import firebase from "firebase/app"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import "firebase/firestore"
import "firebase/auth"

/**
 * For firebase hooks:
 * https://github.com/CSFrequency/react-firebase-hooks/blob/master/firestore/README.md
 */

// Context
import { FirebaseContext } from "./context/FirebaseContext"
import { SetsContext, useSetsData } from "./context/SetsContext"
import {
  FlashMessageContext,
  TFlashMessageWithKey,
} from "./context/FlashMessageContext"

// Pages
import { CardPage } from "./pages/CardPage"
import { CollectionPage } from "./pages/CollectionPage"
import { SearchPage } from "./pages/SearchPage"

/*
 * Firebase initialization
 */

firebase.initializeApp({
  apiKey: "AIzaSyAo-GahAkPobFEzdVmm-2g0si8hTvYfk9Q",
  authDomain: "mtg-card-listing.firebaseapp.com",
  projectId: "mtg-card-listing",
  storageBucket: "mtg-card-listing.appspot.com",
  messagingSenderId: "1054256646996",
  appId: "1:1054256646996:web:b088ca0f365d8bc4f996c1",
  measurementId: "G-Q0546K991Z",
})

const auth = firebase.auth()
const firestore = firebase.firestore()

/* Global Styles */

const GlobalStyle = createGlobalStyle`
  :root {
    --color-warning-lighter: hsl(40, 45%, 95%);
    --color-warning-light: hsl(40, 45%, 80%);
    --color-warning: hsl(40, 45%, 55%);
    --color-warning-dark: hsl(40, 45%, 40%);
    
    --color-cancel-lighter: hsl(0, 35%, 95%);
    --color-cancel-light: hsl(0, 35%, 80%);
    --color-cancel: hsl(0, 35%, 55%);
    --color-cancel-dark: hsl(0, 35%, 40%);

    --color-primary-lighter: hsl(100, 25%, 95%);
    --color-primary-light: hsl(100, 25%, 80%);
    --color-primary: hsl(100, 25%, 55%);
    --color-primary-dark: hsl(100, 25%, 40%);

    --color-white: hsl(0, 0%, 100%);
    --color-lightergrey: hsl(0, 0%, 95%);
    --color-lightgrey: hsl(0, 0%, 85%);
    --color-grey:hsl(0, 0%, 50%);
    --color-darkgrey: hsl(0, 0%, 20%);

    --color-mtg-green: rgb(75, 177, 71);
    --color-mtg-blue: rgb(19, 156, 223);
    --color-mtg-red: rgb(226, 64, 39);
    --color-mtg-white: rgb(250, 232, 157);
    --color-mtg-black: rgb(11, 11, 13);
  }
`

/* App */
const App: React.FC = () => {
  const [flashMessages, setFlashMessages] = useState<TFlashMessageWithKey[]>([])
  const { sets, loadingSets } = useSetsData()

  return (
    <FirebaseContext.Provider value={{ auth, firestore }}>
      <FlashMessageContext.Provider value={{ flashMessages, setFlashMessages }}>
        <SetsContext.Provider value={{ sets, loadingSets }}>
          <GlobalStyle />
          <Router>
            <Switch>
              <Route path="/" exact component={CollectionPage} />
              <Route path="/collection" exact component={CollectionPage} />
              <Route path="/search" exact component={SearchPage} />
              <Route path="/cards/:id" exact component={CardPage} />
            </Switch>
          </Router>
        </SetsContext.Provider>
      </FlashMessageContext.Provider>
    </FirebaseContext.Provider>
  )
}

export default App
