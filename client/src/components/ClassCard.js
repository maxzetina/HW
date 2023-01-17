import '../css/Class.css';

const ClassCard = (props) => {
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
    );
};

export default ClassCard;