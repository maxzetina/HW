import '../css/Home.css';

import AddAssignmentPanel from './Panels/AddAssignmentPanel';
import AssignmentsList from './AssignmentsList.js';
import { CommandBar, Stack } from '@fluentui/react'; 
import { useState } from 'react';
import { useBoolean } from '@fluentui/react-hooks';

const verticalGapStackTokens = {
    childrenGap: 10,
    padding: 10
};

const Assignments = () => {
    const [deleteMode, { setTrue: activateDeleteMode, setFalse: disableDeleteMode }] = useBoolean(false);
    const [addAssignmentIsOpen, { setTrue: openAddAssignmentPanel, setFalse: dismissAddAssignmentPanel }] = useBoolean(false);
    const [assignmentsSorted, setAssignmentsSorted] = useState(false);

    const _items = [
        {
          key: 'newAssignment',
          text: 'New',
          iconProps: { iconName: 'Add' },
          onClick: () => openAddAssignmentPanel()
        },
        { key: 'sort', text: 'Sort', onClick: () => setAssignmentsSorted(!assignmentsSorted), iconProps: { iconName: 'SortLines' } },
        { key: 'delete', text: 'Delete', onClick: () => activateDeleteMode(), iconProps: { iconName: 'Delete' } },
    ];

    return (
        <Stack tokens={verticalGapStackTokens}>
             <Stack className='container' horizontal horizontalAlign='space-between' style={{paddingTop: 16}}>
                <h1 className='roboto-font'>Assignments</h1>
                <CommandBar items={_items} />
            </Stack>
            <Stack>
                <AddAssignmentPanel isOpen={addAssignmentIsOpen} dismissPanel={dismissAddAssignmentPanel} />
            </Stack>
            <Stack className='container'>
                <AssignmentsList deleteMode={deleteMode} disableDeleteMode={disableDeleteMode} isSorted={assignmentsSorted} />
            </Stack>
        </Stack>
    )
}

export default Assignments;