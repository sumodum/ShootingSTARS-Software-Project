import React, {useState, useEffect} from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { logout, selectUsername } from '../Reducers/UserReducer';
import { resetPlan } from '../Reducers/CurrentPlanReducer';

export default function Navbar() {
	const dispatch = useAppDispatch();
	const username = useAppSelector(selectUsername);
	const [toggleMenu, setToggleMenu] = useState(false);
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

	const toggleNav = () => {
		setToggleMenu(!toggleMenu);
	};

	const handleLogout = () => { 
		dispatch(logout());
		dispatch(resetPlan());
	};

	useEffect(() => {
			const changeWidth = () => {
			setScreenWidth(window.innerWidth);
		};

		window.addEventListener('resize', changeWidth);

		return () => {
			window.removeEventListener('resize', changeWidth);
		};

	}, []);

	return (
		<nav>
			{(toggleMenu || screenWidth > 500) && (
			<ul className="nav_link">
				<li>
					{ (username !== '') 
					? <a className="items" href="/">Welcome back, {username}</a>
					: <p></p>
					} 
				</li>
				<li>
					<a className="items" href="/">Home</a>
				</li>
				<li>
					<a className="items" href="/timetables">Timetables</a>
				</li>
				<li>
					<a className="items" href="/modules">Modules</a>
				</li>
				<li>
					{(username !== '')
					?  <a className='items' onClick={() => {handleLogout();}}>Logout</a>
					:  <a className="items" href="/login">Login/Register</a>}
				</li>
			</ul>
			)}

			{/* <button onClick={toggleNav} className="btn">BTN</button> */}
		</nav>
	);
}