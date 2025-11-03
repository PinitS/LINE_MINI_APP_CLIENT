import styled from "styled-components";

export const Text = styled.span`
  color: ${({ $color = "#091E42" }) => $color};
  font-family: "NotoSansThai";
  font-size: ${({ $fontSize = 16 }) =>
    typeof $fontSize === "number" ? `${$fontSize}px` : $fontSize};
  font-weight: ${({ $fontWeight }) => $fontWeight || 400};

  opacity: ${({ disabled, $opacity = 1 }) => (disabled ? 0.5 : $opacity)};
  text-decoration-line: ${({ $decorationLine = "none" }) => $decorationLine};
  text-transform: ${({ $textTransform = "none" }) => $textTransform};
  text-align: ${({ $align = "left" }) => $align};

  margin-top: ${({ $marginTop = 0 }) => $marginTop}px;
  margin-bottom: ${({ $marginBottom = 0 }) => $marginBottom}px;
  margin-left: ${({ $marginLeft = 0 }) => $marginLeft}px;
  margin-right: ${({ $marginRight = 0 }) => $marginRight}px;
  padding-top: ${({ $paddingTop = 0 }) => $paddingTop}px;
  padding-bottom: ${({ $paddingBottom = 0 }) => $paddingBottom}px;
  padding-left: ${({ $paddingLeft = 0 }) => $paddingLeft}px;
  padding-right: ${({ $paddingRight = 0 }) => $paddingRight}px;

  white-space: pre-line;
  text-overflow: unset;
  word-break: break-all;
  overflow-wrap: normal;

  ${({ $ellipsis, $maxLines }) =>
    $ellipsis
      ? `
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${$maxLines};
    -webkit-box-orient: vertical;
    white-space: normal;
    word-break: break-word;
    overflow-wrap: break-word;
  `
      : ""}
`;
