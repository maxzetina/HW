import '../css/Home.css';

import AddAssignmentPanel from './AddAssignmentPanel';
import AddClassPanel from './AddClassPanel';
import Classes from './Classes';
import { CommandBar, Stack } from '@fluentui/react';
// import DeleteClassPanel from './DeleteClassPanel.js';
import DeleteClassDialog from './DeleteClassDialog';
import EditClassPanel from './EditClassPanel';
import { useBoolean } from '@fluentui/react-hooks';

const Home = () => {
    const [addClassIsOpen, { setTrue: openAddClassPanel, setFalse: dismissAddClassPanel }] = useBoolean(false);
    const [editClassIsOpen, { setTrue: openEditClassPanel, setFalse: dismissEditClassPanel }] = useBoolean(false);
    // const [deleteClassIsOpen, { setTrue: openDeleteClassPanel, setFalse: dismissDeleteClassPanel }] = useBoolean(false);
    const [deleteClassHideDialog, { toggle: deleteClassToggleHideDialog }] = useBoolean(true);
    const [addAssignmentIsOpen, { setTrue: openAddAssignmentPanel, setFalse: dismissAddAssignmentPanel }] = useBoolean(false);

    const verticalGapStackTokens = {
        childrenGap: 10,
        padding: 10
    };

    const _items = [
        {
          key: 'newItem',
          text: 'New',
          iconProps: { iconName: 'Add' },
          subMenuProps: {
            items: [
              {
                key: 'newClass',
                text: 'Class',
                iconProps: { iconName: 'ClassroomLogo' },
                onClick: () => openAddClassPanel()
              },
              {
                key: 'newAssignment',
                text: 'Assignment',
                iconProps: { iconName: 'WorkItem' },
                onClick: () => openAddAssignmentPanel()
              },
            ],
          },
        },
        { key: 'edit', text: 'Edit', onClick: () => openEditClassPanel(), iconProps: { iconName: 'Edit' } },
        // { key: 'delete', text: 'Delete', onClick: () => openDeleteClassPanel(), iconProps: { iconName: 'Delete' } },
        { key: 'delete', text: 'Delete', onClick: () => deleteClassToggleHideDialog(), iconProps: { iconName: 'Delete' } },
    ];
    
    return (
        <Stack tokens={verticalGapStackTokens}>
            <Stack className='container' horizontal horizontalAlign='space-between' style={{paddingTop: 16}}>
                <h1 className='roboto-font'>Classes</h1>
                <CommandBar items={_items} />
                {/* <Stack vertical verticalAlign='center'><AddClassPanel isOpen={isOpen} dismissPanel={dismissPanel}/></Stack> */}
            </Stack>
            <Stack>
                <AddClassPanel isOpen={addClassIsOpen} dismissPanel={dismissAddClassPanel}/>
                <EditClassPanel isOpen={editClassIsOpen} dismissPanel={dismissEditClassPanel}/>
                {/* <DeleteClassPanel isOpen={deleteClassIsOpen} dismissPanel={dismissDeleteClassPanel}/> */}
                <DeleteClassDialog hideDialog={deleteClassHideDialog} toggleHideDialog={deleteClassToggleHideDialog}/>
                <AddAssignmentPanel isOpen={addAssignmentIsOpen} dismissPanel={dismissAddAssignmentPanel} />
            </Stack>
            <Classes/>
       </Stack>
    );
}

export default Home;