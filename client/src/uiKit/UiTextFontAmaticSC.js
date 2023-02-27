import { fontWeight } from '@mui/system'
import React from 'react'
import UiText from './UiText'

export default function UiTextFontAmaticSC({bold=false, ...props}) {
    return (
        <UiText {...props} sx={{ 
            fontFamily: 'Amatic SC,cursive',
            fontWeight: bold ? '700' : '400',
            }}>
            {props.children}
        </UiText>
    )
}
