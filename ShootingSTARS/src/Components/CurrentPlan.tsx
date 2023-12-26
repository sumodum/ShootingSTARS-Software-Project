import * as React from 'react';
import '../App.css';
import CurrentPlanModule from './CurrentPlanModule';
import { useAppSelector } from '../hooks';
import {selectCurrentPlan} from '../Reducers/CurrentPlanReducer';
import { Typography } from '@mui/material';

export default function CurrentPlan() { 
    const currentPlan = useAppSelector(selectCurrentPlan); //currentPlan is TimetablePlan type
    return ( 
        <div>
            
            <ul className='currentPlan'>
            <Typography style={{textDecoration:'underline',}} align='center' variant='h5' gutterBottom>Current Modules</Typography>
            {(currentPlan.modules.length === 0) 
            ? <div style={{paddingTop:'2em'}}>
                <Typography>Click on modules below to add them!</Typography> 
                <Typography>Alternatively, you can load a plan if you are logged in.</Typography>
                <Typography>Or you can import through JSON.</Typography>
            </div>
            : <p></p> }

            {currentPlan.modules.map((item) => ( 
                 <CurrentPlanModule  courseCode={item.courseCode} index={item.index} key={item.courseCode} />
            ))}
            </ul>

        </div>
    );
}