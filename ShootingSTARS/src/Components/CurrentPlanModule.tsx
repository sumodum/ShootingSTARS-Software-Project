import * as React from 'react';
import '../App.css';
import { useAppSelector,useAppDispatch } from '../hooks';
import { useState } from 'react';
import { getModule } from '../Types/Module';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { changeIndex,removeFromPlan } from '../Reducers/CurrentPlanReducer';
import { getAllModules } from '../Reducers/AllModulesReducer';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import { selectUsername } from '../Reducers/UserReducer';

export interface CurrentPlanModuleProps {
	courseCode : string;
  index : string;
}

export default function CurrentPlanModule(props : CurrentPlanModuleProps) {
    const dispatch = useAppDispatch();
    const data = useAppSelector(getAllModules);
    const [currentIndex,setcurrentIndex] = useState(props.index);
    const user = useAppSelector(selectUsername);

    const retrieveAllIndex = (courseCode : string) => { 
      const c = getModule(data,courseCode);
      const allIndexes:Array<string> = [];

    if (c) { 
      c.indexes.forEach(function (arrayItem) {
      allIndexes.push(arrayItem.index);
      });
    }
      return allIndexes;
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=> {
      setcurrentIndex(event.target.value);
      dispatch(changeIndex([props.courseCode,event.target.value,user]));
    };

    return (
      <div>
          <div className='plannedModule'>
              <Typography style={{marginRight:'1em'}} >{props.courseCode} </Typography>
              <Button style={{paddingLeft :'5px'}}size='small' onClick={() => dispatch(removeFromPlan([props.courseCode,user]))} className='removeBtn'>Remove</Button>
          </div>
        <FormControl size='small' sx={{ m: 1, width: 150 }}>
        <InputLabel id="demo-select-small">Index</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={currentIndex}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
        >
          {retrieveAllIndex(props.courseCode).map((name:string) => (
            <MenuItem
            key={name}
            value={name}
            >
            {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>

    );
}