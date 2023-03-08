import styled from '@emotion/styled'
import React from 'react'
import UiRadio from './UiCard/UiRadio'

export default function AppRadio({...props}) {
    

  const StyledRadio = styled(UiRadio)(({theme})=>({
    fontFamily: 'Amatic SC,cursive',
    fontWeight: '700' 
  }))

  return (
    <StyledRadio color="neutral" orientation="horizontal"  {...props} >
        {props.children}
    </StyledRadio>
  )
}
