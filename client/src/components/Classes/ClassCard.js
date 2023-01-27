import '../../css/Class.css';

import CardFront from './CardFront';
import ReactCardFlip from "react-card-flip";
import { useState } from "react";
import CardBack from './CardBack';

const ClassCard = (props) => {
    const [flip, setFlip] = useState(false);
    const flipCard = () => setFlip(!flip);

    return (
        <div className="col flip-card">
            <ReactCardFlip isFlipped={flip} containerClassName="card flip-card-inner" containerStyle={{border: "none", height: '60vh', width: '90vh'}}
                flipDirection="horizontal" flipSpeedBackToFront="1.5" flipSpeedFrontToBack="1.5">
                <CardFront 
                    flipCard={flipCard} 
                    name={props.class.name} 
                    assignments={props.class.assignments}
                    lateDays={props.class.lateDays}
                    missableRecsLeft={props.class.missableRecsLeft}
                />
                
                <CardBack flipCard={flipCard} OH={props.class.OH}/>
            </ReactCardFlip>
        </div>
    );
};

export default ClassCard;



// <div className="col flip-card">
//     <div className="card h-100 flip-card-inner" style={{backgroundColor: "#549F93"}}>
//         <div className="card-body flip-card-front">
//             <h5 className="card-title">{props.name}</h5>
//             {props.assignments.map((x, key) => <p className="card-text" key={key}>{x.name}</p>)}
//             <p>{props.lateDays}</p>
//             <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
//         </div>

//         <div className="card-body flip-card-back">
//             <h5 className="card-title">Back</h5>
//             <p className="card-text">This is the back</p>
//             {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
//         </div>
//     </div>
// </div>




{/* <div className='card-body flip-card-front' style={{borderRadius: "10px"}}>
    <h3 className="card-title">{props.name}</h3>
        {props.assignments.map((x, key) => <p className="card-text" key={key}>{x.name}</p>)}
        <p>Late Days: {props.lateDays}</p>
        <p>Missable Recs: {props.missableRecsLeft}</p>
    <button onClick={() => setFlip(!flip)}>
        Flip</button>
</div>

<p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>  */}
