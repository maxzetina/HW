import { Checkbox, DefaultButton, Panel, PrimaryButton, Stack, TextField } from '@fluentui/react';
import ClassDropdown from './ClassDropdown.js';
import { get, post } from '../utilities.js';
import { useState } from 'react';

const buttonStyles = { root: { marginRight: 8 } };
const verticalGapStackTokens = {
  childrenGap: 20,
  padding: 10,
};
// const dropdownStyles = { dropdown: { width: 300 } };

const EditClassPanel = (props) => {
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

    const logLateDays = (event) => {
      setLateDays(event.target.value);
    };
    
    const logMissableRecs = (event) => {
      setMissableRecs(event.target.value);
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
                    {/* <Dropdown
                        label="Class"
                        selectedKey={selectedClass ? selectedClass.key : undefined}
                        onChange={onChange}
                        placeholder="Select a class"
                        options={classes}
                        styles={dropdownStyles}
                    /> */}
                    <ClassDropdown selectedClass={selectedClass} onChange={onChange} />

                    {selectedClass && 
                    <Stack tokens={verticalGapStackTokens}>
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
                        {psetDroppable && <Checkbox label="Dropped PSET?" onChange={droppedPSET} boxSide='end' checked={psetDropped} />}
                    </Stack>
                    }
                </Stack>
            </Panel>
        </Stack>
    );
};

export default EditClassPanel;