import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAppError, closeModal, MODAL_COMPONENTS } from '../../redux/reducers/appSlice';
import { setSelectedPet } from '../../redux/reducers/petSlice';
import FontAlt from '../ui/myAppUi/TextFontAlt';
import UiDialog from '../ui/uiKit/componentsUi/UiDialog';
import UiDialogContent from '../ui/uiKit/componentsUi/UiDialogContet';
import UiBox from '../ui/uiKit/layouts/UiBox';
import { UiFlexCol } from '../ui/uiKit/layouts/UiFlex';


export default function Modal() {
  const { isOpen, selectedModal } = useSelector(state => state.app.modal)
  const {loading} = useSelector(state => state.app)
  const component = selectedModal && MODAL_COMPONENTS[selectedModal];
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(closeModal());
  };

  const unsetSelectedPet = () => {
    dispatch(setSelectedPet(null))
  }

  return (
    !loading ? (
      <UiDialog open={isOpen}
      onClose={handleClose}
      TransitionProps={{ onExited: unsetSelectedPet }}
      >
      <UiBox sx={{ 
              borderStyle: 'solid',
              borderWidth: '2px',
              borderColor: 'secondary.dark',
              borderRadius: '5px',
              overflow: 'hidden'
        }}>

          
          {component} 
      </UiBox>
      </UiDialog>

    ):(

      <UiDialog open={isOpen}
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}
      >
      <UiFlexCol alignItems='center' justifyContent='center'
        sx={{
          height: '150px',
          width: '150px',
          backgroundImage: "url('./assets/walking-dog.gif')",
          backgroundSize: '200px 200px',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom center',
          borderRadius: '80px',
          overflow: 'hidden',
          border: '5px solid black'
        }}
      >
        <FontAlt bold mt='60px' variant='h4' >Loading</FontAlt>
      </UiFlexCol>
      </UiDialog>

  ))
}

