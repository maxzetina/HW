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
            <ReactCardFlip isFlipped={flip} containerClassName="card flip-card-inner" containerStyle={{border: "none", height: '60vh'}}
                flipDirection="horizontal" flipSpeedBackToFront="1.5" flipSpeedFrontToBack="1.5">
                <CardFront 
                    flipCard={flipCard} 
                    name={props.class.name} 
                    assignments={props.class.assignments}
                    lecturesRecorded={props.class.lecturesRecorded}
                    lateDays={props.class.lateDays}
                    missableRecsLeft={props.class.missableRecsLeft}
                    psetDroppable={props.class.psetDroppable}
                    psetDropped={props.class.psetDropped}
                />
                
                <CardBack flipCard={flipCard} OH={props.class.OH}/>
            </ReactCardFlip>
        </div>
    );
};

export default ClassCard;
