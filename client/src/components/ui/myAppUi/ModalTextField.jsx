import React from 'react'
import UiTextField from '../uiKit/componentsUi/UiTextField'

export default function ModalTextField({ sx = {}, bold = false, ...props }) {
    return (
        <UiTextField
            margin="normal"
            {...props} {...sx}
        >
            {props.children}
        </UiTextField>
    )
}
