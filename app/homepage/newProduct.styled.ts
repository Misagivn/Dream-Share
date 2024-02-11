import styled from "styled-components";

export const Global = styled.div`
    padding-left: 100px;
    padding-right: 100px;
`

export const Title = styled.h1`
    font-size:25px;
    font-weight: bold;
    padding-top: 30px;
    padding-bottom: 10px;
`

export const Display = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
    justify-content: space-between;
    grid-gap:20px;
`

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
`