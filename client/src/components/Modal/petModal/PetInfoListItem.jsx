import React from 'react'
import { UiFlexColToRowFrom } from '../../ui/uiKit/layouts/UiFlex'
import TextFont from '../../ui/myAppUi/TextFont'

export default function PetInfoListItem({keyName, keyTitle, value, units='', ...props}) {
  return (
    <UiFlexColToRowFrom>
    {keyName? <TextFont {...props} mr={2} color='main.light' variant="subtitle1" >{keyName}:</TextFont> : null}
    <TextFont {...props} color='main.main' variant="subtitle1" >{`${value} ${units}`.trim()} </TextFont>
    </UiFlexColToRowFrom>
  )
}
