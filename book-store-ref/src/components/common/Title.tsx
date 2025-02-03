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