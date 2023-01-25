import ClassDropdown from './ClassDropdown.js';
import { DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton } from '@fluentui/react';
import { post } from '../utilities.js';
import { useState } from 'react';

const modelProps = {
  isBlocking: true,
  styles: { main: { maxWidth: 450 } },
};
const dialogContentProps = {
  type: DialogType.largeHeader,
  title: 'Delete Class',
};

// const dropdownStyles = { dropdown: { width: 300 } };

const DeleteClassDialog = (props) => {
    // const [classes, setClasses] = useState([])

    // useEffect(() => {
    //     get("/api/classes").then((x) => {
    //         let options = []
    //         for(let i = 0; i < x.length; i++){
    //             options.push({key: x[i]._id, text: x[i].name})
    //         }
    //         setClasses(options)            
    //     });
    // }, [classes]);
    
    const [selectedClass, setSelectedClass] = useState();

    const onChange = (event, item) => {
        setSelectedClass(item.key);
    };

    const reset = () => {
        setSelectedClass(undefined);
        props.toggleHideDialog();
    };

    const deleteClass = () => {
        post("/api/deleteClass", {id: selectedClass});
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
                {/* <Dropdown
                    label="Class"
                    selectedKey={selectedClass ? selectedClass.key : undefined}
                    onChange={onChange}
                    placeholder="Select a class"
                    options={classes}
                    styles={dropdownStyles}
                /> */}
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