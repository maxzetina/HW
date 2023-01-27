import { Checkbox, DefaultButton, Panel, PrimaryButton, SpinButton, Stack } from '@fluentui/react';
import ClassDropdown from '../Classes/ClassDropdown.js';
import { get, post } from '../../utilities.js';
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

const EditClassPanel = (props) => {
    const [selectedClass, setSelectedClass] = useState();

    const [lecturesRecorded, setLecturesRecorded] = useState(false);
    const [lateDays, setLateDays] = useState(0);
    const [missableRecs, setMissableRecs] = useState(0);
    const [psetDroppable, setPsetDroppable] = useState(false);
    const [psetDropped, setPsetDropped] = useState(false);

    const getClassData = (id) => {
      get("/api/getClass", {id: id}).then((course) => {
        setLecturesRecorded(course.lecturesRecorded);
        setLateDays(course.lateDays);
        setMissableRecs(course.missableRecsLeft);
        setPsetDroppable(course.psetDroppable);
        setPsetDropped(course.psetDropped);
      });
    };

    const footer = () => 
      <div>
          <PrimaryButton text="Save" onClick={editClass} styles={buttonStyles} />
          <DefaultButton text="Cancel" onClick={reset} />
      </div>;

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
      if(psetDroppable){setPsetDropped(false)};
      setPsetDroppable(!psetDroppable);
    };

    const droppedPSET = () => {
      setPsetDropped(!psetDropped);
    };

    const onChange = (event, item) => {
        setSelectedClass(item.key);
        getClassData(item.key);
    };

    const reset = () => {
      setSelectedClass(null);
      setLecturesRecorded(false);
      setLateDays(0);
      setMissableRecs(0);
      setLecturesRecorded(false);
      setPsetDroppable(false);
      setPsetDropped(false);

      props.dismissPanel();
    };

    const editClass = () => {
      let updates = {
          id: selectedClass,
          lecturesRecorded: lecturesRecorded,
          lateDays: lateDays,
          missableRecsLeft: missableRecs,
          psetDroppable: psetDroppable,
          psetDropped: psetDropped
        }
        post("/api/editClass", updates);
        reset();
    };

    return (
        <Stack>
            <Panel
                isOpen={props.isOpen}
                onDismiss={reset}
                headerText="Edit Class"
                closeButtonAriaLabel="Close"
                onRenderFooterContent={footer}
                isFooterAtBottom={true}>

                <hr></hr>
                <Stack tokens={verticalGapStackTokens}>
                    <ClassDropdown selectedClass={selectedClass} onChange={onChange} />

                    {selectedClass && 
                    <Stack tokens={verticalGapStackTokens}>
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
                        {psetDroppable && <Checkbox label="Dropped PSET?" onChange={droppedPSET} boxSide='end' checked={psetDropped} />}
                    </Stack>
                    }
                </Stack>
            </Panel>
        </Stack>
    );
};

export default EditClassPanel;