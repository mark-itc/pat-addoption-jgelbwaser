import React from 'react'
import UiText from '../uiKit/componentsUi/UiText'

export default function Text(props) {
    return (
        <UiText {...props}>
            {props.children}
        </UiText>
    )
}
