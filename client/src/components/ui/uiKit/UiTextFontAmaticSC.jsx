import React from 'react'
import UiText from './UiText'

export default function UiTextFontAmaticSC({sx={}, bold=false, ...props}) {
    return (
        <UiText {...props} sx={{ 
            fontFamily: 'Amatic SC,cursive',
            fontWeight: bold ? '700' : '400',
            ...sx}}>
            {props.children}
        </UiText>
    )
}
