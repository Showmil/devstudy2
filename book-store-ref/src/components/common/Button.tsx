import React from 'react'
import styled from "styled-components";
import { ButtonScheme, ButtonSize } from "../../style/theme";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size: ButtonSize;
  scheme: ButtonScheme;
  disabled?: boolean;
  isLoading?: boolean;
}

function Button({ children, size, scheme, disabled, isLoading }: Props) {
  return <ButtonStyle>{children}</ButtonStyle>;
}

const ButtonStyle = styled.div<{ size: ButtonSize; scheme: ButtonScheme; disabled?: boolean }>`
  font-size: ${({ theme, size }) => theme.buttonSize[size]};
  padding: ${({ theme, size }) => theme.buttonSize[size]};
  color: ${({ theme, scheme }) => theme.buttonScheme[scheme].color};
  background-color: ${({ theme, scheme }) => theme.buttonScheme[scheme].backgroundColor};
  border: 0;
  border-radius: ${({ theme }) => theme.borderRadius};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  cursor: ${({disabled}) => (disabled ? "none" : "pointer")}
`;

export default Button;