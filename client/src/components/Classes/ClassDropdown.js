import { Dropdown } from '@fluentui/react';
import { get } from '../../utilities.js';
import { useEffect, useState } from 'react';


const dropdownStyles = { dropdown: { width: 280 } };

const ClassDropdown = (props) => {
    const [classes, setClasses] = useState([])

    useEffect(() => {
        get("/api/classes").then((x) => {
            let options = []
            for(let i = 0; i < x.length; i++){
                options.push({key: x[i]._id, text: x[i].name})
            }
            setClasses(options)            
        });
    }, [classes]);
    
    const onChange = (event, item) => {
        // props.setSelectedClass(item.key);
        props.onChange(event, item);
    };

    return (
        <>
            <Dropdown
                label="Class"
                selectedKey={props.selectedClass ? props.selectedClass.key : undefined}
                onChange={onChange}
                placeholder="Select a class"
                options={classes}
                styles={dropdownStyles}
            />
        </>
    );
};

export default ClassDropdown;