import * as React from 'react';
import { useState } from 'react';
import '../App.css';
import ModulePopUp from './ModulePopUp';
import { Module } from '../Types/Module';
import { useEffect } from 'react';
import { getAllModules } from '../Reducers/AllModulesReducer';
import { useAppSelector } from '../hooks';

// example of one module
//     _id: "629e10caf16fa67974adf4e0",
//     courseCode: "AAA08B",
//     courseName: "FASHION & DESIGN: WEARABLE ART AS A SECOND SKIN*~",
//     courseAUs: "3.0 AU",
//     indexes: [
//         {
//         _id: "629e10caf16fa67974adf4e1",
//         indexNo: "39614",
//         lessons: [
//         {
//     _id: "629e10caf16fa67974adf4e2",
//     type: "LEC/STUDIO",
//     group: "LE",
//     day: "THU",
//     venue: "NIE7-02-07",
//     teachingWeeks: "",
//     startTime: "2021-01-01T05:30:00.000Z",
//     endTime: "2021-01-01T08:20:00.000Z"

export interface ModuleListProps {
	input: string
	school: string
	type: string
}

export default function ModuleList(props: ModuleListProps){ 
	const data = useAppSelector(getAllModules);
	const [PopUp,setPopUp] = useState(false);
	const [currentModule,setModule] = useState(new Module());

	const findAllSchools = () => { 
		const allSchools:string[]= [];
		for (const element of data) { 
			if (!allSchools.includes(element.offeredBy)) {
				allSchools.push(element.offeredBy);
			}
		}
		console.log(allSchools);
	};



	const filteredData = data.filter((element) => {
		if (props.input === '' && props.type === '' && props.school === '') {
			return true;
		} else {
			return (
				(element.courseCode.toLowerCase().includes(props.input) || element.courseName.toLowerCase().includes(props.input))				
				&& (props.type === '' || element.availableAs.includes(props.type)) && (props.school === '' || element.offeredBy == props.school) //&& element.offeredBy.includes(props.school)) 
				// school filter doesnt work for some reason. 
			);
		}
	}
	);
	const handleClick=(item: Module)=> {
		setPopUp(true);
		setModule(item);
	};

	const onClose = () => {
		setPopUp(false);
	};
	useEffect(()=>{
		findAllSchools();
	},[]);
	return (
		<div>
			<ul className='ModuleList'>
			{filteredData.map((item) => ( 
				<li className="indivModule" onClick={() => handleClick(item)}
				key={item.courseCode}>{item.courseCode} : {item.courseName}</li>

			))}
		</ul>
		{(currentModule) && (<ModulePopUp input={currentModule} opened={PopUp} onClose={onClose} />)}

	
		</div>
	);

 
}