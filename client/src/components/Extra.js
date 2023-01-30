import '../css/Home.css';

import { get } from '../utilities';
import { Stack } from '@fluentui/react';
import { useEffect, useState } from 'react';

const options = {weekday: 'short', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'};
const options2 = {weekday: 'short', month: 'numeric', day: 'numeric'}

const ExtraEntry = (props) => {
    const [opt, setOpt] = useState(options);
    useEffect(() => {
        if(!(new Date(props.dueDate).getHours())){
            setOpt(options2)
        }
    }, [props.dueDate])

    return (
        <tr>
            <td>{props.name}</td>                   
            <td style={{color: 'red', fontWeight: "bold"}}> {new Date(props.dueDate).toLocaleString("en-US", opt)}</td>
        </tr>
    )
}

const Extra = () => {
    const [extras, setExtras] = useState([])

    useEffect(() => {
        get("/api/extras", {className: "Extra"}).then((x) => setExtras(x))
    }, [extras])

    return (
        <Stack className='container' style={{paddingTop: 8}}>
            {extras.length > 0 && 
                <table className="table table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Due</th>
                        </tr>
                    </thead>
                    <tbody>
                        {extras.map((x, key) => <ExtraEntry key={key} name={x.name} dueDate={x.dueDate}/>)}
                    </tbody>
                </table>
            }
        </Stack>
    );
};

export default Extra;