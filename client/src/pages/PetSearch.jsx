import React from 'react'
import { useSelector } from 'react-redux';
import MyAppUiContainer from '../components/ui/myAppUi/MyAppUiContainer'
import { UiFlexCol, UiFlexRow } from '../components/ui/uiKit/layouts/UiFlex';
import TextFontAlt from '../components/ui/myAppUi/TextFontAlt'
import UiBox from '../components/ui/uiKit/layouts/UiBox';
import PetCard from '../components/PetCard/PetCard';
import Search from '../components/Search/Search';
import { UiAlertCollapse } from '../components/ui/uiKit/componentsUi/UiAlert';

export default function PetSearch() {

  const { pets } = useSelector(state => state.pet);
  const { error, loading } = useSelector(state => state.app)
  const showAlert = error ? true : false

  return (
    <div>
      <MyAppUiContainer>
        <UiFlexCol justifyContent='space-between' sx={{ height: '100%' }}>
          <UiFlexCol alignItems='stretch'>
            <TextFontAlt mt={5} align="center" color='secondary.dark' bold={true} variant="h2" >
              Find your forever companion
            </TextFontAlt>
            <Search />
            <UiBox mt={3}>
              <UiAlertCollapse show={showAlert} >{error}</UiAlertCollapse>
            </UiBox>
          </UiFlexCol>
          <UiBox mt={2}>
            {pets && pets.length ?
              (
                <UiFlexRow gap={3} justifyContent="center" flexWrap="wrap">
                {pets.map(pet => {
                  return <PetCard key={pet._id} {...pet} />
                })}
              </UiFlexRow>
              ) : (
                <TextFontAlt align="center" color='primary' bold={true} variant="h4" >
                {loading ? 'Loading...' : 'No results were found'}
              </TextFontAlt>
              )
            }

          </UiBox>
        </UiFlexCol>
      </MyAppUiContainer>

    </div>
  )
}
