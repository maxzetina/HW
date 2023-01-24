import ClassCard from './ClassCard';
import { get } from '../utilities';
import { useEffect, useState } from "react";
import { Spinner, SpinnerSize, Stack} from "@fluentui/react";

const Classes = () => {
    const [loading, setLoading] = useState(true);
    const [classes, setClasses] = useState([])

    useEffect(() => {
        get("/api/classes").then((x) => {
            setClasses(x.map((x, key) => 
                <ClassCard 
                    key={key} 
                    name={x.name} 
                    assignments={x.assignments}
                    lecturesRecorded={x.lecturesRecorded}
                    lateDays={x.lateDays}
                    missableRecsLeft={x.missableRecsLeft}
                    psetDroppable={x.psetDroppable}
                    psetDropped={x.psetDropped}
                    />
            ));
            
            setLoading(false);
        });
    }, [classes]);

    return (
        <Stack>
            {loading ? <Spinner label="Loading Classes..." size={SpinnerSize.large} /> : 
                <Stack className="container" style={{paddingTop: 8}}>
                    <div className="row row-cols-2 row-cols-md-2 g-4">
                        {classes}
                    </div>
                </Stack>
            }   
        </Stack>
    );
};

export default Classes;