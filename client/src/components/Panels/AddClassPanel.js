import { Checkbox, DefaultButton, Panel, PrimaryButton, SpinButton, Stack, TextField } from '@fluentui/react';
import { post } from '../../utilities.js';
import { useState } from 'react';

const buttonStyles = { root: { marginRight: 8 } };
const verticalGapStackTokens = {
  childrenGap: 20,
  padding: 10,
};
const upArrowButtonStyles = {
  rootChecked: {
    backgroundColor: 'green',
  },
  rootPressed: {
    backgroundColor: 'green',
  },
};

const downArrowButtonStyles = {
  rootChecked: {
    backgroundColor: 'red',
  },
  rootPressed: {
    backgroundColor: 'red',
  },
};

const AddClassPanel = (props) => {
  // const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
  const [name, setName] = useState('');
  const [lecturesRecorded, setLecturesRecorded] = useState(false);
  const [lateDays, setLateDays] = useState(0);
  const [missableRecs, setMissableRecs] = useState(0);
  const [psetDroppable, setPsetDroppable] = useState(false);

  const footer = () => 
      <div>
        <PrimaryButton text="Save" onClick={addClass} styles={buttonStyles} />
        <DefaultButton text="Cancel" onClick={reset} />
      </div>;

  const classNumber = (event) => {
    setName(event.target.value);
  };

  const lecs = () => {
    setLecturesRecorded(!lecturesRecorded);
  };

  const logLateDays = (event, value) => {
    setLateDays(value);
  };
  
  const logMissableRecs = (event, value) => {
    setMissableRecs(value);
  };

  const dropPSET = () => {
    setPsetDroppable(!psetDroppable);
  };

  const reset = () => {
    setName('');
    setLecturesRecorded(false);
    setLateDays(0);
    setMissableRecs(0);
    setLecturesRecorded(false);
    setPsetDroppable(false);
    
    props.dismissPanel();
  };

  const addClass = () => {
    let newClass = {
      name: name,
      lecturesRecorded: lecturesRecorded,
      lateDays: lateDays,
      missableRecsLeft: missableRecs,
      psetDroppable: psetDroppable,
    };
    post("/api/addClass", newClass);
    reset();
  };

  return (
    <Stack>
        {/* <PrimaryButton text="Add Class" onClick={openPanel} /> */}
        <Panel
            isOpen={props.isOpen}
            onDismiss={reset}
            headerText="Add Class"
            closeButtonAriaLabel="Close"
            onRenderFooterContent={footer}
            isFooterAtBottom={true}>

          <hr></hr>
          <Stack tokens={verticalGapStackTokens}>
            <TextField label="Number" required value={name} onChange={classNumber} />
            <SpinButton
              label="Late Days:"
              iconProps={{iconName: 'DateTime'}}
              value={lateDays}
              min={0}
              max={100}
              step={1}
              onChange={logLateDays}
              incrementButtonAriaLabel="Increase value by 1"
              decrementButtonAriaLabel="Decrease value by 1"
              styles={{ spinButtonWrapper: { width: 75 }}}
              upArrowButtonStyles={upArrowButtonStyles}
              downArrowButtonStyles={downArrowButtonStyles}
            />
            <SpinButton
              label="Missable Recs:"
              value={missableRecs}
              min={0}
              max={100}
              step={1}
              onChange={logMissableRecs}
              incrementButtonAriaLabel="Increase value by 1"
              decrementButtonAriaLabel="Decrease value by 1"
              styles={{ spinButtonWrapper: { width: 75 }}}
              upArrowButtonStyles={upArrowButtonStyles}
              downArrowButtonStyles={downArrowButtonStyles}
            />
            <Checkbox label="Lectures Recorded:" onChange={lecs} boxSide='end' checked={lecturesRecorded} />
            <Checkbox label="Can Drop PSET?" onChange={dropPSET} boxSide='end' checked={psetDroppable} />
          </Stack>
        </Panel>
    </Stack>
  );
};

export default AddClassPanel;