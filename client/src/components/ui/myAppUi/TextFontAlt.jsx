import React from 'react'
import UiText from '../uiKit/componentsUi/UiText'

export default function FontAlt({sx={}, bold, ...props}) {
    return (
        <UiText {...props} sx={{ 
            fontFamily: 'Amatic SC,cursive',
            fontWeight: bold ? '700' : '400',
            ...sx}}>
            {props.children}
        </UiText>
    )
}
