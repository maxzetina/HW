import '../../css/Class.css';

import { IconButton, Stack } from '@fluentui/react';
import OfficeHours from './OfficeHours.js';

const iconButtonStyles = {
    root: {color: 'white'},
    rootHovered: {color: '#549F93'}
}

const CardBack = (props) => {
    return (
        <div className='card-body flip-card-back' style={{borderRadius: "10px", height: '350px'}}>
            <Stack horizontal horizontalAlign='space-between' verticalAlign='center' style={{padding : "8px 8px"}}>
                <h4 className="card-title">OH Schedule</h4>
                <IconButton iconProps={{ iconName: 'PageRight' }} styles={iconButtonStyles} title="See OH" onClick={() => props.flipCard()} />
            </Stack>
            <Stack>
                <OfficeHours OH={props.OH} />
            </Stack>
        </div>
    );
};

export default CardBack;