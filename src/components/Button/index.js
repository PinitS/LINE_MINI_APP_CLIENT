import styled from "styled-components";

export const Button = styled.button`
  position: relative;
  display: flex;
  justify-content: ${({ $justifyContent = "center" }) => $justifyContent};
  align-items: ${({ $alignItems = "center" }) => $alignItems};
  flex-direction: ${({ $flexDirection = "row" }) => $flexDirection};
  gap: ${({ $gap = 0 }) => $gap}px;

  width: ${({ $width = "auto" }) =>
    typeof $width === "number" ? `${$width}px` : $width};
  height: ${({ $height = 48 }) =>
    typeof $height === "number" ? `${$height}px` : $height};

  margin-top: ${({ $marginTop = 0 }) => $marginTop}px;
  margin-bottom: ${({ $marginBottom = 0 }) => $marginBottom}px;
  margin-left: ${({ $marginLeft = 0 }) => $marginLeft}px;
  margin-right: ${({ $marginRight = 0 }) => $marginRight}px;

  padding-top: ${({ $paddingTop = 0 }) => $paddingTop}px;
  padding-bottom: ${({ $paddingBottom = 0 }) => $paddingBottom}px;
  padding-left: ${({ $paddingLeft = 0 }) => $paddingLeft}px;
  padding-right: ${({ $paddingRight = 0 }) => $paddingRight}px;

  background-color: ${({ $backgroundColor = "transparent" }) =>
    $backgroundColor};

  border-width: ${({ $borderWidth = 0 }) => $borderWidth}px;
  border-style: ${({ $borderStyle = "solid" }) => $borderStyle};
  border-color: ${({ $borderColor = "transparent" }) => $borderColor};
  border-radius: ${({ $borderRadius = 6 }) => $borderRadius}px;

  opacity: ${({ $opacity = 1, disabled }) => (disabled ? 0.5 : $opacity)};
  box-sizing: border-box;

  cursor: pointer;
  flex-shrink: 0;

  &:disabled {
    /* pointer-events: none; */
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
