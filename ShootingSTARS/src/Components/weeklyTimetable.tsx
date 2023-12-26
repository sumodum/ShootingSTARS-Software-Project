import * as React from 'react';

import { Activity, TableCellData } from '../Types/Activity';
import { getAllModules } from '../Reducers/AllModulesReducer';
import { useAppSelector } from '../hooks';
import { TimetablePlan } from '../Types/Timetable';
import { createTable, days, mapActivities, time } from '../Util/PlanToTable';
import '../styles/weeklyTimetable.css';

function activityListToContent(list: Activity[] | undefined): string{
	if(list == undefined){
		return "";
	}
	let ret = "";
	list.forEach((activity) => {
		ret = ret + activity.name +'\n' + activity.venue + ';\n' + activity.teachingWeeks.replace("Teaching ", "") + ';\n';
	});
	return ret;
}


interface tableCellProps{
	tableCell: TableCellData | undefined;
	index: number;
}

function TableDayCell(props: tableCellProps){
	if(props.tableCell !== undefined){
		let className = "dayModCol";
		if(props.tableCell.activities.length > 0){
			className += " filledTableCell";
			let divClass = 'divWeeklyClass';
			if(props.tableCell.checkValid() === false){
				divClass += " wrongTableCell";
			}
			else{
				divClass += " rightTableCell";
			}
			return(
				<td rowSpan={props.tableCell.slots} className={className}><div className={divClass}>{activityListToContent(props.tableCell.activities)}</div></td>
			);
		}
		else{
			className += " blankTableCell";

			if(props.index % 2 === 0){
				className += " evenTimeBG";
			}
			else{
				className += " oddTimeBG";
			}
			return(
				<td rowSpan={props.tableCell.slots} className={className}></td>
			);
		}

	}
	else{
		return(null);
	}
}

export interface WeeklyTimetableProps{
	plan: TimetablePlan
}



export default function WeeklyTimetable(props: WeeklyTimetableProps){
	const allModules = useAppSelector(getAllModules);
	const activities = props.plan.toActivityArr(allModules);
	const mapAct = createTable(mapActivities(activities));
	console.log(mapAct);
	return (
	
			<table className='weeklyTable'>
			<thead>
			<tr>
				<th className='timingCol'>Time</th>
				{days.map((day) => (
						<th key={day} className='dayRow dayModCol'>{day}</th>
				))}
			</tr>
			{time.map((timeDur, index) => (
				<tr key={index} style={{height: "100%"}}>
					{index % 2 === 0 ?
						<td className='timingCol evenTimeBG'>{timeDur.startHour}:{timeDur.startMinute -1} - {timeDur.endHour}:{timeDur.endMinute + 1}</td>:
						<td className='timingCol oddTimeBG'>{timeDur.startHour}:{timeDur.startMinute -1} - {timeDur.endHour}:{timeDur.endMinute + 1}</td>
					}
					
					<TableDayCell tableCell={mapAct.get("MON")?.get(timeDur.toString())} index={index} />
					<TableDayCell tableCell={mapAct.get("TUE")?.get(timeDur.toString())} index={index} />
					<TableDayCell tableCell={mapAct.get("WED")?.get(timeDur.toString())} index={index} />
					<TableDayCell tableCell={mapAct.get("THU")?.get(timeDur.toString())} index={index} />
					<TableDayCell tableCell={mapAct.get("FRI")?.get(timeDur.toString())} index={index} />
					<TableDayCell tableCell={mapAct.get("SAT")?.get(timeDur.toString())} index={index} />
				</tr>
			))}
			</thead>
		</table>
		
		
		


	);
}