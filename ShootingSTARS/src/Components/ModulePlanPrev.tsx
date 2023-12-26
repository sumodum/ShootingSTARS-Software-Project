import * as React from 'react';
import { Module } from '../Types/Module';
import { selectCurrentPlan } from '../Reducers/CurrentPlanReducer';
import { useAppSelector } from '../hooks';
import { getAllModules } from '../Reducers/AllModulesReducer';
import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import WeeklyTimetable from './weeklyTimetable';
import Typography from '@mui/material';

export interface ModulePlanPrevProps{
	module: Module;
}

export default function ModulePlanPrev(props: ModulePlanPrevProps){
	const currentPlan = useAppSelector(selectCurrentPlan);
	const allModules = useAppSelector(getAllModules);

	const [index, setIndex] = React.useState('');


	const changePrev = (event: SelectChangeEvent) => {
		setIndex(event.target.value);
		currentPlan.changeIndexFor(props.module.courseCode, event.target.value);
	};

	if(currentPlan.hasModule(props.module.courseCode) === false){
		currentPlan.addModule(props.module.courseCode);
	}

	//Blank out the course code first
	currentPlan.changeIndexFor(props.module.courseCode, '');

	const validCourseCodes: Array<string> = [];

	props.module.indexes.forEach((index)=>{
		currentPlan.changeIndexFor(props.module.courseCode, index.index);
		if(currentPlan.isValid(allModules)){
			validCourseCodes.push(index.index);
		}
	});

	currentPlan.changeIndexFor(props.module.courseCode, index);

	// No valid course code
	if(validCourseCodes.length === 0){
		return(
			<div
			style={{
				display:'flex', 
				alignItems:'center',
				padding:'2em',
				justifyContent:'center'
			}}>
				<h3>Your current timetable has no suitable indexes for this module!</h3>
			</div>

		);
	}
	else{
		return(
			<Box style={{padding:'2em'}}>
				<Box>
					<FormControl fullWidth={true}>
						<InputLabel>Index</InputLabel>
						<Select
							value={index}
							label="Index"
							onChange={changePrev}
						>
							{validCourseCodes.map((validCode)=>{
								return <MenuItem key={validCode} value={validCode}>{validCode}</MenuItem>;
							})}
						</Select>
					</FormControl>
				</Box>
				<WeeklyTimetable plan={currentPlan} />
			</Box>
		);
	}
}