// Packages
import styled from "styled-components"

// Components
import { Button } from "./Button"
import { FaTimes } from "react-icons/fa"

// Hooks
import { useEffect } from "react"
import { useFlashMessage } from "../context/FlashMessageContext"

export const FlashMessages: React.FC = () => {
  const { flashMessages } = useFlashMessage()

  useEffect(() => {
    console.log(flashMessages)
  }, [flashMessages])

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

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  p {
    margin: 0;
  }
`
