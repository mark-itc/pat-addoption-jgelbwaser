import UiContainer from '../uiKit/layouts/UiContainer'
import React from 'react'

export default function AppUiContainer(props) {
  return (
    <UiContainer  maxWidth='md' {...props}>
        {props.children}
    </UiContainer>
  )
}
