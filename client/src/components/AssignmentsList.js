import { Check, DefaultButton, List, PrimaryButton, Spinner, SpinnerSize, Stack } from '@fluentui/react';
import { get, post } from '../utilities';
import { getFocusStyle, getTheme, mergeStyleSets } from '@fluentui/react/lib/Styling';
import { useEffect, useState } from "react";

const theme = getTheme();
const { palette, semanticColors, fonts } = theme;

const classNames = mergeStyleSets({
  itemCell: [
    getFocusStyle(theme, { inset: -1 }),
    {
      minHeight: 54,
      padding: 10,
      boxSizing: 'border-box',
      borderBottom: `1px solid ${semanticColors.bodyDivider}`,
      display: 'flex',
      selectors: {
        '&:hover': { background: palette.neutralLight },
      },
    },
  ],
  itemImage: {
    flexShrink: 0,
  },
  itemContent: {
    marginLeft: 10,
    overflow: 'hidden',
    flexGrow: 1,
  },
  itemName: [
    fonts.xLarge,
    {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  ],
  itemIndex: {
    fontSize: fonts.small.fontSize,
    color: palette.neutralTertiary,
    marginBottom: 10,
  },
});


const AssignmentsList = (props) => {
    const [loading, setLoading] = useState(true);
    const [assignments, setAssignments] = useState([]);
    const [checkedMap, setCheckedMap] = useState(new Map())

    useEffect(() => {
        get("/api/assignments").then((x) => {
            if(props.isSorted){
                setAssignments(x.slice().sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)))
            }
            else{
                setAssignments(x);
            }
            setLoading(false);
        });
    }, [props.isSorted, assignments]);

    const reset = () => {
        setCheckedMap(new Map());
        props.disableDeleteMode();
    }

    const deleteAssignments = () => {
        const assignmentIDs = [];
        let assignmentsToDelete = [];
        for (let [key, value] of checkedMap) {
            if(value[1]){
                assignmentIDs.push(key)
                assignmentsToDelete.push(value[0])
            }
        }

        post("/api/deleteAssignments", {assignmentIDs: assignmentIDs});
        for(let i = 0; i < assignmentsToDelete.length; i++){
            let current = assignmentsToDelete[i];
            let assignment = {quiz: current.quiz, name: current.name, dueDate: current.dueDate} 
            if(current.class !== 'Extra'){
                post("/api/deleteAssignmentsFromClasses", {className: current.class, assignment: assignment})
            }
        }
        reset();
    }


    const onRenderCell = (x, index) => {
        let pad = "0px";
        if(props.deleteMode){pad = "16px"};

        let opt = {weekday: 'short', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'};
        if(!(new Date(x.dueDate).getHours())){
            opt = {weekday: 'short', month: 'numeric', day: 'numeric'};
        };
        const editMap = () => {
            if (checkedMap.get(x._id)){
                checkedMap.delete(x._id);
                setCheckedMap(new Map(checkedMap))
            }
            else {
                setCheckedMap(new Map(checkedMap.set(x._id, [x, true])))
            }
        };

        let textColor = 'black';
        if(x.quiz){textColor = '#2b579a'}
        return (
            <Stack horizontal verticalAlign="center" className={classNames.itemCell} data-is-focusable={true}>
                {props.deleteMode && <div onClick={editMap}><Check checked={checkedMap.get(x._id)}/> </div>}
                <Stack className={classNames.itemContent}>
                    <div style={{paddingLeft: pad}}>
                        <Stack horizontal horizontalAlign='space-between' className={classNames.itemName}>
                            <div style={{color: textColor}}>{x.name}</div>
                            <div style={{color: 'red', fontWeight: "bold"}}>
                                {new Date(x.dueDate).toLocaleString("en-US", opt)}
                            </div>
                        </Stack>
                        <div className={classNames.itemIndex}>{x.class}</div>
                    </div>
                </Stack>
            </Stack>
        )
    };

    return (
        <div>
            {loading ? <Spinner label="Loading Assignments..." size={SpinnerSize.large} /> :
                <Stack>
                    <List items={assignments} onRenderCell={onRenderCell}></List>
                    <br/>
                    {props.deleteMode && 
                        <div style={{display: "flex", justifyContent: 'right'}}>
                            <div style={{paddingRight: "8px"}}>
                                <PrimaryButton text="Save" onClick={deleteAssignments}/> 
                            </div>
                            <div>
                                <DefaultButton text="Cancel" onClick={reset} /> 
                            </div>
                        </div>
                    }
                </Stack>
            }
        </div>
    );
};

export default AssignmentsList;
