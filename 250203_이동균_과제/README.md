```
// title.tsx

import React from 'react'
import { styled } from "styled-components";
import { ColorKey, HeadingSize } from '../../style/theme';

interface Props {
    children: React.ReactNode;
    size: HeadingSize;
    color?: ColorKey
}

const Title: React.FC<Props> = ({children, size, color}: Props) => {
    return <TitleStyle size={size} color={color}>{children}</TitleStyle>
}

const TitleStyle = styled.h1<Omit<Props, "children">>`
    font-size: ${({ theme, size }) => theme.heading[size]},
    fonstSize};
    color: ${({ theme, color }) => (color ? theme.color[color] : theme.color.primary)};
`;

export default Title

// Button.tsx

import React from 'react'
import styled from "styled-components";
import { ButtonScheme, ButtonSize } from "../../style/theme";

interface Props {
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

// inputText.tsx
import React, { ForwardedRef } from "react";
import styled from "styled-components";

interface Props {
  placeholder?: string;
}

const InputText = React.forwardRef(({ placeholder }: Props, ref: ForwardedRef<HTMLInputElement>) => {
  return <InputTextStyle placeholder={placeholder} ref={ref} />;
});

const InputTextStyle = styled.input.attrs({ type: "text" })`
  padding: 0.25rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.text};
`;

export default InputText;
```