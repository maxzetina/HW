import '../css/Home.css';

import AddAssignmentPanel from './Panels/AddAssignmentPanel';
import AddClassPanel from './Panels/AddClassPanel';
import AddExtraPanel from './AddExtraPanel';
import Classes from './Classes/Classes';
import { CommandBar, CommandBarButton, Stack } from '@fluentui/react';
import DeleteClassDialog from './Panels/DeleteClassDialog';
import EditClassPanel from './Panels/EditClassPanel';
import Extra from './Extra';
import { getTheme } from '@fluentui/react/lib/Styling';
import { useBoolean } from '@fluentui/react-hooks';

const theme = getTheme();
const extraButtonStyles = {
  label: { fontSize: 14 },
  icon: { color: theme.palette.red },
  iconHovered: { color: theme.palette.redDark },
};

const Home = () => {
    const [addClassIsOpen, { setTrue: openAddClassPanel, setFalse: dismissAddClassPanel }] = useBoolean(false);
    const [editClassIsOpen, { setTrue: openEditClassPanel, setFalse: dismissEditClassPanel }] = useBoolean(false);
    const [deleteClassHideDialog, { toggle: deleteClassToggleHideDialog }] = useBoolean(true);
    const [addAssignmentIsOpen, { setTrue: openAddAssignmentPanel, setFalse: dismissAddAssignmentPanel }] = useBoolean(false);
    const [addExtraIsOpen, { setTrue: openAddExtraPanel, setFalse: dismissAddExtraPanel }] = useBoolean(false);

    const verticalGapStackTokens = {
        childrenGap: 10,
        padding: 10
    };

    const classesItems = [
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
        { key: 'delete', text: 'Delete', onClick: () => deleteClassToggleHideDialog(), iconProps: { iconName: 'Delete' } },
    ];

    const extrasItems = [{ key: 'newItem', text: 'New', iconProps: { iconName: 'Add' } }];
    const CustomButton = (props) => {
      return <CommandBarButton {...props} onClick={openAddExtraPanel} styles={extraButtonStyles} />;
    };
    
    return (
        <Stack tokens={verticalGapStackTokens}>
            <Stack className='container' horizontal horizontalAlign='space-between' style={{paddingTop: 16}}>
                <h1 className='roboto-font'>Classes</h1>
                <CommandBar items={classesItems} />
            </Stack>
            <Stack>
                <AddClassPanel isOpen={addClassIsOpen} dismissPanel={dismissAddClassPanel}/>
                <EditClassPanel isOpen={editClassIsOpen} dismissPanel={dismissEditClassPanel}/>
                <DeleteClassDialog hideDialog={deleteClassHideDialog} toggleHideDialog={deleteClassToggleHideDialog}/>
                <AddAssignmentPanel isOpen={addAssignmentIsOpen} dismissPanel={dismissAddAssignmentPanel} />
                <AddExtraPanel isOpen={addExtraIsOpen} dismissPanel={dismissAddExtraPanel} />
            </Stack>
            <Classes/>
            <br/>
            <Stack className='container' horizontal horizontalAlign='space-between' style={{paddingTop: 16}}>
                <h1 className='roboto-font'>Extra</h1>
                <CommandBar items={extrasItems} buttonAs={CustomButton}/>
            </Stack>
            <Extra />
       </Stack>
    );
}

export default Home;