// Packages
import styled from "styled-components"

export const LoadSpinner = styled.div`
  width: 25px;
  height: 25px;
  border: 6px solid transparent;
  border-left-color: var(--color-primary);
  border-radius: 50%;
  animation-name: spin;
  animation-duration: 0.8s;
  animation-iteration-count: infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`
