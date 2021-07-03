import React from 'react';
import Modal from '@material-ui/core/Modal';
import EditForm from './EditForm';
import DeleteForm from './DeleteForm';
import AddForm from './AddForm';
import CorrespondenceTemplate from './CorrespondenceTemplate'


function FormModel({open, handleClose, mode}) {
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                { mode === "edit" ?
                    <EditForm handleClose={handleClose} />
                     :
                     mode === "delete" ?
                     <DeleteForm handleClose={handleClose} />
                     :
                     mode === "add" ?
                     <AddForm handleClose={handleClose} />
                     :
                     mode === "template" ?
                     <CorrespondenceTemplate handleClose={handleClose} />
                     : <></>
                }
            </Modal>
        </>
    )
}

export default FormModel;
