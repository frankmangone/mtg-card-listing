import styled from "styled-components"

export type TTheme = "default" | "cancel" | "success" | undefined

interface IButtonProps {
  type?: "button" | "submit" | "reset"
  children?: JSX.Element | JSX.Element[] | string
  onClick?: () => void
  disabled?: boolean
  theme?: TTheme
  styling?: "solid" | "light" | "transparent"
  fontSize?: number
  width?: number
}

const getThemeColors = (theme: TTheme) => {
  switch (theme) {
    case "success":
      return {
        mainColor: "var(--color-primary)",
        hoverColor: "var(--color-primary-dark)",
      }
    case "cancel":
      return {
        mainColor: "var(--color-cancel)",
        hoverColor: "var(--color-cancel-dark)",
      }
    default:
      return {
        mainColor: "var(--color-grey)",
        hoverColor: "var(--color-darkgrey)",
      }
  }
}

export const Button: React.FC<IButtonProps> = (props) => {
  const { theme, styling, fontSize, width, ...otherProps } = props
  let backgroundColor,
    border,
    textColor,
    backgroundColorHover,
    borderHover,
    textColorHover

  const { mainColor, hoverColor } = getThemeColors(theme)

  if (styling === "solid" || !styling) {
    backgroundColor = mainColor
    border = "none"
    textColor = "hsl(0, 0%, 100%)"
    backgroundColorHover = hoverColor
    borderHover = "none"
    textColorHover = "hsl(0, 0%, 100%)"
  } else if (styling === "light") {
    backgroundColor = "hsl(0, 0%, 100%)"
    border = `1px solid ${mainColor}`
    textColor = mainColor
    backgroundColorHover = "hsl(0, 0%, 100%)"
    borderHover = `1px solid ${hoverColor}`
    textColorHover = hoverColor
  } else {
    // (styling === "transparent") {
    backgroundColor = "transparent"
    border = "none"
    textColor = mainColor
    backgroundColorHover = "transparent"
    borderHover = "none"
    textColorHover = hoverColor
  }

  return (
    <StyledButton
      backgroundColor={backgroundColor}
      border={border}
      color={textColor}
      backgroundColorHover={backgroundColorHover}
      borderHover={borderHover}
      colorHover={textColorHover}
      fontSize={fontSize}
      width={width}
      {...otherProps}
    />
  )
}

interface IStyledButtonProps {
  backgroundColor: string
  border: string
  color: string
  backgroundColorHover: string
  borderHover: string
  colorHover: string
  fontSize?: number
  width?: number
}

export const StyledButton = styled.button<IStyledButtonProps>`
  background-color: ${(props) => props.backgroundColor};
  border: ${(props) => props.border};
  border-radius: 5px;
  color: ${(props) => props.color};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.width ? `${props.width}px` : "auto")};
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}px` : "15px")};
  padding: 0.35rem;

  &:hover {
    background-color: ${(props) => props.backgroundColorHover};
    border: ${(props) => props.borderHover};
    color: ${(props) => props.colorHover};
  }

  &:disabled {
    background-color: var(--color-primary-light) !important;
    cursor: not-allowed;
  }
`
