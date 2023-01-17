import { get } from '../utilities';
import { PrimaryButton, Stack } from '@fluentui/react';
import { useState, useEffect } from "react";
import Class from './Class';
import '../css/Class.css';
const Home = () => {
    const [classes, setClasses] = useState([])
  
    useEffect(() => {
        get("/api/classes").then((x) => {
            setClasses(x.map((x, key) => <Class key={key} name={x.name} assignments={x.assignments}/>))
        });
    }, [classes]);

    const _alertClicked = () => {
        alert('Clicked');
    };

    const verticalGapStackTokens = {
        childrenGap: 10,
        padding: 10
    };
    
    return (
        <Stack tokens={verticalGapStackTokens}>
            {/* <Stack.Item> */}
                {classes}
            {/* </Stack.Item> */}
            {/* <br></br> */}


            <div className="container">
                <div className="row row-cols-2 row-cols-md-2 g-4">
                    <div className="col">
                        <div className="card h-100">
                            <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card h-100" >
                            <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card h-100">
                            <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This card has supporting text below as a natural lead-in to additional content. </p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>

                    <div className="col flip-card">
                        <div className="card h-100 flip-card-inner">
                            <div className="card-body flip-card-front">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            </div>

                            <div className="card-body flip-card-back">
                                <h5 className="card-title">Back</h5>
                                <p className="card-text">This is the back</p>
                                {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
                            </div>
                        </div>
                    </div>
                    
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
                    <div>
                        D
                    </div>
                </div>
            </div>
            {/* <div>
                
                
                
            </div> */}
            {/* <Stack.Item>
                <PrimaryButton onClick={_alertClicked} text="Click Me"/>
            </Stack.Item> */}
       </Stack>
    );
}

export default Home;