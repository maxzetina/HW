import '../css/Class.css';

import { useEffect, useState } from 'react';

const Assignment = (props) => {
    const options = {weekday: 'short', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'};

    const [nameColor, setNameColor] = useState('black');
    const [fontWeight, setFontWeight] = useState('normal');

    useEffect(() => {
        if(props.quiz){
            setNameColor('#2b579a');
            setFontWeight('bold');
        }
    }, [props.quiz]);

    return (
        <li>
            <span style={{color: nameColor, fontWeight: fontWeight}}>{props.name}</span> &emsp; 
            <span style={{color: 'red', fontWeight: "bold"}}>
                {new Date(props.dueDate).toLocaleString("en-US", options)}
            </span>
        </li>
    )
}


const CardAssignments = (props) => {
    return (
        <div>
            {props.assignments.length > 0 ? props.assignments.map((x, key) => 
                <Assignment 
                    key={key} 
                    quiz={x.quiz} 
                    name={x.name} 
                    dueDate={x.dueDate}
                />) 
                : <div> No Assignments </div>
            }
        </div>
    );
};

export default CardAssignments;