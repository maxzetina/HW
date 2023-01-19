import '../css/Home.css';

import AddClassPanel from './AddClassPanel';
import Classes from './Classes';
import { Stack } from '@fluentui/react';


const Home = () => {
    // const addClass = () => {
    //     post("/api/addClass", {name: 'ggg', 'assignments': []})
    // };

    const verticalGapStackTokens = {
        childrenGap: 10,
        padding: 10
    };
    
    return (
        <Stack tokens={verticalGapStackTokens}>
            <Stack className='container' horizontal horizontalAlign='space-between' style={{paddingTop: 16}}>
                <h1 className='roboto-font'>Classes</h1>
                <Stack vertical verticalAlign='center'><AddClassPanel/></Stack>
            </Stack>
            <Classes/>
       </Stack>
    );
}

export default Home;