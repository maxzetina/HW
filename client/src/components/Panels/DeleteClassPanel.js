import { Checkbox, DefaultButton, Panel, PrimaryButton, Stack, TextField, Dropdown } from '@fluentui/react';

import { get, post } from '../../utilities.js';
import { useBoolean } from '@fluentui/react-hooks';
import { useEffect, useState } from 'react';

const buttonStyles = { root: { marginRight: 8 } };
const verticalGapStackTokens = {
  childrenGap: 20,
  padding: 10,
};
const dropdownStyles = { dropdown: { width: 300 } };

const DeleteClassPanel = (props) => {
    const [classes, setClasses] = useState([])

    useEffect(() => {
        get("/api/classes").then((x) => {
            let options = []
            for(let i = 0; i < x.length; i++){
                options.push({key: x[i]._id, text: x[i].name})
            }
            setClasses(options)            
        });
    }, [classes]);

    const [selectedClass, setSelectedClass] = useState();

    const onChange = (event, item) => {
        setSelectedClass(item.key);
    };


    const footer = () => 
        <div>
            <PrimaryButton text="Delete" onClick={deleteClass} styles={buttonStyles} />
            <DefaultButton text="Cancel" onClick={reset} />
        </div>;

    const reset = () => {
        setSelectedClass(undefined);
        props.dismissPanel();
    }

    const deleteClass = () => {
        post("/api/deleteClass", {id: selectedClass});
        reset();
    }


    return (
        <Stack>
            <Panel
                isOpen={props.isOpen}
                onDismiss={reset}
                headerText="Delete Class"
                closeButtonAriaLabel="Close"
                onRenderFooterContent={footer}
                isFooterAtBottom={true}>

                <hr></hr>
                <Stack tokens={verticalGapStackTokens}>
                        <Dropdown
                            label="Class"
                            selectedKey={selectedClass ? selectedClass.key : undefined}
                            onChange={onChange}
                            placeholder="Select a class"
                            options={classes}
                            styles={dropdownStyles}
                        />
                </Stack>
            </Panel>
        </Stack>
    );
};

export default DeleteClassPanel;