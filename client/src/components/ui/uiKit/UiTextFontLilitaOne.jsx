import React from 'react'
import UiText from './UiText'

export default function UiTextFontLilitaOne({sx, ...props}) {
    return (
        <UiText {...props} sx={{ fontFamily: 'Lilita One,cursive', ...sx }}>
            {props.children}
        </UiText>
    )
}
