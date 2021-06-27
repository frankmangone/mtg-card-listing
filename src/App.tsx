// Packages
import firebase from "firebase/app"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "firebase/firestore"
import "firebase/auth"

// Context
import { FirebaseContext } from "./context/FirebaseContext"

// Pages
import { LandingPage } from "./pages/LandingPage"

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

/* App */

const App: React.FC = () => {
  return (
    <FirebaseContext.Provider value={{ auth, firestore }}>
      <Router>
        <Switch>
          <Route path="/" component={LandingPage} />
        </Switch>
      </Router>
    </FirebaseContext.Provider>
  )
}

export default App
