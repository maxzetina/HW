import { useState, useEffect } from "react";
import { get } from '../utilities';
import { PrimaryButton, Stack } from '@fluentui/react';

const Home = () => {
    const [example, setExample] = useState('')
    const [emp, setEmp] = useState([])
  
    useEffect(() => {
        get("/api/hello").then((r) => {
        //   console.log(r);
          setExample(r)});
        get("/api/emps", {name: 'Max'}).then((r) => {
            // console.log(r);
            setEmp(r.map((r, key) => <p key={key}>{r.name}, {r.level}</p>))
        });
    }, []);

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
            {emp}

            <br></br>
            <Stack.Item>
                <PrimaryButton onClick={_alertClicked} text="Click Me"/>
            </Stack.Item>
       </Stack>
    );
}

export default Home;