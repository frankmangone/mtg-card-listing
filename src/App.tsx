// Packages
import { createGlobalStyle } from "styled-components"
import firebase from "firebase/app"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "firebase/firestore"
import "firebase/auth"

// Context
import { FirebaseContext } from "./context/FirebaseContext"

// Pages
import { LandingPage } from "./pages/LandingPage"
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
    --color-primary-light: hsl(100, 25%, 70%);
    --color-primary: hsl(100, 25%, 55%);
    --color-primary-dark: hsl(100, 25%, 40%);

    --color-lightgrey: hsl(0, 0%, 95%);
    --color-grey:hsl(0, 0%, 50%);
    --color-darkgrey: hsl(0, 0%, 20%);
  }
`

/* App */
const App: React.FC = () => {
  return (
    <FirebaseContext.Provider value={{ auth, firestore }}>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/search" exact component={SearchPage} />
        </Switch>
      </Router>
    </FirebaseContext.Provider>
  )
}

export default App
