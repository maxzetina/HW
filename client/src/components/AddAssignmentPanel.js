import { Checkbox, DefaultButton, Panel, PrimaryButton, Stack, TextField, Dropdown, DatePicker, defaultDatePickerStrings, TimePicker } from '@fluentui/react';

import { get, post } from '../utilities.js';
import { useEffect, useState } from 'react';
import ClassDropdown from './ClassDropdown.js';

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

const AddAssignmentPanel = (props) => {
    const [selectedClass, setSelectedClass] = useState();

    const [name, setName] = useState('');
    const [isQuiz, setIsQuiz] = useState(false);
    const [dueDate, setDueDate] = useState();
    const [dueTime, setDueTime] = useState();

    const footer = () => 
        <div>
            <PrimaryButton text="Save" onClick={addAssignment} styles={buttonStyles} />
            <DefaultButton text="Cancel" onClick={reset} />
        </div>;

    const assignmentName = (event) => {
        setName(event.target.value);
    };

    const quizStatus = () => {
        setIsQuiz(!isQuiz);
    };

    const onChange = (event, item) => {
        setSelectedClass(item.key);
    };

    const reset = () => {
        setSelectedClass(undefined);
        setName('');
        setIsQuiz(false);
        setDueDate();
        setDueTime();
        props.dismissPanel();
    };

    const addAssignment = () => {
        const d = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate(), dueTime.getHours(), dueTime.getMinutes())
        const newAssignment = {quiz: isQuiz, name: name, dueDate: d};
        post("/api/addAssignment", {id: selectedClass, assignment: newAssignment});
        reset();
    };

    const changeTime = (_, time) => setDueTime(time);


    return (
        <Stack>
            <Panel
                isOpen={props.isOpen}
                onDismiss={reset}
                headerText="Add Assignment"
                closeButtonAriaLabel="Close"
                onRenderFooterContent={footer}
                isFooterAtBottom={true}>

                <hr></hr>
                <Stack>
                    <ClassDropdown selectedClass={selectedClass} onChange={onChange} />
                    {selectedClass &&
                        <Stack tokens={verticalGapStackTokens}>
                            <TextField label="Name" value={name} onChange={assignmentName} />
                            <Checkbox label="Quiz?" onChange={quizStatus} boxSide='end' checked={isQuiz} />
                            <DatePicker
                                placeholder="Select a date"
                                label="Due Date:"
                                ariaLabel="Select a date"
                                strings={defaultDatePickerStrings}
                                showGoToToday={true}
                                onSelectDate={(date) => setDueDate(date)}
                            />
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
                        </Stack>
                    }
                </Stack>
            </Panel>
        </Stack>
    );
};

export default AddAssignmentPanel;