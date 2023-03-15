import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MyAppUiContainer from '../components/ui/myAppUi/MyAppUiContainer'
import UiBox from '../components/ui/uiKit/layouts/UiBox';
import UiLink from '../components/ui/uiKit/componentsUi/UiLink';
import {  UiFlexRow } from '../components/ui/uiKit/layouts/UiFlex';
import TextFontAlt from '../components/ui/myAppUi/TextFontAlt'
import { useSelector } from 'react-redux';
import PetCard from '../components/PetCard/PetCard';
import { UiAlertCollapse } from '../components/ui/uiKit/componentsUi/UiAlert';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ROUTES_PATH } from '../config/config';


const TABS = {
  myPets: 1,
  savedPets: 2,
  morePets: 3
}

export default function BasicTabs() {
  const [selectedTab, setSelectedTab] = useState(TABS.myPets);
  const { petsInUserCare, petsSavedByUser } = useSelector(state => state.pet)
  const { error, loading } = useSelector(state => state.app)
  const navigate = useNavigate();
  const showAlert = error ? true : false


  const handleChange = (event, newValue) => {
    if (newValue === TABS.morePets) {
      navigate(ROUTES_PATH.search)
    }
    setSelectedTab(newValue);
  };

  return (
    <MyAppUiContainer>
      <UiBox mt={3}>
        <Box sx={{ width: '100%' }}>
          <Box>
            <Tabs
              gap={5}
              centered
              textColor="secondary"
              indicatorColor="secondary"
              value={selectedTab} onChange={handleChange} >
              <Tab sx={{ mx: 5 }}
                value={TABS.myPets}
                label={<TextFontAlt bold={true} variant="h4" >
                  My Pets
                </TextFontAlt>}
              />
              <Tab sx={{ mx: 5 }}
                value={TABS.savedPets}
                label={<TextFontAlt bold={true} variant="h4" >
                  Saved Pets
                </TextFontAlt>}
              />
              <Tab sx={{ mx: 5 }}
                value={TABS.morePets}
                label={<TextFontAlt bold={true} variant="h4" >
                  More Pets
                </TextFontAlt>}
              />
            </Tabs>
          </Box>
        </Box >
        <UiBox mt={1}>
          <UiAlertCollapse show={showAlert} >{error}</UiAlertCollapse>
        </UiBox>
      </UiBox>
      <UiBox mt={2}>
        {selectedTab === TABS.myPets ?
          (
            petsInUserCare && petsInUserCare.length ?
              (
                <UiFlexRow gap={3} justifyContent="center" flexWrap="wrap">
                  {petsInUserCare.map(pet => {
                    return <PetCard key={pet._id} {...pet} />
                  })}
                </UiFlexRow>
              ) : (
                <TextFontAlt mt={2} align="center" color='primary' bold={true} variant="h4" >
                  {loading ? 'Loading...' : (
                    <>
                      You currently do not own or foster any pets
                      <UiLink component={RouterLink} to={ROUTES_PATH.search}>
                        <TextFontAlt mt={1} variant="h4" bold={true}>
                          Find a pet here
                        </TextFontAlt>
                      </UiLink>
                    </>
                  )}
                </TextFontAlt>
              )

          ) : (
            petsSavedByUser && petsSavedByUser.length ?
              (
                <UiFlexRow gap={3} justifyContent="center" flexWrap="wrap">
                  {petsSavedByUser.map(pet => {
                    return <PetCard key={pet._id} {...pet} />
                  })}
                </UiFlexRow>
              ) : (
                <TextFontAlt align="center" color='primary' bold={true} variant="h4" >
                  {loading ? 'Loading...' : (
                    <>
                      You currently do not own or foster any pets
                      <UiLink component={RouterLink} to={ROUTES_PATH.search}>
                        <TextFontAlt mt={1} variant="h4" bold={true} >
                          You currently do not have  any saved pets
                        </TextFontAlt>
                      </UiLink>
                    </>
                  )}
                </TextFontAlt>
              )
          )
        }

      </UiBox>

    </MyAppUiContainer>


  );
}


