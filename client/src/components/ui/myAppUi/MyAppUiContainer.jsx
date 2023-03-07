import UiContainer from '../uiKit/layouts/UiContainer'
import React from 'react'

export default function AppUiContainer(props) {
  return (
    <UiContainer  maxWidth='lg' {...props}>
        {props.children}
    </UiContainer>
  )
}
