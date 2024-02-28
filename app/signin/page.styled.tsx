import styled from "styled-components";

export const H1 = styled.h1`
  font-size: 36px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 15px;
`;

export const Formcontrol = styled.input`
  background-color: #202024;
  border: 1px solid #505054;
  border-radius: 0.3rem;
  color: #e6e6ea;
  height: 3.2rem;
  letter-spacing: 0.15em;
  padding: 0.6rem 0.85rem;
  width: 600px;
`;

export const Labelcontrol = styled.label`
    font-size: 20px;  
    font-weight: 600;
    margin-bottom: 5px; 
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Button = styled.button`
        background-color:hsl(212 100% 47% / 1);
        color: #e6e6ea;
        font-weight:400;
        padding: 0.6rem 0.85rem;
        text-align: center;
        width: 600px;
        border-radius:24px;
        margin: 20px 0;
        font-size: 20px;
        font-weight: 600;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        border: none;
        cursor: pointer;
        &:hover {
            background-color: hsl(212 100% 57% / 1);
        }
        &:active {
            background-color: hsl(212 100% 37% / 1);
        }
        &:focus {
            outline: none;
        }
`;