import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, MODAL_COMPONENTS } from '../../redux/reducers/appSlice';
import UiDialog from '../ui/uiKit/componentsUi/UiDialog';
import UiBox from '../ui/uiKit/layouts/UiBox';


export default function Modal() {
  const { isOpen, selectedModal } = useSelector(state => state.app.modal)
  const component = selectedModal && MODAL_COMPONENTS[selectedModal];
  const dispatch = useDispatch()
  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <UiDialog open={isOpen} onClose={handleClose}>
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
  );
}

