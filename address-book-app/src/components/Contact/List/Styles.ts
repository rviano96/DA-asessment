import styled from 'styled-components'
import { TableCell, Paper, TableRow } from '@mui/material'


export const Container = styled.div`
    display:flex;
`

export const TopBarContainer = styled(Paper)`
    padding: 1rem;
    display: flex;
`

export const Row = styled(TableRow)`
    cursor: pointer;
    &:hover{
        color: #000000aa;
        background-color: #DFDFDF
    }   
`
export const NameCell = styled(TableCell)`
    text-transform: capitalize;
`