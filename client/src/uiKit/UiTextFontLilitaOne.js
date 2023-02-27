import React from 'react'
import UiText from './UiText'

export default function UiTextFontLilitaOne(props) {
    return (
        <UiText {...props} sx={{ fontFamily: 'Lilita One,cursive' }}>
            {props.children}
        </UiText>
    )
}
