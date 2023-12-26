import React, {useState} from 'react';
import TextField from "@mui/material/TextField";
import ModuleList from '../Components/ModuleList';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Typography } from '@mui/material';
const Modules = () => {
	const [inputText, setInputText] = useState("");
	const [school,setSchool] = useState('');
	const [type,setType] = useState('');

	const inputHandler = (e: any) => {
		//convert input text to lower case
		const lowerCase = e.target.value.toLowerCase();
		setInputText(lowerCase);
	};

	const handleSchool = (event: SelectChangeEvent) => {
		setSchool(event.target.value);
	};

	const handleType = (event: SelectChangeEvent) => {
		setType(event.target.value);
	};

	return (
		<div className='ModulePage'>
			<div>
				<Typography variant='h3' style={{textDecoration:'underline'}}>Modules</Typography>
			</div>
			<div className="Filter">
				<TextField
					id="outlined-basic"
					onChange={inputHandler}
					variant="outlined"
					fullWidth
					label="Search"
				/>
				<Box sx={{ minWidth: 120 }}>
					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label-school">School</InputLabel>
						<Select
							labelId="demo-simple-select-label-school"
							id="demo-simple-select-school"
							value={school}
							label="School"
							onChange={handleSchool}
						>
							<MenuItem value={''}>ALL SCHOOLS</MenuItem>
							<MenuItem value={'NIE'}>NIE</MenuItem>
							<MenuItem value={'SSM(NIE)'}>SSM(NIE)</MenuItem>
							<MenuItem value={'ACC'}>ACC</MenuItem>
							<MenuItem value={'BUS'}>BUS</MenuItem>
							<MenuItem value={'BIE(CBE)'}>BIE(CBE)</MenuItem>
							<MenuItem value={'BS'}>BS</MenuItem>
							<MenuItem value={'BMS(BS)'}>BMS(BS)</MenuItem>
							<MenuItem value={'BSB(BS)'}>BSB(BS)</MenuItem>
							<MenuItem value={'CBE'}>CBE</MenuItem>
							<MenuItem value={'CHEM(CBE)'}>CHEM(CBE)</MenuItem>
							<MenuItem value={'BSB'}>BSB</MenuItem>
							<MenuItem value={'CE'}>CE</MenuItem>
							<MenuItem value={'CSC(CE)'}>CSC(CE)</MenuItem>
							<MenuItem value={'CS'}>CS</MenuItem>
							<MenuItem value={'CEE'}>CEE</MenuItem>
							<MenuItem value={'MS(CEE)'}>MS(CEE)</MenuItem>
							<MenuItem value={'ENE(CEE)'}>ENE(CEE)</MenuItem>
							<MenuItem value={'SOH'}>SOH</MenuItem>
							<MenuItem value={'HIST(SOH)'}>HIST(SOH)</MenuItem>
							<MenuItem value={'ELH(SOH)'}>ELH(SOH)</MenuItem>
							<MenuItem value={'PHIL(SOH)'}>PHIL(SOH)</MenuItem>
							<MenuItem value={'LMS(SOH)'}>LMS(SOH)</MenuItem>
							<MenuItem value={'SPS'}>SPS</MenuItem>
							<MenuItem value={'MATH(SPS)'}>MATH(SPS)</MenuItem>
							<MenuItem value={'PHY(SPS)'}>PHY(SPS)</MenuItem>
							<MenuItem value={'ADM'}>ADM</MenuItem>
							<MenuItem value={'EEE'}>EEE</MenuItem>
							<MenuItem value={'ASE'}>ASC</MenuItem>
							<MenuItem value={'EESS(ASE)'}>EESS(ASE)</MenuItem>
							<MenuItem value={'NTC'}>NTC</MenuItem>
							<MenuItem value={'ME'}>ME</MenuItem>
							<MenuItem value={'AERO(ME)'}>AERO(ME)</MenuItem>
							<MenuItem value={'SSS'}>SSS</MenuItem>
							<MenuItem value={'PPGA(SSS)'}>PPGA(SSS)</MenuItem>
							<MenuItem value={'CHIN(SOH)'}>CHIN(SOH)</MenuItem>
							<MenuItem value={'ECON(SSS)'}>ECON(SSS)</MenuItem>
							<MenuItem value={'SSS'}>SSS</MenuItem>
							<MenuItem value={'EEE'}>EEE</MenuItem>
							<MenuItem value={'IEM(EEE)'}>IEM(EEE)</MenuItem>
							<MenuItem value={'MED'}>MED</MenuItem>
							<MenuItem value={'CAO'}>CAO</MenuItem>
							<MenuItem value={'MAT'}>MAT</MenuItem>
							<MenuItem value={'REP'}>REP</MenuItem>

						</Select>
					</FormControl>
				</Box>

				<Box sx={{ minWidth: 120 }}>
					<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label-type">Type</InputLabel>
						<Select
							labelId="demo-simple-select-label-type"
							id="demo-simple-select-type"
							value={type}
							label="Type"
							onChange={handleType}
						>
							<MenuItem value={''}>ALL</MenuItem>
							<MenuItem value={'GERPE(STS)'}>GERPE(STS)</MenuItem>
							<MenuItem value={'GERPE(LA)'}>GERPE(LA)</MenuItem>
							<MenuItem value={'GERPE(BM)'}>GERPE(BM)</MenuItem>
							<MenuItem value={'UE'}>UE</MenuItem>
							<MenuItem value={'BDE'}>BDE</MenuItem>
						</Select>
					</FormControl>
				</Box>
			</div>
			<ModuleList input={inputText} school={school} type={type}/>
		</div>
	);
};
	
export default Modules;