import { createContext, useContext, useState, useEffect } from "react"

// Hooks
import { useLocalStorageState } from "../hooks/useLocalStorageState"

// Types
import { IScryfallSet } from "../types/ScryfallSet"

interface ISetsDefaultValue {
  sets: IScryfallSet[]
  loadingSets: boolean
}

const defaultValue: ISetsDefaultValue = { sets: [], loadingSets: true }
export const SetsContext = createContext(defaultValue)

/* Hook to use the Provider values */
export const useSets = () => {
  return useContext(SetsContext)
}

/* Hook to initialize the Provider values */
export const useSetsData = () => {
  const [loadingSets, setLoadingSets] = useState(true)
  const [sets, setSets] = useLocalStorageState<IScryfallSet[]>("sets", [])

  useEffect(() => {
    fetch("https://api.scryfall.com/sets")
      .then((response) => response.json())
      .then((data) => {
        /**
         * If the sets length are different from the ones in localStorage,
         * then we need to update the data in localStorage because the sets
         * data in Scryfall has changed
         *  */
        if (data.data.length !== sets) setSets(data.data)
      })
      .catch((error) => console.log("Failed to load card sets"))
      .finally(() => setLoadingSets(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { sets, loadingSets }
}
