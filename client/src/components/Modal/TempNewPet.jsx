import React, { useEffect, useState, useRef } from 'react';
import UseApi from '../../services/useApi';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import UiBox from '../ui/uiKit/layouts/UiBox';
import { UiFlexCol, UiFlexColToRowFrom, UiFlexRow } from '../ui/uiKit/layouts/UiFlex';
import UiAvatar from '../ui/uiKit/componentsUi/UiAvatar';
import TextFontLogo from '../ui/myAppUi/TextFontLogo';
import ModalTextField from '../ui/myAppUi/ModalTextField';
import AppButton from '../ui/myAppUi/AppButton';
import { UiAlertCollapse } from '../ui/uiKit/componentsUi/UiAlert';
import TextLink from '../ui/myAppUi/TextLink';
import { closeModal, MODAL_OPTIONS, openModal, clearAppError } from '../../redux/reducers/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_OPTIONS, PET_MAX_HEIGHT_IN_cm, PET_MAX_WEIGHT_IN_gr, PET_MAX_WEIGHT_IN_Kg } from '../../config/config';
import UiMenuItem from '../ui/uiKit/componentsUi/UiMenuItem';
import ImageContainedBlurBG from '../ui/uiKit/componentsUi/ImageContainedBlurBG';
import UsePet from '../../hooks/UsePet';

