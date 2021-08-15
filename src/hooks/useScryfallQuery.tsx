import { useCallback, useEffect, useRef, useState } from "react"
import { ISearchResult } from "../types/SearchResult"

interface IUseScryfallQueryProps {
  set?: string
  search: string
  uniques?: boolean
}

export const useScryfallQuery = (props: IUseScryfallQueryProps) => {
  const { set, search, uniques } = props
  const [searchResults, setSearchResults] = useState<
    ISearchResult[] | undefined
  >([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | undefined>(undefined)

  // To keep a reference to the timeout used after search string edition
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const querySearchString = useCallback(() => {
    const searchString = search.replace(" ", "+")
    const setString = set !== undefined ? `+e%3A${set}` : ""
    const queryString = `${searchString}${setString}`

    fetch(
      `https://api.scryfall.com/cards/search?${
        uniques ? "unique=prints&" : ""
      }q=${queryString}`
    )
      .then((response) => response.json())
      .then((data) => setSearchResults(data.data.slice(0, 15)))
      .catch((error) => {
        setSearchResults([])
        setError(error)
      })
      .finally(() => setLoading(false))
  }, [set, search, uniques])

  useEffect(() => {
    setLoading(true)

    if (search === "") {
      setLoading(false)
      setSearchResults(undefined)
      return
    }

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null
      if (search !== "") {
        querySearchString()
        return
      }
      setLoading(false)
      setSearchResults([])
    }, 500)
  }, [search, querySearchString, setLoading, setSearchResults])

  return { searchResults, loading, error }
}
