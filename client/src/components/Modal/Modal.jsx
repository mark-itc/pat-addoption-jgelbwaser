import * as React from 'react';
import UiDiv from '../ui/uiKit/layouts/UiDiv';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, MODAL_COMPONENTS, openLoginModal } from '../../redux/reducers/modalSlice';
import UiDialog from '../ui/uiKit/componentsUi/UiDialog';
import UiBox from '../ui/uiKit/layouts/UiBox';
import UiCollapse from '../ui/uiKit/muiTransitions/UiCollapse';


export default function Modal() {
  const { isOpen, selectedModal } = useSelector(state => state.modal)
  const component = selectedModal && MODAL_COMPONENTS[selectedModal];

  const dispatch = useDispatch()
  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <UiDialog open={isOpen} onClose={handleClose}>
      <UiBox p={3}>
        {component}
      </UiBox>
    </UiDialog>
  );
}

