import { DialogContentText, DialogTitle } from '@mui/material'
import styled from 'styled-components'

export const CustomDialogTitle = styled(DialogTitle)`
    display: flex;
    justify-content: center;
`

export const DialogContent = styled.div`
    width: 25rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
`
export const CustomDialogText = styled(DialogContentText)`
    display: flex;
    justify-content: center;
`