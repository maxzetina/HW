import { useEffect, useState } from 'react';

const OfficeHours = (props) => {
    const [tableClass, setTableClass] = useState('table');
    const [activeDays, setActiveDays] = useState([]);
    useEffect(() => {
        setActiveDays(props.OH.filter(obj => obj.time !== ''))
        if(activeDays.length > 5){
            setTableClass('table table-sm');
        }
    }, [props.OH])

    const schedule = () => 
        props.OH.filter(obj => obj.time !== '').map((x, key) => 
            <tr key={key}>
                <td>{x.day}</td>
                <td>{x.time}</td>
                <td>{x.room}</td>
            </tr>
        );
    return (
        <div style={{paddingLeft: "8px", paddingRight: '8px'}}>
            {activeDays.length > 0 ? 
            <table className={tableClass} style={{color: 'white'}}>
                <thead>
                    <tr>
                    <th>Day</th>
                    <th>Time</th>
                    <th>Room</th>
                    </tr>
                </thead>
                <tbody>
                    {schedule()}
                </tbody>
            </table>
            : <div style={{color: 'white'}}>No Office Hours Logged</div>}
        </div>
    )
};

export default OfficeHours;