import React from 'react'
import UiIconButton from '../ui/uiKit/componentsUi/UiIconButton'

export default function NavIconButton({  ...props}) {
    return (
      <UiIconButton {...props} color="white" variant='text'>
          {props.children}
      </UiIconButton>
    )
}