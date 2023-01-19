import ClassCard from './ClassCard';
import { get } from '../utilities';
import { useEffect, useState } from "react";
import '../css/Class.css';

const Classes = () => {
    const [classes, setClasses] = useState([])

    useEffect(() => {
        get("/api/classes").then((x) => {
            setClasses(x.map((x, key) => <ClassCard key={key} name={x.name} assignments={x.assignments}/>))
        });
    }, [classes]);

    return (
        <div>
            <div className="container" style={{paddingTop: 8}}>
                <div className="row row-cols-2 row-cols-md-2 g-4">
                    {classes}
                </div>
            </div>
        </div>
    );
};

export default Classes;