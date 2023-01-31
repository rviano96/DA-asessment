import { Button as ButtonUI } from '@mui/material'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Button = styled(ButtonUI)`
    padding: 0.5rem !important;
    color: #000000aa !important;
    &:active{
        color: #000000 !important;
    }
    &:hover{
        color: #0000008a !important; 
    }   
`

export const ButtonLink = styled(Link)`
    text-decoration: none;
    color: #000000;
`

export const Image = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #ededed;
    border: solid 1px white;
`

export const ImageContainer = styled.div`
    justify-content: center;
    display:flex;
`