import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import MyAppUiContainer from '../components/ui/myAppUi/MyAppUiContainer'
import UiDiv from '../components/ui/uiKit/layouts/UiDiv';
import { UiFlexCol, UiFlexColToRowFrom, UiFlexRow } from '../components/ui/uiKit/layouts/UiFlex';
import TextFontAlt from '../components/ui/myAppUi/TextFontAlt'
import UiBox from '../components/ui/uiKit/layouts/UiBox';
import PetCard from '../components/PetCard/PetCard';

// import UseApi from '../services/useApi';

export default function PetSearch() {

  const { pets } = useSelector(state => state.pet);

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
        <UiFlexCol justifyContent='space-between' sx={{ height: '100%' }}>
          <UiFlexCol>
          <TextFontAlt mt={5} align="center" color='secondary.dark' bold={true} variant="h2" >
            Find your forever companion
          </TextFontAlt>
          <UiBox>
            <UiFlexColToRowFrom justifyContent='center'>
            <TextFontAlt mt={5} align="center" color='main.dark' bold={true} variant="h4" >
            Looking for:
            justifyContent='space-between'
            </TextFontAlt>
              
            </UiFlexColToRowFrom>
          </UiBox>
          </UiFlexCol>
          <UiBox mt={5}>
            <UiFlexRow gap={3} justifyContent="center" flexWrap="wrap">
              {pets && pets.map(pet =>{
                 return <PetCard key={pet._id} {...pet} />
              })
              }
             
            </UiFlexRow>
          </UiBox>
        </UiFlexCol>
      </MyAppUiContainer>

    </div>
  )
}
