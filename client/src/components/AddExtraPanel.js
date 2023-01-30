import { Checkbox, DefaultButton, Panel, PrimaryButton, Stack, TextField, DatePicker, defaultDatePickerStrings, TimePicker } from '@fluentui/react';
import { post } from '../utilities.js';
import { useState } from 'react';

const buttonStyles = { root: { marginRight: 8 } };
const verticalGapStackTokens = {
  childrenGap: 20,
  padding: 10,
};
const timePickerStyles = {
    optionsContainerWrapper: {
      height: '500px',
    },
    root: {
      width: '50%',
    },
  };

const AddExtraPanel = (props) => {
    const [name, setName] = useState('');
    const [dueDate, setDueDate] = useState();
    const [addTime, setAddTime] = useState(false);
    const [dueTime, setDueTime] = useState();

    const footer = () => 
        <div>
            <PrimaryButton text="Save" onClick={addExtra} styles={buttonStyles} />
            <DefaultButton text="Cancel" onClick={reset} />
        </div>;

    const assignmentName = (event) => {
        setName(event.target.value);
    };

    const reset = () => {
        setName('');
        setDueDate();
        setAddTime(false);
        setDueTime();
        props.dismissPanel();
    };

    const addExtra = () => {
        let d;
        if(addTime && dueTime){
            d = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate(), dueTime.getHours(), dueTime.getMinutes())
        }
        else{
            d = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate())
        }
        post("/api/addExtra", { quiz: false, name: name, dueDate: d, className: "Extra" });
        reset();
    };

    const addingTime = () => {
        if(addTime){setDueTime()};
        setAddTime(!addTime);
    }
    const changeTime = (_, time) => setDueTime(time);


    return (
        <Stack>
            <Panel
                isOpen={props.isOpen}
                onDismiss={reset}
                headerText="Add Extra"
                closeButtonAriaLabel="Close"
                onRenderFooterContent={footer}
                isFooterAtBottom={true}>

                <hr></hr>
                <Stack tokens={verticalGapStackTokens}>
                    <TextField label="For" defaultValue='Extra' readOnly />
                    <TextField label="Name" value={name} onChange={assignmentName} />
                    <DatePicker
                        placeholder="Select a date"
                        label="Due Date:"
                        ariaLabel="Select a date"
                        strings={defaultDatePickerStrings}
                        showGoToToday={true}
                        onSelectDate={(date) => setDueDate(date)}
                    />
                    <Checkbox label="Add Time" onChange={addingTime} boxSide='end' checked={addTime} />
                    {addTime &&
                        <TimePicker
                            styles={timePickerStyles}
                            useHour12
                            allowFreeform
                            autoComplete="on"
                            label={'Due at:'}
                            onChange={changeTime}
                            useComboBoxAsMenuWidth
                            increments={60}
                        />
                    }
                </Stack>
            </Panel>
        </Stack>
    );
};

export default AddExtraPanel;