import * as React from 'react';
import WeeklyTimetable from "./weeklyTimetable";
import { useAppSelector } from '../hooks';
import { loadFromImport, selectCurrentPlan } from '../Reducers/CurrentPlanReducer';
import { Button } from '@mui/material';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useAppDispatch } from '../hooks';
import UpgradeIcon from '@mui/icons-material/Upgrade';

export default function CurrentWeeklyTimetable(){
	const dispatch = useAppDispatch();
	const currentPlan = useAppSelector(selectCurrentPlan);

	const createPDF = async () => {
		const pdf = new jsPDF("landscape", "pt", "a4");
		const data = await html2canvas(document.querySelector("#pdf") as HTMLElement);
		const img = data.toDataURL("image/png");  
		const imgProperties = pdf.getImageProperties(img);
		const pdfWidth = pdf.internal.pageSize.getWidth();
		const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
		pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
		pdf.save("Timetable.pdf");
	};


	const createText = async () => { 
		const toDownload = currentPlan.toString();
		const element = document.createElement("a");
		const file = new Blob([toDownload], {type: 'text/plain'});
		element.href = URL.createObjectURL(file);
		element.download = "Timetable.txt";
		document.body.appendChild(element); // Required for this to work in FireFox
		element.click();
	};

	async function readFile(file: FileList): Promise<string | null>{
		const reader = new FileReader();
		reader.readAsText(file[0]);
		return new Promise(resolve => reader.onload = () => resolve(reader.result as string | null));
	}

	const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {files} = e.target;
		
		if(files !== null){
			readFile(files).then((value) => {
				if(value !== null){
					// File uploaded, read it and process
					dispatch(loadFromImport(value));
					window.location.reload();
				}
			});
		}
	};


	return(
		<div className='homeTimetable'>
			<div id="pdf">
				<WeeklyTimetable  plan={currentPlan} />
			</div>
			<div className='ImportExportField'>
				<label style={{cursor:'pointer',textAlign:'center',padding:'1em'}}>
					Upload Plan <br></br>
					<UpgradeIcon />
					<input style={{display:'none'}}type="file" onChange={uploadFile}></input>
				</label>
				
				<Button className='removeBtn' onClick={createPDF}>Export PDF</Button>
				<Button className='removeBtn' onClick={createText}>Export JSON</Button>
			</div>
			
		</div>
	);
}



