import express from 'express';
const app = express();
const port = 4000;
import cors from 'cors';
import path from 'path';

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

class UserAccount {
	username: string;
	password: string;
	data: string;
	email: string;

	constructor(username: string, password: string, email: string, data: string){
		this.data = data;
		this.password = password;
		this.username = username;
		this.email = email;
	}
}

const storageData: UserAccount[] = [
	new UserAccount("taiAnn", "123", "", ""),
	new UserAccount("damien", "456", "", "")
];

app.get('/api/login', (req, res) => {
	console.log('Login received');
	console.log('Username: ' + req.query['username']);
	console.log('Password: '+ req.query['password']);
	let found: UserAccount | undefined = undefined;
	storageData.forEach((userAcc) => {
		if(userAcc.username === req.query['username'] && userAcc.password === req.query['password']){
			found = userAcc;
		}
	});
	if(found !== undefined){
		res.json({
			status: 0,
			plan: found.data
		});
	}
	else{
		res.json({
			status: 1
		});
	}
});

app.post('/api/savePlan', (req, res) => {
	console.log('savePlan received');
	console.log('Username: ' + req.body.username);
	console.log('Plan: ' + req.body.plan);
	let found: UserAccount | undefined = undefined;
	storageData.forEach((userAcc) => {
		if(userAcc.username === req.body.username){
			found = userAcc;
		}
	});
	if(found !== undefined){
		found.data = req.body.plan as string;
		res.json({
			status: 0,
		});
	}
	else{
		res.json({
			status: 1
		});
	}
});

app.post('/api/register', (req, res) => {
	console.log('register received');
	console.log(req.body);
	let found: UserAccount | undefined = undefined;
	storageData.forEach((userAcc) => {
		if(userAcc.username === req.body.username){
			found = userAcc;
		}
	});
	if(found === undefined){
		console.log("account created" + req.body.username + req.body.password); 
		storageData.push(new UserAccount(req.body.username, req.body.password, req.body.email, ""));
		res.json({
			status: 0,
		});
	}
	else{
		res.json({
			status: 1
		});
	}
});
const __dirname = path.resolve();
app.use(express.static(path.resolve(__dirname, '../cz3002/build')));

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../cz3002/build', 'index.html'));
  });

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});