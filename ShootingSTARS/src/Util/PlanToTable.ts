import { Activity, HourlyDuration, TableCellData } from "../Types/Activity";


export const time:HourlyDuration[] = [
	new HourlyDuration(8, 31, 9, 29),
	new HourlyDuration(9, 31, 10, 29),
	new HourlyDuration(10, 31, 11, 29),
	new HourlyDuration(11, 31, 12, 29),
	new HourlyDuration(12, 31, 13, 29),
	new HourlyDuration(13, 31, 14, 29),
	new HourlyDuration(14, 31, 15, 29),
	new HourlyDuration(15, 31, 16, 29),
	new HourlyDuration(16, 31, 17, 29),
	new HourlyDuration(17, 31, 18, 29),
	new HourlyDuration(18, 31, 19, 29),
	new HourlyDuration(19, 31, 20, 29),
	new HourlyDuration(20, 31, 21, 29),
	new HourlyDuration(21, 31, 22, 29),
	new HourlyDuration(22, 31, 23, 29)
];

export const days: string[] = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];

// Returns map of day and time to activity activity. The map[DAY][TIME] would return an activity array if there are activities during that time and day.
// Since we add in the order of the activity in the array given, it can be assumed that the arrangement of 2 activity array in the map, if they have the same activities, would be the same.
// E.g. assume that Monday 1030 - 1230 has activity A and B in that order, the map will return [A, B] in the corresponding entry in the map
export function mapActivities(activities: Activity[]): Map<string, Map<string, Activity[]>>{
	const mapAct = new Map<string, Map<string, Activity[]>>();
	days.forEach((day)=>{
		mapAct.set(day, new Map<string, Activity[]>());
	});
	activities.forEach((activity) => {
		if(activity.day.trim() !== ""){
			time.forEach((timing) => {
				if(timing.isDurationInEvent(activity.time) === true){
					if(mapAct.get(activity.day)?.has(timing.toString()) === true){
						mapAct.get(activity.day)?.get(timing.toString())?.push(activity);
					}
					else{
						mapAct.get(activity.day)?.set(timing.toString(), [activity]);
					}
				}
			});
		}
	});
	return mapAct;
}

// Merges duplicate by using TableCellData. Now, if a map[day][time] does not exist, it is a duplicate. Map[time][day] can be empty if no activity exists during that time.
// E.g. If an activity on Monday exist from 1030 - 1230 and no other activity exists during that time, map[MON][1030-1130] will have slot of 2, but map[MON][1130-1230] will not exist
// Allows us to create a map with the number of rows that a row cell should occupy
export function createTable(map: Map<string, Map<string, Activity[]>>): Map<string, Map<string, TableCellData>>{
	const retMap = new Map<string, Map<string, TableCellData>>();

	// Initialise the retMap such that each day and time start with an empty TableCellData
	days.forEach((day)=>{
		retMap.set(day, new Map<string, TableCellData>());
		time.forEach((timing) => {
			retMap.get(day)?.set(timing.toString(), new TableCellData(1, []));
		});
	});

	// Basically look through the whole map. If we find that the previous activity is the same, delete the entry then just add the slots by 1. Otherwise add
	// the map entry in
	days.forEach((day)=>{
		time.forEach((timing, index) => {
			if(map.get(day)?.has(timing.toString())){
				if(index!=0){
					// Find previous entry, since some may be deleted we cannot assume the previous one is index--
					let prevIndex = index - 1;
					while(prevIndex>0 && retMap.get(day)?.has(time[prevIndex].toString()) === false){
						prevIndex--;
					}
					if(Activity.arrEqualToArr(map.get(day)?.get(timing.toString()), map.get(day)?.get(time[prevIndex].toString()))){
						retMap.get(day)?.delete(timing.toString());
						const item = retMap.get(day)?.get(time[prevIndex].toString());
						//item cannot be undefined but Typescript
						if(item != undefined){
							item.slots ++;
						}
					}
					else{
						const item = retMap.get(day)?.get(timing.toString());
						const toStore = map.get(day)?.get(timing.toString());
						if(item != undefined && toStore != undefined){
							item.activities = toStore;
						}
					}
				}
				else{
					const item = retMap.get(day)?.get(timing.toString());
					const toStore = map.get(day)?.get(timing.toString());
					if(item != undefined && toStore != undefined){
						item.activities = toStore;
					}
				}
			}
		});
	});
	return retMap;
}