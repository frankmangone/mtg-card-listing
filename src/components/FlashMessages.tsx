// Packages
import styled from "styled-components"

// Components
import { Button } from "./Button"
import { FaTimes } from "react-icons/fa"

// Hooks
import { useFlashMessage, FADE_DURATION } from "../context/FlashMessageContext"

// Types
import { TTheme } from "./Button"

export const FlashMessages: React.FC = () => {
  const { fading, flashMessages } = useFlashMessage()

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
