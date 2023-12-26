import * as React from 'react';
import { useState } from 'react';
import { Box, Button, Dialog, Card, CardContent, Typography } from '@mui/material';
import Indexes from './Indexes';
import { Module } from '../Types/Module';
import ModulePlanPrev from './ModulePlanPrev';


interface ModulePopUpDscProps{
	module: Module
}

function ModulePopUpDsc(props: ModulePopUpDscProps){
	return(
		<Card>
			<CardContent>
				<Typography color="text.secondary">{props.module.courseDescription}</Typography>
				<Typography color="text.secondary"><Box component="span" fontWeight='bold'>AUs:</Box> {props.module.courseAUs}</Typography>
				<Typography color="text.secondary"><Box component="span" fontWeight='bold'>Grading type:</Box> {props.module.gradingType}</Typography>
				<Typography color="text.secondary"><Box component="span" fontWeight='bold'>Offered by:</Box> {props.module.offeredBy}</Typography>
				<Typography color="text.secondary"><Box component="span" fontWeight='bold'>Available as:</Box> {props.module.availableAs.toString()}</Typography>
				{props.module.prereq !== '' && <Typography color="text.secondary" style={{whiteSpace: "pre-wrap"}}><Box component="span" fontWeight='bold'>Prerequisites:</Box> {props.module.prereq.replace('\n', '\t\n')}</Typography>}
				{props.module.mutualExclusive.length !== 0 && <Typography color="text.secondary"><Box component="span" fontWeight='bold'>Mutually exclusive:</Box> {props.module.mutualExclusive.toString()}</Typography>}
			</CardContent>
		</Card>
	);
}

export interface ModulePopUpProps {
	opened: boolean;
	onClose: () => void;
	input: Module;
}

export default function ModulePopUp(props: ModulePopUpProps) {
	const currentModule = props.input;
	const [view,setView] = useState(1);

	return(
		<div className="PopUp" >
			<Dialog maxWidth="lg" fullWidth={true} open={props.opened} onClose={props.onClose} >
			<Typography variant='h5' align='center' style={{paddingTop:'2em',textDecoration:'underline'}}>{currentModule.courseCode}: {currentModule.courseName}</Typography>
			<div style={{paddingTop:'1em',display:'flex', flexDirection:'row',justifyContent:'center',textDecoration:'underline'}}>
				<Button onClick={() => {setView(1);}}>Description</Button>
				<Button onClick={() => {setView(2);}}>Indexes</Button>
				<Button onClick={() => {setView(3);}}>Preview</Button>
			</div>

			<div>
				{view === 1 && <ModulePopUpDsc module={currentModule} />}
				{view === 2 && <Indexes current={currentModule} /> }
				{view === 3 && <ModulePlanPrev module={currentModule} />}
			</div>
			
		</Dialog>
		</div>
		
	);
}


