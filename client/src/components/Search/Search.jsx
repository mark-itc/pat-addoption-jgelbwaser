import React, { useEffect, useRef, useState } from 'react'
import UiBox from '../ui/uiKit/layouts/UiBox'
import { UiFlexColToRowFrom, UiFlexRow } from '../ui/uiKit/layouts/UiFlex'
import TextFontAlt from '../ui/myAppUi/TextFontAlt'
import { FILTER_OPTIONS, PET_MAX_HEIGHT_IN_cm, PET_MAX_WEIGHT_IN_Kg, PET_STATUS, PET_TYPES } from '../../config/config'
import { useDispatch, useSelector } from 'react-redux'
import { clearExtraFilters, setExtraFiltersAreActive, setFilterType, setMoreFilters, toggleShowExtraFilters } from '../../redux/reducers/petSlice'
import SearchFormRadioControl from './SearchFormRadioControl'
import UiRadioGroup from '../ui/uiKit/componentsUi/UiRadioGroup'
import UiCollapse from '../ui/uiKit/muiTransitions/UiCollapse'
import UiDiv from '../ui/uiKit/layouts/UiDiv'
import UiIconButton from '../ui/uiKit/componentsUi/UiIconButton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from '@emotion/styled'
import { clearAppError } from '../../redux/reducers/appSlice'
import AppButton from '../ui/myAppUi/AppButton'
import TextLink from '../ui/myAppUi/TextLink'
import ModalTextField from '../ui/myAppUi/ModalTextField'
import UiMenuItem from '../ui/uiKit/componentsUi/UiMenuItem'
import UiSlider from '../ui/uiKit/componentsUi/UiSlider'
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const ExpandMoreAnimatedIcon = styled((props) => {
    const { expand, ...other } = props;
    return <UiIconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(-90deg)' : 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


const petStatusKeyArray = Object.keys(FILTER_OPTIONS.status)
const selectMenuOptions = petStatusKeyArray.map(status => {
    return { label: FILTER_OPTIONS.status[status], value: status }
})


export default function Search() {

    const dispatch = useDispatch()
    const { filters, showExtraFilters, extraFiltersAreActive } = useSelector(state => state.pet)
    const { loading } = useSelector(state => state.app)
    const [searchExpanded, setSearchExpanded] = useState(showExtraFilters)//showExtraFilters

    const handleExpandedClick = () => {
        setSearchExpanded(!searchExpanded)
        //dispatch(toggleShowExtraFilters())
    }

    const updateShowFilterReduxState = () => {
        dispatch(toggleShowExtraFilters())
    }


    const handleTypeChange = (event) => {
        dispatch(setFilterType(event.target.value))
    };

    const handleSetMoreFilters = (event) => {
        event.preventDefault();
        dispatch(clearAppError())
        const moreFilters = {}
        const formData = new FormData(event.currentTarget);
        moreFilters.name = formData.get('name');
        moreFilters.status = formData.get('status');
        moreFilters.weight_min = weightRef.current[0] === 0 ? null : weightRef.current[0] * 1000 //kg -> gr
        moreFilters.weight_max = weightRef.current[1] === PET_MAX_WEIGHT_IN_Kg ? null : weightRef.current[1] * 1000 //kg -> gr
        moreFilters.height_min = heightRef.current[0] === 0 ? null : heightRef.current[0]
        moreFilters.height_max = heightRef.current[1] === PET_MAX_HEIGHT_IN_cm ? null : heightRef.current[1]
        dispatch(setMoreFilters(moreFilters))
    }

    const handleClearFilters = () => {
        dispatch(clearExtraFilters())
    }

    //const[extraFiltersActive, setExtraFiltersActive] = useState(false)
    useEffect(() => {
        let areActive = false
        areActive = filters.name === null ? areActive : true;
        areActive = filters.weight_min === null ? areActive : true;
        areActive = filters.weight_max === null ? areActive : true;
        areActive = filters.height_min === null ? areActive : true;
        areActive = filters.height_max === null ? areActive : true;
        areActive = filters.status === 0 || filters.status === '0' ? areActive : true;
        dispatch(setExtraFiltersAreActive(areActive))
    }, [filters, dispatch])


    //Weight slider
    const minWeightInKg = filters.weight_min ? (parseFloat((filters.weight_min / 1000).toFixed(1))) : 0
    const maxWeightInKg = filters.weight_max ? (parseFloat((filters.weight_max / 1000).toFixed(1))) : PET_MAX_WEIGHT_IN_Kg
    const weightRef = useRef([minWeightInKg, maxWeightInKg])


    const handleWeightChange = (event, newValue) => {
        weightRef.current = newValue
    }
    const styles = {
        slider: {
            '& .MuiSlider-valueLabel': {
                top: ' 40px',
                background: 'transparent',
                color: 'grey',
                fontSize: 14
            },
        },
    };
    const formatWeightValueLabel = (value) => {
        return `${value} kg`;
    };


    //height slider
    const minHeightInCm = filters.height_min ? filters.height_min : 0
    const maxHeightInCm = filters.height_max ? filters.height_max : PET_MAX_HEIGHT_IN_cm
    const heightRef = useRef([minHeightInCm, maxHeightInCm ])


    const handleHeightChange = (event, newValue) => {
        heightRef.current = newValue
    }

    const formatHeightValueLabel = (value) => {
        return `${value} cm`;
    };


    return (
        <UiBox mt={2} sx={{ width: '800px', maxWidth: '85vw', alignSelf: 'center' }}>
            <UiFlexColToRowFrom gapX={5} gapY={1} justifyContent='space-between' alignItems='center' >
                <UiRadioGroup
                    row
                    name="pet-type-radio-buttons-group"
                    value={filters.type || PET_TYPES.all}
                    onChange={handleTypeChange}
                >
                    <SearchFormRadioControl value={PET_TYPES.all} label='Cats or Dogs' />
                    <SearchFormRadioControl value={PET_TYPES.cat} label='Only Cats' />
                    <SearchFormRadioControl value={PET_TYPES.dog} label='Only Dogs' />
                </UiRadioGroup>
                <UiDiv onClick={handleExpandedClick}>
                    <UiFlexRow gap={1} alignItems='center'>
                        {extraFiltersAreActive && <WarningAmberIcon color='primary' />}
                        <TextFontAlt
                            color={extraFiltersAreActive ? 'primary' : 'main.dark'}
                            bold={true}
                            variant="h5"
                            sx={{letterSpacing: '0.2rem'}}
                        >
                            {extraFiltersAreActive ? 'Filters On' : 'More Filters'}
                            <ExpandMoreAnimatedIcon expand={searchExpanded}>
                                <ExpandMoreIcon color={extraFiltersAreActive ? 'primary' : 'main.dark'} />
                            </ExpandMoreAnimatedIcon>
                        </TextFontAlt>
                    </UiFlexRow>
                </UiDiv>
            </UiFlexColToRowFrom>
            <UiCollapse in={searchExpanded} timeout="auto" onEntered={updateShowFilterReduxState} onExited={updateShowFilterReduxState} unmountOnExit >
                <UiBox component="form" onSubmit={(e) => handleSetMoreFilters(e)} >
                    <UiFlexColToRowFrom gapX={4}   >
                        <ModalTextField
                            //sx={{ minWidth: '10rem' }}
                            sx={{ flex: 1 }}
                            defaultValue={filters.name || ''}
                            label="Pet Name"
                            name="name"
                            size="small"
                            variant="standard"
                            autoFocus
                        />
                        <ModalTextField
                            sx={{ flex: 1 }}
                            select
                            flex={1}
                            label="Pet Status"
                            size="small"
                            name="status"
                            defaultValue={filters.status || PET_STATUS.all}
                            variant="standard"
                        >
                            {selectMenuOptions.map((option) => (
                                <UiMenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </UiMenuItem>
                            ))}
                        </ModalTextField>
                    </UiFlexColToRowFrom>

                    {/* weight slider */}
                    <UiBox my={3}>
                        <UiFlexColToRowFrom gapX={4} gapY={3}>
                            <UiFlexColToRowFrom gapX={4} gapY={1} sx={{ flex: '1' }}>
                                Weight:
                                <UiBox sx={{ flex: '1' }}>
                                    <UiSlider
                                        onChange={handleWeightChange}
                                        defaultValue={[minWeightInKg, maxWeightInKg]}
                                        step={0.1}
                                        name='weight'
                                        max={PET_MAX_WEIGHT_IN_Kg}
                                        valueLabelDisplay="on"
                                        sx={styles.slider}
                                        valueLabelFormat={formatWeightValueLabel}
                                        size="small"
                                    />
                                </UiBox>
                            </UiFlexColToRowFrom>


                            {/* height slider */}

                            <UiFlexColToRowFrom gapX={4} justifyContent='center' sx={{ flex: '1' }}>
                                Height:
                                <UiBox sx={{ flex: '1' }}>
                                    <UiSlider
                                        onChange={handleHeightChange}
                                        defaultValue={[minHeightInCm, maxHeightInCm]}
                                        step={1}
                                        name='height'
                                        max={PET_MAX_HEIGHT_IN_cm}
                                        valueLabelDisplay="on"
                                        sx={styles.slider}
                                        valueLabelFormat={formatHeightValueLabel}
                                        size="small"
                                    />
                                </UiBox>
                            </UiFlexColToRowFrom>
                        </UiFlexColToRowFrom>
                    </UiBox>
                    {/* //Status, Height, Weight */}

                    <UiBox mt={5}>
                        <UiFlexColToRowFrom gapX={4} gapY={2} w100 justifyContent='center' >
                            <AppButton type="submit" variant="contained" disabled={loading}>
                                {loading ? 'Loading' : 'Set Filters'}
                            </AppButton>
                            <AppButton variant="outlined" onClick={handleClearFilters}>
                                Clear Filters
                            </AppButton>
                        </UiFlexColToRowFrom>
                    </UiBox>
                    <UiBox mt={2}>

                        <UiFlexRow justifyContent='center' >
                            <TextLink href="#" variant="body2" onClick={handleExpandedClick}>
                                Hide  Filters
                            </TextLink>
                        </UiFlexRow>
                    </UiBox>
                </UiBox>
            </UiCollapse >
        </UiBox >
    )
}
