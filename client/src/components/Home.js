import ClassCard from './ClassCard';
import { get } from '../utilities';
import { Stack } from '@fluentui/react';
import { useState, useEffect } from "react";
// import '../css/Class.css';

const Home = () => {
    const [classes, setClasses] = useState([])
  
    useEffect(() => {
        get("/api/classes").then((x) => {
            setClasses(x.map((x, key) => <ClassCard key={key} name={x.name} assignments={x.assignments}/>))
        });
    }, [classes]);

    const verticalGapStackTokens = {
        childrenGap: 10,
        padding: 10
    };
    
    return (
        <Stack tokens={verticalGapStackTokens}>
            <div className='container' style={{paddingTop: 16}}>
                <h1>Classes</h1>
            </div>
            <div className="container" style={{paddingTop: 8}}>
                <div className="row row-cols-2 row-cols-md-2 g-4">
                    {classes}
                </div>
            </div>
       </Stack>
    );
}

export default Home;




// <div className="col">
// <div className="card h-100">
//     <div className="card-body">
//     <h5 className="card-title">Card title</h5>
//     <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//     <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
//     </div>
// </div>
// </div>

// <div className="col">
// <div className="card h-100" >
//     <div className="card-body">
//     <h5 className="card-title">Card title</h5>
//     <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//     <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
//     </div>
// </div>
// </div>

// <div className="col">
// <div className="card h-100" >
//     <div className="card-body" >
//     <h5 className="card-title">Card title</h5>
//     <p className="card-text">This card has supporting text below as a natural lead-in to additional content. </p>
//     <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
//     </div>
// </div>
// </div>



     {/* <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                HI
                            </div>
                            <div className="flip-card-back">
                                <h1>John Doe</h1>
                                <p>Architect & Engineer</p>
                                <p>We love that guy</p>
                            </div>
                        </div>
                    </div> */}