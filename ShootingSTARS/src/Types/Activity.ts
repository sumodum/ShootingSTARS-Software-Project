export class Activity{
	name: string;
	day: string;
	venue: string;
	teachingWeeks: string;
	time: string; // HH:MM - HH:MM
	constructor(name: string, day: string, venue: string, teachingWeeks: string, time: string){
		this.name = name;
		this.day = day;
		this.venue = venue;
		this.teachingWeeks = teachingWeeks;
		this.time = time;
	}

	public isEqualsTo(act: Activity): boolean {
		return this.name === act.name && this.day === act.day && this.venue === act.venue && this.teachingWeeks === act.teachingWeeks && this.time === act.time;
	}

	public static arrEqualToArr(arr1: Activity[] | undefined, arr2: Activity[] | undefined){
		if(arr1 === undefined || arr2 === undefined){
			return false;
		}
		const arr1In = arr1.every((activity) => {
			return arr2.some((searchingAct) => {
				return activity.isEqualsTo(searchingAct);
			});
		});
		const arr2In = arr2.every((activity) => {
			return arr1.some((searchingAct) => {
				return activity.isEqualsTo(searchingAct);
			});
		});
		return arr1In && arr2In;
	}
}

export class TableCellData{
	slots: number;
	activities: Activity[];
	constructor(slots: number, activities: Activity[]){
		this.slots = slots;
		this.activities = activities;
	}

	public checkValid(): boolean {
		const allActivitiesName: string[] = [];
		this.activities.forEach((activity) => {
			if(allActivitiesName.includes(activity.name) === false){
				allActivitiesName.push(activity.name);
			}
		});
		return allActivitiesName.length <= 1;
	}
}

export class HourlyDuration{
	startHour: number;
	startMinute: number;
	endHour: number;
	endMinute: number;
	constructor(startHour: number, startMinute: number, endHour: number, endMinute: number){
		this.startHour = startHour;
		this.startMinute = startMinute;
		this.endHour = endHour;
		this.endMinute = endMinute;
	}

	// Checks that an event duration of HH:MM - HH:MM contains this duration
	public isDurationInEvent(eventDuration: string): boolean{
		const eventTime = eventDuration.split('-');
		const eventStartHour = parseInt(eventTime[0].split(':')[0].trim());
		const eventStartMinute = parseInt(eventTime[0].split(':')[1].trim());
		const eventEndHour = parseInt(eventTime[1].split(':')[0].trim());
		const eventEndMinute = parseInt(eventTime[1].split(':')[1].trim());
		// Check that duration start time is between event start and end, if so duration is contained in event period
		const startDate = new Date();
		// Init seconds and ms. Ignore the date section since we set everything as same date
		startDate.setSeconds(0, 0);
		const endDate = new Date(startDate);
		const durationDate = new Date(startDate);
		startDate.setHours(eventStartHour, eventStartMinute);
		endDate.setHours(eventEndHour, eventEndMinute);
		durationDate.setHours(this.startHour, this.startMinute);
		if(durationDate >= startDate && durationDate <= endDate){
			return true;
		}
		return false;
	}

	public toString(): string {
		return this.startHour + ":" + this.startMinute + " - " + this.endHour + ":" + this.endMinute;
	}
}