import * as React from 'react';
import { useState } from 'react';
import TextField from "@mui/material/TextField";
import '../App.css';
import { getAllModules } from '../Reducers/AllModulesReducer';
import { Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../hooks';
import {addPlan,resetPlan,loadToCurrent,saveCurrentTo,selectCurrentPlan } from '../Reducers/CurrentPlanReducer';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { selectUsername } from '../Reducers/UserReducer';

export default function HomePageSearch() { 
    const dispatch = useAppDispatch();
    const data = useAppSelector(getAllModules);
    const navigate = useNavigate();
    const [inputText, setInputText] = useState("");
    const user = useAppSelector(selectUsername);

    const handleSavingCurrent = (event: React.ChangeEvent<HTMLInputElement>) => { 
        dispatch(saveCurrentTo([event.target.value,user]));
        alert("Saved to Plan "+event.target.value);
    };

    const handleLoadingPlan = (event: React.ChangeEvent<HTMLInputElement>) => { 
        dispatch(loadToCurrent(event.target.value));
        window.location.reload();
    };
    const inputHandler = (e: any) => {
    //convert input text to lower case
        const lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

	const filteredData = data.filter((element) => {
		if (inputText === '') {
			return (
				element
			);
		} else {
			return (
				element.courseCode.toLowerCase().includes(inputText) || element.courseName.toLowerCase().includes(inputText)
			);
		}
	});


    return (
        <div className="Home2">
            <div className='HomeSearch'>
            <div>
                <TextField
                onChange={inputHandler}
                variant="outlined"
                fullWidth
                label="Search or Click to Add Module!"
                style={{paddingBottom:'1em'}}
                />
            </div>
            <div className='ModuleList'>
                <ul>
                {filteredData.map((item) => ( 
                    <Typography key={item.courseCode} className='indivModule' onClick={() => dispatch(addPlan([item.courseCode,user]))}>{item.courseCode} | {item.courseName}</Typography>
                ))}
                </ul>
            </div>
        </div>
        <div className='buttonList'>
            <div className='buttonList1'>
                <FormControl sx={{ minWidth: 120}}size="small" className='saveLoadBtn' fullWidth>
                    <InputLabel className='saveLoadBtn'>SAVE</InputLabel>
                    <Select
                    // value={age}
                    label="Save Plan"
                    onChange={handleSavingCurrent}
                    >
                    <MenuItem value={'1'}>Plan One</MenuItem>
                    <MenuItem value={'2'}>Plan Two</MenuItem>
                    <MenuItem value={'3'}>Plan Three </MenuItem>
                    </Select>
                </FormControl>
   
                <FormControl style={{marginLeft:'2em'}} size="small" sx={{ minWidth: 100 }} className='saveLoadBtn' fullWidth>
                    <InputLabel className='saveLoadBtn'>LOAD</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    label="Load Plan"
                    onChange={handleLoadingPlan}
                    >
                    <MenuItem value={'1'}>Plan One</MenuItem>
                    <MenuItem value={'2'}>Plan Two</MenuItem>
                    <MenuItem value={'3'}>Plan Three </MenuItem>
                    </Select>
                </FormControl>

            </div>
           
            <Button onClick={() => dispatch(resetPlan())} className='buttonListBtns'>Reset Plan</Button>
            <Button onClick={() => {navigate('/timetables');}} className='buttonListBtns' variant='contained'>Auto-Generate Timetables</Button>
            
            {/* <div className='buttonList1'>
                <Button className='buttonListBtns' >Export to image</Button>
                <Button style={{marginLeft:'2em'}} className='buttonListBtns' >Export to JSON</Button>
                <Button style={{marginLeft:'2em'}} className='buttonListBtns' >Import</Button>
            </div> */}
            
            </div>
        </div>
        
        
    );
    
}


  
  