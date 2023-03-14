import React from 'react'
import UiBox from '../ui/uiKit/layouts/UiBox'
import { UiFlexColToRowFrom, UiFlexRow } from '../ui/uiKit/layouts/UiFlex'
import TextFontAlt from '../ui/myAppUi/TextFontAlt'
import AppRadio from '../ui/uiKit/componentsUi/AppRadio'
import UiRadio from '../ui/uiKit/componentsUi/UiCard/UiRadio'
import { FILTER_OPTIONS, PET_TYPES } from '../../config/config'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterType } from '../../redux/reducers/petSlice'
import { FormControl, FormLabel, RadioGroup } from '@mui/material'
import UiFormControlLabel from '../ui/uiKit/componentsUi/UiFormControlLabel'
import SearchFormRadioControl from './SearchFormRadioContro'


export default function Search() {

    const dispatch = useDispatch()
    const filters = useSelector(state => state.pet.filters)

    const [selectedValue, setSelectedValue] = React.useState('a');

    const handleChange = (event) => {
        dispatch(setFilterType(event.target.value))
    };

    return (
        <UiBox>

            <UiFlexColToRowFrom gap={2} justifyContent='center' alignItems='center'>
                <TextFontAlt color='main.dark' bold={true} variant="h5" >
                    Looking for:
                </TextFontAlt>
                <RadioGroup
                    row
                    name="pet-type-radio-buttons-group"
                    value={filters.type}
                    onChange={handleChange}
                >
                    <SearchFormRadioControl value={PET_TYPES.all} label='Cats or Dogs'/>
                    <SearchFormRadioControl value={PET_TYPES.cat} label='Only Cats'/>
                    <SearchFormRadioControl value={PET_TYPES.dog} label='Only Dogs'/>
                </RadioGroup>

            </UiFlexColToRowFrom>
        </UiBox>
    )
}
