import styled from "styled-components";

export const Wrapper = styled.div`
    padding-left: 1.5rem;
    padding-right: 1.5rem;
`

export const Title = styled.h1`
    font-size:25px;
    font-weight: bold;
    padding-top: 30px;
    padding-bottom: 10px;
`

export const Display = styled.div`
    display: flex;
    flex-wrap: wrap;   
    justify-content: space-between;
    grid-gap:20px;
`

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
`

export const ProductCard = styled.div`
  border: 1px solid #eee;
  border-radius: 5px;
  overflow: hidden;
  img {
    width: 100%;
    object-fit: cover;
  }
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 1em;
`;