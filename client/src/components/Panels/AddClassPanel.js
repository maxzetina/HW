import { Checkbox, DefaultButton, Panel, PrimaryButton, Stack, TextField } from '@fluentui/react';
import { post } from '../../utilities.js';
import { useState } from 'react';

const buttonStyles = { root: { marginRight: 8 } };
const verticalGapStackTokens = {
  childrenGap: 20,
  padding: 10,
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

  const logLateDays = (event) => {
    setLateDays(event.target.value);
  };
  
  const logMissableRecs = (event) => {
    setMissableRecs(event.target.value);
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
            {/* <Checkbox label="Lectures Recorded:" onChange={lecs} boxSide='end' checked={lecturesRecorded} />
            <Checkbox label="Can Drop PSET?" onChange={dropPSET} boxSide='end' checked={psetDroppable} /> */}
            {/* <div>
              <label>Late Days:&nbsp;</label>
              <input type="number" style={{textAlign: 'center', width: '4em'}} value={lateDays} onChange={logLateDays}></input>
            </div>
            <div>
              <label>Missable Recs:&nbsp;</label>
              <input type="number" style={{textAlign: 'center', width: '4em'}} value={missableRecs} onChange={logMissableRecs}></input>
            </div> */}
            <Stack horizontal horizontalAlign='space-evenly'>
              <TextField
                label="Late Days"
                value={lateDays}
                onChange={logLateDays}
                styles={{ fieldGroup: { width: 65 } }}
                style={{textAlign: 'center'}}
              />
              <TextField
                label="Missable Recs"
                value={missableRecs}
                onChange={logMissableRecs}
                styles={{ fieldGroup: { width: 90 } }}
                style={{textAlign: 'center'}}
              />
            </Stack>
            <br/>
            <Checkbox label="Lectures Recorded:" onChange={lecs} boxSide='end' checked={lecturesRecorded} />
            <Checkbox label="Can Drop PSET?" onChange={dropPSET} boxSide='end' checked={psetDroppable} />
          </Stack>
        </Panel>
    </Stack>
  );
};

export default AddClassPanel;