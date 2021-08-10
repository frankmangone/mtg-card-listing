// Packages
import styled from "styled-components"

// Components
import { Button } from "./Button"
import { FaTimes } from "react-icons/fa"

// Hooks
import { useEffect, useRef, useState } from "react"
import { useFlashMessage } from "../context/FlashMessageContext"

// Types
import { TTheme } from "./Button"

const AUTODESTROY_TIMEOUT = 4000 // [ms]
const FADE_DURATION = 1000 // [ms]

export const FlashMessages: React.FC = () => {
  const { flashMessages, clearFlashMessages } = useFlashMessage()

  const [fading, setFading] = useState<boolean>(false)

  const flashMessagesCount = useRef<number>(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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

      // Set a new timeout for destroying messages (the debounce)
      if (flashMessagesCount.current !== 0) {
        timeoutRef.current = setTimeout(() => {
          clearFlashMessages()
          clearTimeout(timeoutRef.current as ReturnType<typeof setTimeout>)
          console.log("hey from timeout!")
          setFading(false)
        }, AUTODESTROY_TIMEOUT)

        fadeTimeoutRef.current = setTimeout(() => {
          setFading(true)
          clearTimeout(fadeTimeoutRef.current as ReturnType<typeof setTimeout>)
        }, AUTODESTROY_TIMEOUT - FADE_DURATION)
      }
    }
  }, [clearFlashMessages, flashMessages])

  return (
    <FlashMessagesWrapper id="flash-messages">
      {flashMessages.map((message) => (
        <FlashMessage id={message.key} fading={fading} {...message} />
      ))}
    </FlashMessagesWrapper>
  )
}

const FlashMessagesWrapper = styled.div`
  position: fixed;
  z-index: 10;
  bottom: 20px;
  left: 20px;
  width: 300px;
`

/* Flash Message component */

interface IFlashMessageProps {
  text: string
  id: string
  theme?: string
  fading: boolean
}

const FlashMessage: React.FC<IFlashMessageProps> = (props) => {
  const { removeFlashMessage } = useFlashMessage()
  const { id, fading, text, theme } = props

  const removeMessage = () => {
    removeFlashMessage(id)
  }

  return (
    <FlashMessageWrapper theme={theme} fading={fading}>
      <p>{text}</p>
      <Button
        theme={theme as TTheme}
        styling="transparent"
        children={<FaTimes />}
        onClick={removeMessage}
      />
    </FlashMessageWrapper>
  )
}

interface IFlashMessageWrapperProps {
  theme?: string
  fading: boolean
}

const FlashMessageWrapper = styled.div<IFlashMessageWrapperProps>`
  ${(props) =>
    props.theme === "cancel"
      ? `
    background-color: var(--color-cancel-lighter);
    box-shadow: 0 0 3px 1px var(--color-cancel);
  `
      : ""}
  ${(props) =>
    props.theme === "success"
      ? `
    background-color: var(--color-primary-lighter);
    box-shadow: 0 0 3px 1px var(--color-primary);
  `
      : ""}
  ${(props) =>
    props.theme === "default" || !props.theme
      ? `
    background-color: var(--color-lightgrey);
    box-shadow: 0 0 3px 1px var(--color-darkgrey);
  `
      : ""}
  border-radius: 5px;
  display: flex;
  padding: 20px 10px 20px 20px;
  ${(props) =>
    props.fading
      ? `
    animation-name: fade;
    animation-timing-function: linear;
    animation-duration: ${FADE_DURATION - 10}ms;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  `
      : ""}

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  p {
    margin: 0;
  }

  /* Fade animation for autodestroy */
  @keyframes fade {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }
`
