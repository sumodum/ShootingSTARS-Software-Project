import { Activity } from './Activity';

// Class representing all info about a module
export class Module {
	courseCode: string;
	courseName: string;
	courseDescription = '';
	courseAUs: string;
	gradingType: string;
	offeredBy: string;
	availableAs: string[];
	prereq: string;
	mutualExclusive: string[];
	indexes: Array<{index: string, lessons: Lesson[]}> = [];

	// Takes a fetched json file processed by .json().
	public static createModules(jsonObj: any[]): Module[] {
		const moduleList: Module[] = jsonObj.map(function(currentObj){
			const moduleToAdd = new Module();
			moduleToAdd.courseCode = currentObj.courseCode;
			moduleToAdd.courseName = currentObj.courseName;
			moduleToAdd.courseDescription = currentObj.description;
			moduleToAdd.courseAUs = currentObj.courseAUs;
			moduleToAdd.indexes = [];
			moduleToAdd.gradingType = currentObj.gradingType;
			moduleToAdd.offeredBy = currentObj.offeredBy;
			moduleToAdd.availableAs = currentObj.availableAs;
			moduleToAdd.prereq = currentObj.prerequisites;
			// Some mutual exclusive aren't present causing them to be possibly undefined
			if(currentObj.mutualExclusive === undefined){
				moduleToAdd.mutualExclusive = [];
			}
			else{
				// Mutual exclusive has leading and trailing whitespace so remove.
				moduleToAdd.mutualExclusive = currentObj.mutualExclusive.map((curMutualEx: string) => curMutualEx.trim());
			}
			currentObj.indexes.forEach(function(currIndex: any){
				moduleToAdd.indexes.push({
					index: currIndex.indexNo,
					lessons: Lesson.createLessons(currIndex.lessons)
				});
			});
			return moduleToAdd;
		});
		return moduleList;
	}


	// Converts to an Activity[], null if there was no index for the module.
	public toActivity(index: string): Activity[] | null {
		const foundIndex = this.indexes.find( (curIndex) => curIndex.index === index );
		if(foundIndex === undefined){
			return null;
		}
		else{
			const arr = foundIndex.lessons.map((curLesson) => {
				return new Activity(this.courseCode, curLesson.day, curLesson.venue, curLesson.teachingWeeks, curLesson.time);
			});
			return arr;
		}
	}
}

// Given an array of module (which can be taken from Redux, putting it here would be a bad idea) and a module code return the module, or null if code does not exist
export function getModule( arr: Module[] , moduleCode: string ): Module | null {
	const module = arr.find((curMod) => curMod.courseCode.toUpperCase() === moduleCode.toUpperCase() );
	if(module === undefined) {
		return null;
	}
	else{
		return module;
	}
}

// Class representing info about a lesson, such as a tutorial or a lecture.
export class Lesson {
	type: string;
	group: string;
	day: string;
	venue: string;
	teachingWeeks: string;
	time: string;

	// Converts JSON array into a Lesson array
	public static createLessons(jsonObj: any[]): Lesson[] {
		return jsonObj.map(function(currentObj){
			const lessonToAdd = new Lesson();
			lessonToAdd.type = currentObj.type;
			lessonToAdd.group = currentObj.group;
			lessonToAdd.day = currentObj.day;
			lessonToAdd.venue = currentObj.venue;
			lessonToAdd.teachingWeeks = currentObj.teachingWeeks;
			lessonToAdd.time = currentObj.time;
			return lessonToAdd;
		});
	}
}