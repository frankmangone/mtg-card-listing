import { MainLayout } from "../layouts/MainLayout"

import { useUser } from "../context/FirebaseContext"

export const HomePage: React.FC = () => {
  const { user } = useUser()

  return (
    <MainLayout>
      {user ? <p>User is logged in</p> : <p>User is not logged in</p>}
    </MainLayout>
  )
}
