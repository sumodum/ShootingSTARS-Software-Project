import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Module } from '../Types/Module';

function createData(Indexes:any, Type:any, Group:any, Day:any, Venue:string) {
  return { Indexes,Type,Group,Day,Venue };
}

export interface IndexesProps {
  current: Module;
}

export default function Indexes(props: IndexesProps) {
    const currentModule = props.current; 

    const rows:any[] = [];

    // Create array of objects with index on the first instance of an index.
    // This allows us later to output a table with the index on the first row only.
    currentModule.indexes.forEach(function(index) {
        const i = index.index;
        let firstLesson = true;
        index.lessons.forEach(function(lesson){
            if (firstLesson) {
                rows.push(createData(i,lesson.type,lesson.group,lesson.day,lesson.venue));
                firstLesson=false;
            }
            else {
                rows.push(createData('',lesson.type,lesson.group,lesson.day,lesson.venue));
            }
        });

    });

    


  return (
    <TableContainer style={{paddingLeft:'3em',paddingRight:'3em',paddingBottom:'2em'}} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Index</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Group&nbsp;</TableCell>
            <TableCell align="right">Day&nbsp;</TableCell>
            <TableCell align="right">Venue&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.Indexes}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Indexes}
              </TableCell>
              <TableCell align="right">{row.Type}</TableCell>
              <TableCell align="right">{row.Group}</TableCell>
              <TableCell align="right">{row.Day}</TableCell>
              <TableCell align="right">{row.Venue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// example of one module
//     _id: "629e10caf16fa67974adf4e0",
//     courseCode: "AAA08B",
//     courseName: "FASHION & DESIGN: WEARABLE ART AS A SECOND SKIN*~",
//     courseAUs: "3.0 AU",
//     indexes: [
//         {
//         _id: "629e10caf16fa67974adf4e1",
//         indexNo: "39614",
//         lessons: [
//         {
        //     _id: "629e10caf16fa67974adf4e2",
        //     type: "LEC/STUDIO",
        //     group: "LE",
        //     day: "THU",
        //     venue: "NIE7-02-07",
        //     teachingWeeks: "",
        //     startTime: "2021-01-01T05:30:00.000Z",
        //     endTime: "2021-01-01T08:20:00.000Z"
