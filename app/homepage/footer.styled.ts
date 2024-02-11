import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  padding: 30px 100px 0px 100px;
  justify-content: space-between;
`;
export const Heading = styled.h1`
  font-size: 25px;
  font-weight: bold;
`;

export const ListWrapper = styled.ul`
`;

export const ListItem = styled.li`
  margin-top: 10px;
  font-size: 20px;
  font-weight: lighter;
`;

export const Copyright = styled.div`
    padding-left: 100px;
`