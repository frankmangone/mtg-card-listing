// Packages
import styled from "styled-components"

// Components
import { Button } from "./Button"
import { FaTimes } from "react-icons/fa"

// Hooks
import { useEffect, useRef } from "react"
import { useFlashMessage } from "../context/FlashMessageContext"

// Types
import { TTheme } from "./Button"

const AUTODESTROY_TIMEOUT = 5000 // [ms]

export const FlashMessages: React.FC = () => {
  const { flashMessages } = useFlashMessage()

  return (
    <FlashMessagesWrapper>
      {flashMessages.map((message) => (
        <FlashMessage id={message.key} {...message} />
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
}

const FlashMessage: React.FC<IFlashMessageProps> = (props) => {
  const { removeFlashMessage } = useFlashMessage()
  const { id, text, theme } = props

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      removeFlashMessage(id)
    }, AUTODESTROY_TIMEOUT)
  }, [id, removeFlashMessage])

  const removeMessage = () => {
    removeFlashMessage(id)
  }

  return (
    <FlashMessageWrapper theme={theme}>
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
  animation-name: fade;
  animation-animation-timing-function: linear;
  animation-duration: ${AUTODESTROY_TIMEOUT}ms;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  p {
    margin: 0;
  }

  /* Fade animation for autodestroy */
  @keyframes fade {
    0% {
      opacity: 0;
    }

    5% {
      opacity: 1;
    }

    90% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
`
