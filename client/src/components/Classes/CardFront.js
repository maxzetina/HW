import '../../css/Class.css';
import CardAssignments from './CardAssignments';
import CardInfo from './CardInfo';
import { IconButton, Stack } from '@fluentui/react';
import { useBoolean, useId } from '@fluentui/react-hooks';

const tokens = {
    padding: '16px 16px',
};

const flipButtonStyles = {
    root: {color: 'white'},
    rootHovered: {color: '#549F93'}
};

const CardFront = (props) => {
    const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
    const buttonId = useId('callout-button');

    return (
        <div className='card flip-card-front' style={{borderRadius: "10px", border: "thick solid #549F93", height: '60vh'}}>
            <Stack className='header' horizontal horizontalAlign='space-between' verticalAlign='center'>
                <h3 className="card-title">{props.name}</h3>
                <IconButton iconProps={{ iconName: 'PageRight' }} styles={flipButtonStyles} title="See OH" onClick={() => props.flipCard()} />
            </Stack>

            <Stack horizontal horizontalAlign='space-between' tokens={tokens}>
                <CardAssignments assignments={props.assignments} />
                <IconButton iconProps={{ iconName: 'Info' }} id={buttonId} title="Info" onClick={() => toggleIsCalloutVisible()} />
            </Stack>

            {isCalloutVisible && (
                <CardInfo 
                    lecturesRecorded={props.lecturesRecorded} 
                    missableRecsLeft={props.missableRecsLeft}
                    lateDays={props.lateDays}
                    psetDroppable={props.psetDroppable}
                    psetDropped={props.psetDropped}
                    toggleIsCalloutVisible={toggleIsCalloutVisible}
                    buttonId={buttonId}
                />)}
        </div>
    );
};

export default CardFront;