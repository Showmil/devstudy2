import React from 'react'
import styled from "styled-components";

const Header = () => {
  return (
      <HeaderStyle>
          <h1>book store</h1>
    </HeaderStyle>
  )
}

const HeaderStyle = styled.header`
  background-color: ${(props) => props.theme.colors.background};

  h1 {
    color: ${(props) => props.theme.colors.primary};
  }
`;

export default Header