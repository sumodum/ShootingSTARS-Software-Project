import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {TimetablePlan} from '../Types/Timetable';
import axios from 'axios';


export interface currentPlanState { 
    currentPlan : string;
    planOne : string; 
    planTwo : string; 
    planThree : string; 
}

const initialState: currentPlanState = { 
    currentPlan: new TimetablePlan().toString(),
    planOne: new TimetablePlan().toString(),
    planTwo: new TimetablePlan().toString(),
    planThree: new TimetablePlan().toString(),
};


export const currentPlanSlice = createSlice({
    name: 'currentPlan',
    initialState,
    reducers: { 
        addPlan : (state, action: PayloadAction<[string,string]>) => {
            // state.currentPlan.addModule(action.payload);
            const plan = TimetablePlan.fromString(state.currentPlan); //change currentPlan from string to TimetablePlan 
            plan.addModule(action.payload[0]); //add module to timetablePlan 
            state.currentPlan = plan.toString(); //change timetablePlan to string and store 
            //state.currentPlan.push(action.payload);
            if (action.payload[1] !== ''){ 
                const obj = {"currentPlan":state.currentPlan, "planOne":state.planOne,"planTwo":state.planTwo,"planThree":state.planThree}; 
                const myJSON = JSON.stringify(obj);
                const params = new URLSearchParams();
                    params.append('username', action.payload[1]);
                    params.append('plan', myJSON);
                    axios.post('/api/savePlan',params)
                    .then(res => {
                        console.log(res);
                        if (res.data.status === 1){ 
                            alert('error!'); 
                        }
                        if (res.data.status === 0) { 
                            console.log("saved to user: "+  myJSON);
                        }
                    });
            }
        },
        removeFromPlan : (state,action:PayloadAction<[string,string]>) => { 
            const plan = TimetablePlan.fromString(state.currentPlan); //change currentPlan from string to TimetablePlan 
            plan.removeModule(action.payload[0]); //add module to timetablePlan 
            state.currentPlan = plan.toString(); //change timetablePlan to string and store
            
            if (action.payload[1] !== ''){ 
                const obj = {"currentPlan":state.currentPlan, "planOne":state.planOne,"planTwo":state.planTwo,"planThree":state.planThree}; 
                const myJSON = JSON.stringify(obj);
                const params = new URLSearchParams();
                    params.append('username', action.payload[1]);
                    params.append('plan', myJSON);
                    axios.post('/api/savePlan',params)
                    .then(res => {
                        console.log(res);
                        if (res.data.status === 1){ 
                            alert('error!'); 
                        }
                        if (res.data.status === 0) { 
                            console.log("saved to user: "+  myJSON);
                        }
                    });
            }
        },
        resetPlan : (state) => {
            state.currentPlan = new TimetablePlan().toString();
        },

        changeIndex : (state, action: PayloadAction<[string,string,string]>) => {
            const plan = TimetablePlan.fromString(state.currentPlan); 
            plan.changeIndexFor(action.payload[0],action.payload[1]); //courseCode,newIndex passed in 
            state.currentPlan = plan.toString();

            if (action.payload[2] !== ''){ 
                const obj = {"currentPlan":state.currentPlan, "planOne":state.planOne,"planTwo":state.planTwo,"planThree":state.planThree}; 
                const myJSON = JSON.stringify(obj);
                const params = new URLSearchParams();
                    params.append('username', action.payload[2]);
                    params.append('plan', myJSON);
                    axios.post('/api/savePlan',params)
                    .then(res => {
                        console.log(res);
                        if (res.data.status === 1){ 
                            alert('error!'); 
                        }
                        if (res.data.status === 0) { 
                            console.log("saved to user: "+  myJSON);
                        }
                    });
            }
        },
        loadToCurrent : (state, action: PayloadAction<string> ) => { 
            // action.payload has to be TimetablePlan converted to string format! 
            switch(action.payload) {
                case '1':
                  state.currentPlan = state.planOne;
                  break;
                case '2':
                    state.currentPlan = state.planTwo;
                  break;
                case '3':
                    state.currentPlan = state.planThree; 
                    break;

                default:
                    console.log("Error in loading to current plan!");
              }
            console.log("LOADING PLAN " + action.payload);
        }, 

        saveCurrentTo : (state, action: PayloadAction<[string,string]> ) => { 
            // action.payload[1] is currentPlan 
            switch(action.payload[0]) {
                case '1':
                    state.planOne = state.currentPlan;
                    break;
                case '2':
                    state.planTwo = state.currentPlan;
                    break;
                case '3':
                    state.planThree = state.currentPlan;
                    break;

                default:
                    console.log("Error in saving to plan!");
              }
            if (action.payload[1] !== ''){ 
                const obj = {"currentPlan":state.currentPlan, "planOne":state.planOne,"planTwo":state.planTwo,"planThree":state.planThree}; 
                const myJSON = JSON.stringify(obj);
                const params = new URLSearchParams();
                    params.append('username', action.payload[1]);
                    params.append('plan', myJSON);
                    axios.post('/api/savePlan',params)
                    .then(res => {
                        console.log(res);
                        if (res.data.status === 1){ 
                            alert('error.'); 
                        }
                        if (res.data.status === 0) { 
                            console.log("saved to user: "+  myJSON);
                        }
                    });
            }
            
            console.log("SAVING TO PLAN " + action.payload);
        }, 

        //on successful login, we load the user's currentPlan to browser and replace everything 
        
        loadFromLogin: (state,action: PayloadAction<[string,string,string,string]>) => { 
            state.currentPlan = action.payload[0]; 
            state.planOne = action.payload[1]; 
            state.planTwo = action.payload[2]; 
            state.planThree = action.payload[3]; 
        }, 
        //load from import into currentPlan 
        loadFromImport: (state,action:PayloadAction<string>) => { 
            state.currentPlan = action.payload; 
        },


    }

});
export const { addPlan,resetPlan,changeIndex,removeFromPlan,loadToCurrent,saveCurrentTo,loadFromImport,loadFromLogin} = currentPlanSlice.actions;
export const selectCurrentPlan = (state: RootState):TimetablePlan => TimetablePlan.fromString(state.currentPlan.currentPlan);
// export const loadCurrentPlan = (state: RootState):string => state.currentPlan.currentPlan;
export const selectPlanOne = (state: RootState):TimetablePlan => TimetablePlan.fromString(state.currentPlan.planOne);
export const selectPlanTwo = (state: RootState):TimetablePlan => TimetablePlan.fromString(state.currentPlan.planTwo);
export const selectPlanThree = (state: RootState):TimetablePlan => TimetablePlan.fromString(state.currentPlan.planThree);
export const selectPlanOneString = (state:RootState):string => state.currentPlan.planOne;
export const selectPlanTwoString = (state:RootState):string => state.currentPlan.planTwo;
export const selectPlanThreeString = (state:RootState):string => state.currentPlan.planThree;
export default currentPlanSlice.reducer;

