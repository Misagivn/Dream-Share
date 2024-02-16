import styled from "styled-components";

export const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  padding: 30px;
`;
export const Wrapper = styled.div`
  padding-left: 100px;
  padding-right: 100px;
`;

export const Container = styled.div`
  height: 800px;
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: nowrap;
  justify-content: space-between;
  gap: 10px;
`;

export const Card = styled.label`
  width: 200px;
  border-radius: 1rem;
  background-size: cover;
  cursor: pointer;
  overflow: hidden;
  margin: 0 10px 0 0;
  display: flex;
  align-items: flex-end;
  transition: 0.6s cubic-bezier(0.28, -0.03, 0, 0.99);
`;

export const Input = styled.input`
  display: none;
  &:checked + ${Card} {
    width: 1200px;
  }
`;
export const Image = styled.img`
  width: 100%;
  height: 800px;
  object-fit: cover;
`;

export const ButtonSpacing = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px;
`