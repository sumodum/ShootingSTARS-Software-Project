import React from 'react';
import HomePageSearch from '../Components/HomePageSearch';
import CurrentPlan from '../Components/CurrentPlan';
import CurrentWeeklyTimetable from '../Components/CurrentWeeklyTimetable';

const Home = () => {
	return (
		<div className='Page'>
			<div className='Home1'>
				<CurrentWeeklyTimetable/>	
				<CurrentPlan/>
			</div>	
			<HomePageSearch/>		
		</div>
	);
};
	
export default Home;