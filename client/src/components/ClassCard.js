import '../css/Class.css';
import { useState } from "react";
import ReactCardFlip from "react-card-flip";
const ClassCard = (props) => {
    const [flip, setFlip] = useState(false);

    return (
        <div className="col flip-card">
            <div className="card h-100 flip-card-inner" style={{backgroundColor: "#549F93"}}>
                <div className="card-body flip-card-front">
                    <h5 className="card-title">{props.name}</h5>
                    {props.assignments.map((x, key) => <p className="card-text" key={key}>{x.name}</p>)}
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                </div>

                <div className="card-body flip-card-back">
                    <h5 className="card-title">Back</h5>
                    <p className="card-text">This is the back</p>
                    {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
                </div>
            </div>
        </div>

        // <div className="col flip-card">
        //     <ReactCardFlip isFlipped={flip} containerClassName="card h-100 flip-card-inner" containerStyle={{transformStyle: "preserve-3d"}}
        //         flipDirection="horizontal" flipSpeedBackToFront="1.5" flipSpeedFrontToBack="1.5">
        //         <div className='card-body flip-card-front'>
        //             <h5 className="card-title">{props.name}</h5>
        //              {props.assignments.map((x, key) => <p className="card-text" key={key}>{x.name}</p>)}
        //              <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
        //             <button onClick={() => setFlip(!flip)}>
        //                 Flip</button>
        //         </div>
        //         <div className='card-body flip-card-back'>
        //             <h5 className="card-title">Back</h5>
        //              <p className="card-text">This is the back</p>
        //             <button onClick={() => setFlip(!flip)}>
        //                 Flip</button>
        //         </div>
        //     </ReactCardFlip>
        // </div>
    );
};

export default ClassCard;



