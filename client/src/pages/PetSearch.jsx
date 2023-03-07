import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import MyAppUiContainer from '../components/ui/myAppUi/MyAppUiContainer'
import UiDiv from '../components/ui/uiKit/layouts/UiDiv';
import { UiFlexCol } from '../components/ui/uiKit/layouts/UiFlex';
import TextFontAlt from '../components/ui/myAppUi/TextFontAlt'

// import UseApi from '../services/useApi';

export default function PetSearch() {

  const {pets} = useSelector(state => state.pet);
  
  const picSrc = process.env.REACT_APP_API_PICS_URL + '1678084395989.51275dVsniU.jpg'
/* <img crossOrigin="anonymous" src={picSrc} style={
        {
          width: '10%',
          margin: '0 auto',
          maxWidth: '800px',
          height: 'auto'
        }
      } alt="cat" /> */

  return (
    <div>
      <MyAppUiContainer>
      <UiFlexCol justifyContent='space-between' sx={{height:'100%'}}>
      <TextFontAlt mt={5} align="center" color='secondary.dark' bold={true} variant="h2" >Adopt a pet and find your forever companion</TextFontAlt>
      </UiFlexCol>
      </MyAppUiContainer>

    </div>
  )
}
