import '../../css/Class.css';
import CardAssignments from './CardAssignments';
import { IconButton, Stack } from '@fluentui/react';

const tokens = {
    padding: '16px 16px',
};

const CardFront = (props) => {
    const iconButtonStyles = {
      root: {color: 'white'},
      rootHovered: {color: '#549F93'}
    }
    return (
        <div className='card flip-card-front' style={{borderRadius: "10px", border: "thick solid #549F93", height: '60vh', width: '90vh'}}>
            <Stack className='header' horizontal horizontalAlign='space-between' verticalAlign='center'>
                <h3 className="card-title">{props.name}</h3>
                <IconButton iconProps={{ iconName: 'PageRight' }} styles={iconButtonStyles} title="See OH" onClick={() => props.flipCard()} />
            </Stack>

            <Stack horizontal horizontalAlign='space-between' tokens={tokens}>
                <CardAssignments assignments={props.assignments} />
                <div>
                    <p><span className='head'>Late Days:</span> {props.lateDays}</p>
                    <p><span className='head'>Missable Recs:</span> {props.missableRecsLeft}</p>
                </div>
            </Stack>
        </div>
    );
};

export default CardFront;