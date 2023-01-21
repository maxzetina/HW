import '../css/Class.css';

import ClassCard from './ClassCard';
import { get } from '../utilities';
import { useEffect, useState } from "react";
import { Spinner, SpinnerSize } from "@fluentui/react";

const Classes = () => {
    const [loading, setLoading] = useState(true);
    const [classes, setClasses] = useState([])

    useEffect(() => {
        get("/api/classes").then((x) => {
            setClasses(x.map((x, key) => <ClassCard key={key} name={x.name} assignments={x.assignments}/>));
            setLoading(false);
        });
    }, [classes]);

    return (
        <div>
            {loading ? <Spinner label="Loading Classes..." size={SpinnerSize.large} /> : 
                <div className="container" style={{paddingTop: 8}}>
                    <div className="row row-cols-2 row-cols-md-2 g-4">
                        {classes}
                    </div>
                </div>
            }   
        </div>
    );
};

export default Classes;