import ClassDropdown from '../Classes/ClassDropdown.js';
import { DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton } from '@fluentui/react';
import { post } from '../../utilities.js';
import { useState } from 'react';

const modelProps = {
  isBlocking: true,
  styles: { main: { maxWidth: 450 } },
};
const dialogContentProps = {
  type: DialogType.largeHeader,
  title: 'Delete Class',
};

const DeleteClassDialog = (props) => {
    const [selectedClass, setSelectedClass] = useState();

    const onChange = (event, item) => {
        setSelectedClass(item);
    };

    const reset = () => {
        setSelectedClass(undefined);
        props.toggleHideDialog();
    };

    const deleteClass = () => {
        post("/api/deleteClass", {id: selectedClass.key});
        post("/api/deleteClassAssignments", {className: selectedClass.text})
        reset();
    };

    return (
        <>
            <Dialog
                hidden={props.hideDialog}
                onDismiss={props.toggleHideDialog}
                dialogContentProps={dialogContentProps}
                modalProps={modelProps}
            >
                <ClassDropdown selectedClass={selectedClass} onChange={onChange} />

                <DialogFooter>
                    <PrimaryButton onClick={deleteClass} text="Delete" />
                    <DefaultButton onClick={reset} text="Cancel" />
                </DialogFooter>
            </Dialog>
        </>
    );
};

export default DeleteClassDialog;