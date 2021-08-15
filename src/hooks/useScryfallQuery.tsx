import { useCallback, useEffect, useRef, useState } from "react"

interface IUseScryfallQueryProps {
  set?: string
  search: string
}

export const useScryfallQuery = (props: IUseScryfallQueryProps) => {
  const { set, search } = props
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | undefined>(undefined)

  // To keep a reference to the timeout used after search string edition
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const querySearchString = useCallback(() => {
    const searchString = search.replace(" ", "+")
    const setString = set !== undefined ? `+e%3A${set}` : ""
    const queryString = `unique=prints&q=${searchString}${setString}`

    fetch(
      `https://api.scryfall.com/cards/search?unique=prints&q=${queryString}`
    )
      .then((response) => response.json())
      .then((data) => setSearchResults(data.data.slice(0, 15)))
      .catch((error) => {
        setSearchResults([])
        setError(error)
      })
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [set, search])

  useEffect(() => {
    setLoading(true)

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
