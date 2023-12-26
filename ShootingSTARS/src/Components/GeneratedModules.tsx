import * as React from 'react';

import { getAllModules } from '../Reducers/AllModulesReducer';
import { useAppSelector } from '../hooks';
import WeeklyTimetable from "./weeklyTimetable";
import { selectCurrentPlan } from '../Reducers/CurrentPlanReducer';
import { Button, Typography } from '@mui/material';
import { TimetablePlan } from '../Types/Timetable';
import { getModule, Module } from '../Types/Module';
import { useEffect, useState } from 'react';

async function generateModules(allModules: Module[], currentPlan: TimetablePlan): Promise<TimetablePlan[]> {
	const queue: TimetablePlan[] = [currentPlan];
	const final: TimetablePlan[] = [];

	while(queue.length !== 0){
		//console.log(queue);
		//console.log(final);
		const cur = queue.pop();
		//console.log(cur);
		if(cur!==undefined){
			let unfilledModule = '';
			//Find a moduleIndex that isn't chosen. By the looks of it, this will end up with the last module not chosen
			cur.modules.forEach((moduleIndex) => {
				if(moduleIndex.hasChosenIndex() === false){
					unfilledModule = moduleIndex.courseCode;
				}
			});
			if(unfilledModule === ''){
				// No unfilled module. Plan is valid since we check before pushing into queue
				final.push(cur.clone());
			}
			else{
				const module = getModule(allModules, unfilledModule);
				if(module !== null){
					// Try every index, if valid push into queue
					module.indexes.forEach((index) => {
						const newPlan = cur.clone();
						newPlan.changeIndexFor(unfilledModule, index.index);
						if(newPlan.isValid(allModules)){
							queue.push(newPlan);
						}
					});
				}
			}
		}
	}
	return final;
}

export default function GeneratedModules(){
	const currentPlan = useAppSelector(selectCurrentPlan);
	const allModules = useAppSelector(getAllModules);

	const [finishedProcessing,setFinishedProcessing] = useState(false);
	const [plans, setPlans] = useState(Array<TimetablePlan>());
	const [curPlanIndex, setCurPlanIndex] = useState(0);
	
	useEffect(() => {
		generateModules(allModules, currentPlan).then((plan) => {
			setPlans(plan);
			setFinishedProcessing(true);
			console.log(plan);
		});
	}, [currentPlan]);

	const nextPlan = () => {
		if(curPlanIndex+1<plans.length){
			setCurPlanIndex(curPlanIndex+1);
		}
	};

	const prevPlan = () => {
		if(curPlanIndex>0){
			setCurPlanIndex(curPlanIndex-1);
		}
	};

	if(finishedProcessing === false){
		return(<div>Processing</div>);
	}
	else{
		if(plans.length === 0){
			return(<Typography className='noTimetable'>We could not find a suitable timetable for you. Do consider changing your modules/requirements!</Typography>);
			// return(<div className='noTimetable'>Sorry we could not find a plan for you. &#128533;</div>);
		}
		else{
			return(
				<div className='generatedTimetable'>
					<Typography style={{paddingTop:'1em'}}align='center' variant='h4' gutterBottom>Generated Timetables</Typography>
					<WeeklyTimetable plan={plans[curPlanIndex]} />
					<div className='GenerateTimetableButtons'>
						<Button onClick = {prevPlan}>Previous</Button>
						{curPlanIndex+1}/{plans.length}
						<Button onClick = {nextPlan}>Next</Button>
					</div>
					<div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',paddingBottom:'3em'}}>
						<ul>
							{plans[curPlanIndex].modules.map((moduleIndex) => {
								return <li key={moduleIndex.index}>{moduleIndex.courseCode}: {moduleIndex.index}</li>;
							})}
						</ul>
					</div>
				</div>
			);
		}
	}
}