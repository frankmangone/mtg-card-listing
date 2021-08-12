import { useCallback, useEffect, useRef } from "react"

interface IUseScryfallQueryProps {
  set?: string
  search: string
  setSearchResults: React.Dispatch<any> // TODO: Better typing
  setLoading: React.Dispatch<boolean>
}

export const useScryfallQuery = (props: IUseScryfallQueryProps) => {
  const { set, search, setSearchResults, setLoading } = props

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
      .catch((error) => setSearchResults([]))
      .finally(() => setLoading(false))
  }, [set, search, setSearchResults, setLoading])

  useEffect(() => {
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
}
