import React from 'react'
import UiStack from './UiStack'

export default function UiStackRowSxCol(props) {
  return (
    <UiStack sx={{flexDirection: {xs: 'column', sm: 'row' }}} {...props} >
        {props.children}
    
    </UiStack>
  )
}
