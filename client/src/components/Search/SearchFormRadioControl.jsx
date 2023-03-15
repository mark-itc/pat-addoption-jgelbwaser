import React from 'react'
import UiRadio from '../ui/uiKit/componentsUi/UiCard/UiRadio'
import UiFormControlLabel from '../ui/uiKit/componentsUi/UiFormControlLabel'
import TextFontAlt from '../ui/myAppUi/TextFontAlt'


export default function SearchFormRadioControl({label, value, ...props}) {
  return (
    <UiFormControlLabel {...props} 
    value={value}
    control={<UiRadio />}
    label={
        <TextFontAlt 
        color='main.dark' 
        bold 
        variant="h5" >
            {label}
        </TextFontAlt>}
    />
  )
}
