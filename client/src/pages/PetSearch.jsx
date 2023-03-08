import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import MyAppUiContainer from '../components/ui/myAppUi/MyAppUiContainer'
import UiDiv from '../components/ui/uiKit/layouts/UiDiv';
import { UiFlexCol, UiFlexColToRowFrom, UiFlexRow } from '../components/ui/uiKit/layouts/UiFlex';
import TextFontAlt from '../components/ui/myAppUi/TextFontAlt'
import UiBox from '../components/ui/uiKit/layouts/UiBox';
import PetCard from '../components/PetCard/PetCard';
import Search from '../components/Search/Search';

// import UseApi from '../services/useApi';

export default function PetSearch() {

  const { pets } = useSelector(state => state.pet);

  return (
    <div>
      <MyAppUiContainer>
        <UiFlexCol justifyContent='space-between' sx={{ height: '100%' }}>
          <UiFlexCol>
            <TextFontAlt mt={5} align="center" color='secondary.dark' bold={true} variant="h2" >
              Find your forever companion
            </TextFontAlt>
            <Search />
          </UiFlexCol>
          <UiBox mt={5}>
            {pets.length == 0} ? (
              <TextFontAlt align="center" color='primary' bold={true} variant="h2" >
              No results were found
            </TextFontAlt>
            ):(
            <UiFlexRow gap={3} justifyContent="center" flexWrap="wrap">
              {pets && pets.map(pet => {
                return <PetCard key={pet._id} {...pet} />
              })
              }
)
            </UiFlexRow>
          </UiBox>
        </UiFlexCol>
      </MyAppUiContainer>

    </div>
  )
}
