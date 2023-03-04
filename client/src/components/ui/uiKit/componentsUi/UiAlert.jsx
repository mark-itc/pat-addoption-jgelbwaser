import Alert from '@mui/material/Alert'
import React, { useState } from 'react'
import UiCollapse from '../muiTransitions/UiCollapse'

export function UiAlert({ severity="error", ...props }) {
    return (
        <Alert severity='error' {...props} >
            {props.children}
        </Alert>
    )
}


export function UiAlertCloseOption({ ...props }) {

    const [open, setOpen] = useState(true)
    const handleClose = () =>  setOpen(false)

    return (
        <>
            {open ? (
                <UiAlert {...props} onClose={handleClose} >
                    {props.children}
                </UiAlert>
            ) : null}
        </>
    )
}

export function UiAlertCollapse({ ...props }) {

    const [open, setOpen] = useState(true)
    const handleClose = () => setOpen(false);

    return (
        <UiCollapse in={open}>
                <UiAlert {...props} onClose={handleClose} >
                    {props.children}
                </UiAlert>
        </UiCollapse>
    )
}



