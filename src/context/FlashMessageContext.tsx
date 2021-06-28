// Packages
import randomstring from "randomstring"

// Hooks
import { createContext, useContext } from "react"

interface IFlashMessage {
  text: string
  theme?: string
}

export type TFlashMessageWithKey = IFlashMessage & { key: string }

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

  const addFlashMessage = (data: IFlashMessage) => {
    const key = randomstring.generate(8)
    const dataWithKey: TFlashMessageWithKey = { key, ...data }
    const updatedFlashMessages = [...flashMessages, dataWithKey]
    setFlashMessages(updatedFlashMessages)
  }

  const removeFlashMessage = (key: string) => {
    const index = flashMessages.findIndex((element) => element.key === key)
    if (index === -1) return
    setFlashMessages([
      ...flashMessages.slice(0, index),
      ...flashMessages.slice(index + 1, flashMessages.length),
    ])
  }

  return { flashMessages, addFlashMessage, removeFlashMessage }
}
