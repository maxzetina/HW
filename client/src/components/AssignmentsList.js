import { Check, DefaultButton, List, PrimaryButton, Stack } from '@fluentui/react';
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
  chevron: {
    alignSelf: 'center',
    marginLeft: 10,
    color: palette.neutralTertiary,
    fontSize: fonts.large.fontSize,
    flexShrink: 0,
  },
});


const AssignmentsList = (props) => {
    const [assignments, setAssignments] = useState([]);
    const [checkedMap, setCheckedMap] = useState(new Map())

    useEffect(() => {
        get("/api/assignments").then((x) => {
            setAssignments(x)
        });
    }, [assignments]);

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
            post("/api/deleteAssignmentsFromClasses", {className: current.class, assignment: assignment})
        }
        reset();
    }

    const onRenderCell = (x, index) => {
        let pad = "0px";
        if(props.deleteMode){pad = "16px"};
        const options = {weekday: 'short', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'};

        let textColor = 'black';
        if(x.quiz){textColor = '#2b579a'}
        return (
            <Stack horizontal verticalAlign="center" className={classNames.itemCell} data-is-focusable={true}>
                {props.deleteMode && <div onClick={() => setCheckedMap(new Map(checkedMap.set(x._id, [x, !checkedMap.get(x._id)])))}><Check checked={checkedMap.get(x._id)}/> </div>}
                <Stack className={classNames.itemContent}>
                    <div style={{paddingLeft: pad}}>
                        <Stack horizontal horizontalAlign='space-between' className={classNames.itemName}>
                            <div style={{color: textColor}}>{x.name}</div>
                            <div style={{color: 'red', fontWeight: "bold"}}>
                                {new Date(x.dueDate).toLocaleString("en-US", options)}
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
        </div>
    );
};

export default AssignmentsList;
