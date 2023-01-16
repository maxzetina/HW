import { useState, useEffect } from "react";
import { get } from '../utilities';
import { PrimaryButton, Stack } from '@fluentui/react';

const Home = () => {
    const [example, setExample] = useState('')
    const [classes, setClasses] = useState([])
  
    useEffect(() => {
        get("/api/hello").then((r) => {
        //   console.log(r);
          setExample(r)});
        get("/api/classes").then((x) => {
            console.log(x);
            setClasses(x.map((x, key) => <p key={key}>{x.name}</p>))
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
            {example.status}
            {classes}

            <br></br>
            <Stack.Item>
                <PrimaryButton onClick={_alertClicked} text="Click Me"/>
            </Stack.Item>
       </Stack>
    );
}

export default Home;