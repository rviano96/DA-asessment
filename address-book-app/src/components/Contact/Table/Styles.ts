import { Paper as PaperUI, TableCell } from '@mui/material'
import styled from 'styled-components'

export const Container = styled.div`
    display:flex;
    width: 80%;
    height:80%;
    margin: auto;
    
`
export const Paper = styled(PaperUI)`
    width:100%;
`

export const HeadCell = styled(TableCell)`
    font-weight: bold !important;
`