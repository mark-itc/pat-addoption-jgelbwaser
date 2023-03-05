import React from 'react'
import UiTextField from '../uiKit/componentsUi/UiTextField'

export default function ModalTextField({   ...props }) {
    return (
        <UiTextField
            margin="dense"
            {...props} 
        >
            {props.children}
        </UiTextField>
    )
}
