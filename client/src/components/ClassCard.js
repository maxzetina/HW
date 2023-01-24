import '../css/Class.css';

import ReactCardFlip from "react-card-flip";
import { useState } from "react";
import { CommandBar } from '@fluentui/react';

const x = { root: { backgroundColor: "transparent" }};


const ClassCard = (props) => {
    const [flip, setFlip] = useState(false);
    const _items = [
        {
          key: 'newItem',
          text: 'New',
          cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
          iconProps: { iconName: 'Add' },
          subMenuProps: {
            items: [
              {
                key: 'emailMessage',
                text: 'Email message',
                iconProps: { iconName: 'Mail' },
                ['data-automation-id']: 'newEmailButton', // optional
              },
              {
                key: 'calendarEvent',
                text: 'Calendar event',
                iconProps: { iconName: 'Calendar' },
              },
            ],
          },
        }
    ];
    
    const _overflowItems = [
        { key: 'move', text: 'Move to...', onClick: () => console.log('Move to'), iconProps: { iconName: 'MoveToFolder' } },
        { key: 'copy', text: 'Copy to...', onClick: () => console.log('Copy to'), iconProps: { iconName: 'Copy' } },
        { key: 'rename', text: 'Rename...', onClick: () => console.log('Rename'), iconProps: { iconName: 'Edit' } },
      ];
    return (
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

        <div className="col flip-card">
            <ReactCardFlip isFlipped={flip} containerClassName="card h-100 flip-card-inner" containerStyle={{border: "none"}}
                flipDirection="horizontal" flipSpeedBackToFront="1.5" flipSpeedFrontToBack="1.5">
                <div className='card-body flip-card-front' style={{borderRadius: "10px"}}>
                    <h3 className="card-title">{props.name}</h3>
                    {/* <CommandBar
                        styles={x}
                        items={_items}
                        overflowItems={_overflowItems}
                        ariaLabel="Inbox actions"
                        primaryGroupAriaLabel="Email actions"
                        farItemsGroupAriaLabel="More actions"
                    /> */}
                     {props.assignments.map((x, key) => <p className="card-text" key={key}>{x.name}</p>)}
                     <p>Late Days: {props.lateDays}</p>
                     <p>Missable Recs: {props.missableRecsLeft}</p>
                     {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
                    <button onClick={() => setFlip(!flip)}>
                        Flip</button>
                </div>
                <div className='card-body flip-card-back' style={{borderRadius: "10px"}}>
                    <h5 className="card-title">Back</h5>
                     <p className="card-text">This is the back</p>
                    <button onClick={() => setFlip(!flip)}>
                        Flip</button>
                </div>
            </ReactCardFlip>
        </div>
    );
};

export default ClassCard;



