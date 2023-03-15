import React from 'react'
import UiBox from '../ui/uiKit/layouts/UiBox'
import { UiFlexColToRowFrom } from '../ui/uiKit/layouts/UiFlex'
import TextFontAlt from '../ui/myAppUi/TextFontAlt'
import {  PET_TYPES } from '../../config/config'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterType } from '../../redux/reducers/petSlice'
import SearchFormRadioControl from './SearchFormRadioControl'
import UiRadioGroup from '../ui/uiKit/componentsUi/UiRadioGroup'


export default function Search() {

    const dispatch = useDispatch()
    const filters = useSelector(state => state.pet.filters)

    const handleChange = (event) => {
        dispatch(setFilterType(event.target.value))
    };

    return (
        <UiBox>
            <UiFlexColToRowFrom gap={2} justifyContent='center' alignItems='center'>
                <TextFontAlt color='main.dark' bold={true} variant="h5" >
                    Looking for:
                </TextFontAlt>
                <UiRadioGroup
                    row
                    name="pet-type-radio-buttons-group"
                    value={filters.type}
                    onChange={handleChange}
                >
                    <SearchFormRadioControl value={PET_TYPES.all} label='Cats or Dogs'/>
                    <SearchFormRadioControl value={PET_TYPES.cat} label='Only Cats'/>
                    <SearchFormRadioControl value={PET_TYPES.dog} label='Only Dogs'/>
                </UiRadioGroup>

            </UiFlexColToRowFrom>
        </UiBox>
    )
}