export default function NewPet() {

    const { currentUser } = useSelector(state => state.user)
    const { error, loading } = useSelector(state => state.app)
    
    const dispatch = useDispatch();
    const { signIn } = UseApi();
    const showAlert = error ? true : false
    const [newPetData, setNewPetData] = useState({})
    const [imageToRender, setImageToRender] = useState(null);
    const [fileImageToUpload, setFileImageToUpload] = useState(newPetData?.picture);
    const fileInputRef = useRef(null);
    const {addPet} = UsePet();

    const petTypeKeyArray = Object.keys(FILTER_OPTIONS.type)
    const selectMenuOptions = petTypeKeyArray.map(type => {
        return { label: FILTER_OPTIONS.type[type], value: type }
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(clearAppError())
        const formData = new FormData(event.currentTarget);
        const formObject = Object.fromEntries(formData.entries());
        setNewPetData(formObject)
        addPet( formObject,fileImageToUpload)
    }


    useEffect(() => { !currentUser && dispatch(closeModal()) }, [currentUser, dispatch])

    const handleClose = () => {
        dispatch(closeModal())
        dispatch(clearAppError())
    }


    ///PICTURE
    const handleImageSelect = () => {
        fileInputRef.current.click();
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setFileImageToUpload(file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageToRender(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <UiBox >
            {!imageToRender ? (
                <UiBox
                    onClick={handleImageSelect}
                    sx={{
                        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '0',
                        height: '200px', width: '100%', backgroundColor: '#EFD6C5', cursor: 'pointer',
                        '&:hover': { backgroundColor: '#F9BF98' }

                    }}>
                    <UiBox
                        sx={{ height: '100px', width: '100px' }}>
                        <img src="./assets/logo-outline.png" alt="" style={{
                            width: '100%', heigh: '100%'
                        }}
                        />
                    </UiBox>
                    <TextFontLogo component="h1" color='secondary.main' variant="h5">Click to add Picture</TextFontLogo>
                </UiBox>
            ) : (
                < ImageContainedBlurBG
                onClick={handleImageSelect}
                    image={imageToRender}
                    crossOrigin="anonymous"
                    height='200px'
                />
            )
            }
            <input
                type="file"
                onChange={handleImageUpload}
                ref={fileInputRef}
                accept="image/*"
                style={{ display: 'none' }}
            />
            <UiBox px={3} py={2}>
                <UiFlexCol alignContent='center'>
                    <UiFlexRow gapX={2} w100 alignItems='center' justifyContent='center'  >

                        {/* <UiAvatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <PetsIcon />
                        </UiAvatar> */}
                        <TextFontLogo component="h1" variant="h5">Add Pet</TextFontLogo>
                    </UiFlexRow>
                    <UiBox component="form" onSubmit={handleSubmit} >

                        <ModalTextField
                            defaultValue={newPetData?.name || ''}
                            size='small'
                            required
                            fullWidth
                            label="Pet Name"
                            name="name"
                            autoComplete="name"
                        />

                        <UiFlexColToRowFrom gapX={2}>
                            <ModalTextField
                                sx={{ flex: 1 }}
                                select
                                required
                                // fullWidth
                                flex={1}
                                size='small'
                                label='Pet Type'
                                name="type"
                                defaultValue={newPetData?.type || ''}
                            >
                                {selectMenuOptions.map((option) => (
                                    <UiMenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </UiMenuItem>
                                ))}
                            </ModalTextField>
                            <ModalTextField
                                sx={{ flex: 1 }}
                                defaultValue={newPetData?.height || ''}
                                size='small'
                                InputProps={{
                                    inputProps: {
                                        min: 0, max: PET_MAX_HEIGHT_IN_cm
                                    }
                                }}
                                required
                                type="number"
                                // fullWidth
                                label="Height(cm)"
                                name="height"
                                autoComplete="height"
                            />
                            <ModalTextField
                                sx={{ flex: 1 }}
                                defaultValue={(newPetData?.weight/1000) || ''}
                                size='small'
                                InputProps={{
                                    inputProps: {
                                        min: 0, max: PET_MAX_WEIGHT_IN_Kg, step:"0.01"
                                    }
                                }}
                                required
                                // fullWidth
                                type="number"
                                label="Weight(Kg)"
                                name="weight"
                                autoComplete="weight"
                            />
                        </UiFlexColToRowFrom>
                        <UiFlexColToRowFrom gapX={2}>
                            <ModalTextField
                                sx={{ flex: 1 }}
                                defaultValue={newPetData?.breed || ''}
                                size='small'
                                label="Breed"
                                name="breed"
                                autoComplete="breed"
                            />
                            <ModalTextField
                                sx={{ flex: 1 }}
                                defaultValue={newPetData?.color || ''}
                                size='small'
                                fullWidth
                                label="Color"
                                name="color"
                                autoComplete="color"
                            />
                            <ModalTextField
                                sx={{ flex: 1 }}
                                select
                                required
                                // fullWidth
                                flex={1}
                                size='small'
                                label="Hypoallergenic"
                                name="hypoallergenic"
                                defaultValue={newPetData?.hypoallergenic || ''} >
                                <UiMenuItem value={true}>Yes</UiMenuItem>
                                <UiMenuItem value={false}>No</UiMenuItem>
                            </ModalTextField>
                        </UiFlexColToRowFrom>

                        <ModalTextField
                            defaultValue={newPetData?.DietaryRestrictions || ''}
                            size='small'
                            fullWidth
                            label="Dietary Restrictions"
                            name="DietaryRestrictions"
                            autoComplete="DietaryRestrictions"
                        />

                        <ModalTextField
                            size='small'
                            defaultValue={newPetData?.bio || ''}
                            fullWidth
                            multiline
                            maxRows={3}
                            label=" Pet Bio"
                            name="bio"
                            autoComplete="bio"
                        />


                        <UiBox my={2}>
                            <UiAlertCollapse show={showAlert} >{error}</UiAlertCollapse>
                        </UiBox>
                        <UiFlexColToRowFrom gap={2} w100 justifyContent='center' >
                            <AppButton type="submit" variant="contained" disabled={loading}>
                                {loading ? 'Loading' : 'Add Pet'}
                            </AppButton>
                            <AppButton variant="outlined" onClick={handleClose}>Close</AppButton>
                        </UiFlexColToRowFrom>
                        <UiBox my={2} >

                            {/* <UiFlexRow justifyContent='center' >
                            <TextLink href="#" variant="body2" onClick={handleGoToLogin}>
                                Already have an account? Login
                            </TextLink>
                        </UiFlexRow> */}
                        </UiBox>
                    </UiBox>
                </UiFlexCol>
            </UiBox>
        </UiBox >
    )
}

