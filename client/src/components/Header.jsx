import React from "react";
import NotesIcon from "@mui/icons-material/Notes";
import styled from "styled-components";

const Title = styled.h1`
  color: #ffffff;
  font-family: "McLaren", cursive;
  font-weight: 200;
`;

const Head = styled.header`
  background-color: rgb(151, 64, 99);
  padding: 15px 32px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
`;
function Header() {
  return (
    <Head>
      <Title>
        <NotesIcon /> Memo
      </Title>
    </Head>
  );
}

export default Header;
