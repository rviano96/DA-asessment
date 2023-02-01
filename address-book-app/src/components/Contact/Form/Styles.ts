import styled from 'styled-components'

import {
    TextField as textField,
    Button as ButtonCore
} from '@material-ui/core'
import { Link } from 'react-router-dom'

export const FormContainer = styled.div`
    max-width: 450px;
    display: flex;
    margin: 0 auto;
    height:100%;
`
export const Content = styled.div`
    margin-top: auto;
    margin-bottom: auto;
    background-color: #dddddd;
    padding:1rem;
    border-radius:1rem;
    box-shadow: 0px 4px 8px 5px rgba(0,0,0,0.2);
`
export const TextField = styled(textField)`
    width: 100%;
    &>*{
        width: 50%,
        };
`

export const SubmitButton = styled(ButtonCore)`
    width: 100%;
    margin-top: 24px;
    display:flex;
    justify-content:center;
    border-color: #dddddd !important;
    &:hover{
    background-color:  #9D9D9D !important;
  }
  text-align:center !important;
`

export const ErrorMessage = styled.p`
    color:red;
`

export const Title = styled.h1`
    text-align:center;
`

export const ButtonLink = styled(Link)`
    text-decoration: none;
    color: #000000aa;
    &:active{
        color: #000000;
    }
    &:hover{
        color: #0000008a;
    }   
`
export const OptionsContainer = styled.div`
    display:flex;
    justify-content: space-between;
`

export const DeleteButton = styled.div`
    cursor:pointer;
    color: #c70000aa;
    &:active{
    color: #c7000000;
    }
    &:hover{
        color: #c700008a;
    }
`

export const FormStatus = styled.div`
    text-align: center;
`