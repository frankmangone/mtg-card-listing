// Packages
import randomstring from "randomstring"

// Hooks
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

interface IFlashMessage {
  text: string
  theme?: string
}

export type TFlashMessageWithKey = IFlashMessage & { key: string }

const AUTODESTROY_TIMEOUT = 4000 // [ms]
export const FADE_DURATION = 1000 // [ms]

/* Context */
/* ---------------------- */

interface IFlashMessageContextValue {
  flashMessages: TFlashMessageWithKey[]
  setFlashMessages: React.Dispatch<TFlashMessageWithKey[]>
}
const defaultValue: IFlashMessageContextValue = {
  flashMessages: [],
  setFlashMessages: () => {},
}

export const FlashMessageContext = createContext(defaultValue)

/* Hook */
/* ---------------------- */
export const useFlashMessage = () => {
  const { flashMessages, setFlashMessages } = useContext(FlashMessageContext)

  const [fading, setFading] = useState<boolean>(false)

  const flashMessagesCount = useRef<number>(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const addFlashMessage = (data: IFlashMessage) => {
    const key = randomstring.generate(8)
    const dataWithKey: TFlashMessageWithKey = { key, ...data }
    const updatedFlashMessages = [...flashMessages, dataWithKey]
    setFlashMessages(updatedFlashMessages)
  }

  const removeFlashMessage = (key: string) => {
    const index = flashMessages.findIndex((element) => element.key === key)
    if (index === -1) return // 'key' not found
    setFlashMessages([
      ...flashMessages.slice(0, index),
      ...flashMessages.slice(index + 1, flashMessages.length),
    ])
  }

  const clearFlashMessages = useCallback(() => {
    setFlashMessages([])
  }, [setFlashMessages])

  /**
   * Implement a debounce on flash messages autodestroy
   *  */
  useEffect(() => {
    if (flashMessagesCount.current !== flashMessages.length) {
      // Update messages count
      flashMessagesCount.current = flashMessages.length

      // Clear previous timeouts
      clearTimeout(timeoutRef.current as ReturnType<typeof setTimeout>)
      clearTimeout(fadeTimeoutRef.current as ReturnType<typeof setTimeout>)
      setFading(false)

      // Set a new timeout for destroying messages (the debounce)
      if (flashMessagesCount.current !== 0) {
        timeoutRef.current = setTimeout(() => {
          clearFlashMessages()
          clearTimeout(timeoutRef.current as ReturnType<typeof setTimeout>)
          setFading(false)
        }, AUTODESTROY_TIMEOUT)

        fadeTimeoutRef.current = setTimeout(() => {
          clearTimeout(fadeTimeoutRef.current as ReturnType<typeof setTimeout>)
          setFading(true)
        }, AUTODESTROY_TIMEOUT - FADE_DURATION)
      }
    }
  }, [fading, clearFlashMessages, flashMessages])

  return {
    fading,
    flashMessages,
    addFlashMessage,
    removeFlashMessage,
    clearFlashMessages,
  }
}
