import { HomeOptionsWrapper, HomeOptionButton } from "./HomeOptions"
import { FaSearch, FaBars } from "react-icons/fa"

import { useHistory } from "react-router-dom"
import { useUser } from "../../../context/FirebaseContext"

export const LoggedInHome = () => {
  const { user } = useUser()
  const history = useHistory()

  const navigateToSearch = () => history.push({ pathname: "/search" })
  const navigateToCollection = () => history.push({ pathname: "/collection" })

  return (
    <>
      <h1>Welcome, {user?.displayName?.split(" ")[0]}</h1>
      <HomeOptionsWrapper>
        <HomeOptionButton onClick={navigateToSearch}>
          <FaSearch size={20} />
          <h3>Add cards to my collection</h3>
        </HomeOptionButton>
        <HomeOptionButton onClick={navigateToCollection}>
          <FaBars size={20} />
          <h3>View my collection</h3>
        </HomeOptionButton>
      </HomeOptionsWrapper>
    </>
  )
}
