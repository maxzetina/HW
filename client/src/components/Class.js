import '../css/Class.css';

const Class = (props) => {
    const options = {weekday: 'short', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'};

    return (
        <div className="class-container" >
            <div className="upper-half" style={{backgroundColor: "#549F93"}}>
                <h1 className="class-name">
                    {props.name} <span style={{color: 'white'}}>+</span>
                </h1>
            </div>
            <div className="bottom-half" style={{borderColor: "#549F93"}}>
                {props.assignments.map((assignment, key) => {
                    return (
                        <div key={key}>
                            <p> <span className="head">Due: </span> {new Date(assignment.dueDate).toLocaleString("en-US", options)}: {assignment.name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Class;