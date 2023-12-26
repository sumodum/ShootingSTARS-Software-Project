import { Activity } from "./Activity";
import { getModule, Module } from "./Module";
import { createTable, days, mapActivities } from '../Util/PlanToTable';

export class TimetablePlan {
	modules: ModuleIndex[] = [];

	public addModule(courseCode : string) : void {
		// introduce checking if module is already in Plan 
		if(this.modules.some( (curMod) => curMod.courseCode === courseCode ) === false){
			const indexToAdd = new ModuleIndex();
			indexToAdd.courseCode = courseCode;
			this.modules.push(indexToAdd);
		}
	}

	public removeModule(courseCode : string) : void { 
		const filteredArray = this.modules.filter(function(e) { return e.courseCode !== courseCode ;});
		this.modules = filteredArray;
	}

	// Clears all selected index
	public clearAllIndex(): void {
		this.modules.forEach(function(curMod){
			curMod.index = '';
		});
	}
	// Given a courseCode, change index. No checking is done so ensure that index is a valid index.
	public changeIndexFor(courseCode: string, index: string): void {
		this.modules.forEach(function(curMod){
			if(curMod.courseCode === courseCode){
				//console.log(index);
				curMod.index = index;
			}
		});
	}

	// Tries to find an index for given course code but if course code does not exist, return null
	public getIndexFor(courseCode: string): string | null {
		let ret: string | null = null;
		this.modules.forEach(function(curMod){
			if(curMod.courseCode === courseCode){
				ret = curMod.index;
			}
		});
		return ret;
	}

	// Checks if plan has module
	public hasModule(courseCode: string): boolean {
		return this.getIndexFor(courseCode)!== null;
	}

	public toString(): string{
		let returnString = '';
		this.modules.forEach(function(curMod){
			returnString = returnString + curMod.courseCode + ':' + curMod.index +",";
		});
		// Remove trailing comma
		return returnString.substring(0, returnString.length - 1);
	}

	public static fromString(str: string): TimetablePlan {
		const plan = new TimetablePlan;
		if(str===''){
			return plan;
		}
		str.split(",").forEach(function(curSubStr){
			const pair = curSubStr.split(':');
			plan.addModule(pair[0]);
			plan.changeIndexFor(pair[0], pair[1]);
		});
		return plan;
	}

	public clone(): TimetablePlan {
		return TimetablePlan.fromString(this.toString());
	}

	// Given a plan and all modules, return the activity array
	public toActivityArr(allModules: Module[]): Activity[] {
		const activities: Activity[] = [];

		this.modules.forEach((moduleIndex) => {
			const curMod = getModule(allModules, moduleIndex.courseCode);
			if(curMod !== null && moduleIndex.hasChosenIndex()){
				const index = curMod.toActivity(moduleIndex.index);
				if(index !== null){
					index.forEach( (activity)=> { activities.push(activity); });
				}
			}
		});
		return activities;
	}

	// Given a plan and all modules, check if valid
	public isValid(allModules: Module[]): boolean {
		const activities = this.toActivityArr(allModules);
		const mapAct = createTable(mapActivities(activities));
		let ret = true;
		days.forEach((day) => {
			const map = mapAct.get(day);
			if(map !== undefined){
				const tableCells = Array.from(map.values());
				const allValid = tableCells.every((cell) => {
					return cell.checkValid();
				});
				if(allValid !== true){
					ret = false;
				}
			}
		});
		return ret;
	}
}


// Contains a module and index pair. A blank index means no index is currently chosen.
export class ModuleIndex {
	courseCode = '';
	index = '';

	// Function to check if index is chosen
	public hasChosenIndex(): boolean {
		return this.index !== '';
	}
}

export class Plans {
	plan1: TimetablePlan;
	plan2: TimetablePlan;
	plan3: TimetablePlan;
	activePlan: TimetablePlan;
}