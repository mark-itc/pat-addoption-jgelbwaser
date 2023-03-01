import React from 'react'
import UiText from '../uiKit/componentsUi/UiText'

export default function TextFontLogo({sx, ...props}) {
    return (
        <UiText {...props} sx={{ fontFamily: 'Lilita One,cursive', ...sx }}>
            {props.children}
        </UiText>
    )
}
