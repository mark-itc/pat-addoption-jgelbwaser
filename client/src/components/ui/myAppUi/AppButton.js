import React from 'react'
import UiButton from '../uiKit/UiButton'


export default function AppButton({sx, ...props}) {
  return (
    <UiButton {...props} sx={{ minWidth: '10rem', ...sx}}>
        {props.children}
    </UiButton>
  )
}
