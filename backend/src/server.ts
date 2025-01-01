import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { REQUEST } from './constants/Request';
import { databaseService } from './services/Database.service';

dotenv.config();

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.get('/users', async (req, res) => {
	const userNames = await databaseService.getUsernames()
	res.json(userNames);
});
app.post('/users', async (req, res) => {
	if ('purpose' in req.body) {
		switch (req.body.purpose) {
			case REQUEST.AUTO_LOG_IN:
				databaseService.autoLogIn(req, res);
				break;

			case REQUEST.SING_UP: {
				databaseService.singUp(req, res);
				break;
			}

			case REQUEST.SEND_TO_SERVER: {
				console.log('hello')
				databaseService.sendToServer(req);
			}
				
			case REQUEST.LOG_IN: {
				{
				databaseService.logIn(req,res)
			}}

			default:
				break;
		}
	}
});

const PORT = 3000;

app.listen(PORT, () => {
	console.log('Server is running on port ' + PORT);
});
