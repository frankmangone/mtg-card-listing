// Packages
import styled from "styled-components"

// Components
import { Button } from "./Button"
import { FaTimes } from "react-icons/fa"

// Hooks
import { useEffect, useRef } from "react"
import { useFlashMessage } from "../context/FlashMessageContext"

const AUTODESTROY_TIMEOUT = 5000 // [ms]

export const FlashMessages: React.FC = () => {
  const { flashMessages } = useFlashMessage()

  return (
    <FlashMessagesWrapper>
      {flashMessages.map((message) => (
        <FlashMessage key={message.key} id={message.key} text={message.text} />
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
}

const FlashMessage: React.FC<IFlashMessageProps> = (props) => {
  const { removeFlashMessage } = useFlashMessage()
  const { id, text } = props

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
    <FlashMessageWrapper>
      <p>{text}</p>
      <Button
        styling="transparent"
        children={<FaTimes />}
        onClick={removeMessage}
      />
    </FlashMessageWrapper>
  )
}

const FlashMessageWrapper = styled.div`
  background-color: var(--color-lightgrey);
  border-radius: 5px;
  box-shadow: 0 0 3px 1px var(--color-darkgrey);
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
