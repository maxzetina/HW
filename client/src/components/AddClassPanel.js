import { DefaultButton, Panel, PrimaryButton } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import { useCallback } from 'react';

const buttonStyles = { root: { marginRight: 8 } };

const AddClassPanel = () => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);

  const onRenderFooterContent = useCallback(
    () => (
      <div>
        <PrimaryButton onClick={dismissPanel} styles={buttonStyles}>
          Save
        </PrimaryButton>
        <DefaultButton onClick={dismissPanel}>Cancel</DefaultButton>
      </div>
    ),
    [dismissPanel],
  );

  return (
    <div>
        <PrimaryButton text="Add Class" onClick={openPanel} />
        <Panel
            isOpen={isOpen}
            onDismiss={dismissPanel}
            headerText="Panel with footer at bottom"
            closeButtonAriaLabel="Close"
            onRenderFooterContent={onRenderFooterContent}
            isFooterAtBottom={true}>

            <p>Content goes here.</p>
        </Panel>
    </div>
  );
};

export default AddClassPanel;