import { createContext, useContext, useState, useEffect } from "react"

// Types
import { IScryfallSet } from '../types/ScryfallSet'

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
  const [sets, setSets] = useState<IScryfallSet[]>([])

  useEffect(() => {
    fetch('https://api.scryfall.com/sets')
      .then((response) => response.json())
      .then((data) => {
        setSets(data.data)
      })
      .catch((error) => console.log('Failed to load card sets'))
      .finally(() => setLoadingSets(false))
  }, [setSets])

  return { sets, loadingSets }
}