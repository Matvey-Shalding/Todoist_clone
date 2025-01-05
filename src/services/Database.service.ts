import mysql from 'mysql2';
import { DATABASE } from '../constants/Database';
import { MESSAGES } from '../constants/Messages';
import { ServerData } from '../types/ServerData.interface';
import { ServerResponse } from '../types/ServerResponse.interface';
import { ServerResponseError } from '../types/ServerResponseError';
import { formatSections } from '../utils/formatSections';
import { formatTasks } from '../utils/formatTasks';
class Database {
	readonly pool = mysql
		.createPool({
			host: DATABASE.SQL_HOST,
			user: DATABASE.SQL_USER,
			password: DATABASE.SQL_PASSWORD,
			database: DATABASE.SQL_DATABASE,
		})
		.promise();

	async insert(data: any[], database: string | undefined, isTask?: boolean): Promise<void> {
		if (!database) return;
		// Extract field names from the first task object
		const fieldNames = isTask
			? [
					'user_id',
					'label',
					'title',
					'description',
					'date',
					'priority',
					'section',
					'time',
					'id',
					'createdAt',
			  ]
			: Object.keys(data[0]);
		//TODO: COMPARE QUERY AND PHOTO

		try {
			const connection = await this.pool.getConnection();
			try {
				await connection.beginTransaction();

				// Dynamically create placeholders for query
				const placeholders = fieldNames.map(() => '?').join(', ');

				// Create the insert query

				const insertQuery = `
                INSERT INTO ${database} (${fieldNames.join(', ')})
                VALUES (${placeholders})
            `;

				// Insert each task
				for (const datum of data) {
					const values = fieldNames.map(field => {
						console.log(field, datum[field]);
						return datum[field] ? datum[field] : '';
					});
					console.log(insertQuery, values);
					await connection.execute(insertQuery, values);
				}

				await connection.commit();
			} catch (err) {
				await connection.rollback();
				throw err;
			} finally {
				connection.release();
			}
		} catch (err) {
			throw err;
		}
	}

	async sendToServer(req: any): Promise<void> {
		console.log('sending to server');
		if (req.body && 'tasks' in req.body && 'sections' in req.body && 'username' in req.body) {
			const { tasks, sections, username } = req.body as ServerData;
			const userIdQuery = `SELECT user_id FROM users WHERE username = ?`;
			const id = await this.pool.execute(userIdQuery, [username]).then((users: any[]) => {
				if (users.length === 0) {
					throw new Error('User not found');
				}
				return users[0][0].user_id;
			});
			if (!id) return;

			//Delete query
			const tasksQuery = `DELETE FROM ${DATABASE.SQL_TASK_DATABASE} WHERE user_id = ?`;
			const sectionsQuery = `DELETE FROM ${DATABASE.SQL_SECTION_DATABASE} WHERE user_id = ?`;
			await this.pool.execute(tasksQuery, [id]);
			await this.pool.execute(sectionsQuery, [id]);

			//Insert tasks

			const formattedTasks = tasks.map(task => {
				const copy = { ...task };
				delete copy.isVisible;
				if (!copy.label) {
					delete copy.label;
				}
				if (!copy.section) {
					delete copy.section;
				}
				if (!copy.time) {
					delete copy.time;
				}
				copy.user_id = id;
				return copy;
			});
			const formattedSections = sections.map(section => {
				return {
					section,
					user_id: id,
				};
			});
			formattedTasks.length > 0 &&
				this.insert(formattedTasks, DATABASE.SQL_TASK_DATABASE, true);
			formattedSections.length > 0 &&
				this.insert(formattedSections, DATABASE.SQL_SECTION_DATABASE, false);
		}
	}

	async singUp(req: any, res: any): Promise<void> {
		if (req.body && 'username' in req.body && 'password' in req.body) {
			const { username, password } = req.body;
			const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
			try {
				await this.pool.query(sql, [username, password]);
				res.status(200).json({ message: 'User added' });
			} catch (e) {
				res.status(401).json({ message: 'Login failed. Invalid username or password.' });
			}
		}
	}

	async get(username: string): Promise<ServerResponse | ServerResponseError> {
		let userId: number;
		const getUsernamesQuery = `SELECT user_id FROM users WHERE username = ?`;
		const getTasksQuery = `SELECT * FROM ${DATABASE.SQL_TASK_DATABASE}  WHERE user_id = ?`;
		const getSectionsQuery = `SELECT * FROM sections WHERE user_id = ?`;
		// Query to fetch the user ID
		return this.pool
			.execute(getUsernamesQuery, [username])
			.then((users: any[]) => {
				if (users.length === 0) {
					throw new Error('User not found');
				}

				userId = users[0][0].user_id;

				return this.pool.execute(getTasksQuery, [userId]);
			})
			.then(async ([tasks]) => {
				const [sections] = await this.pool.execute(getSectionsQuery, [userId]);
				const formattedTasks = formatTasks(tasks as any[]);
				const formattedSections = formatSections(sections as any[]);
				const res = { tasks: formattedTasks, sections: formattedSections } as ServerResponse;
				return res;
			})
			.catch(error => {
				return { error: error.message };
			});
	}
	async autoLogIn(req: any, res: any): Promise<void> {
		if (req.body && 'username' in req.body) {
			const { username } = req.body;
			const data = await this.get(username as string);
			if ('error' in data) {
				return;
			}
			const { tasks, sections } = data;
			if (tasks || sections) {
				res.status(200).json({ tasks, sections });
			}
		}
	}

	async getUsernames() {
		const query = `SELECT username FROM users`;
		const data = (await this.pool.query(query)) as any[];
		const res = data[0]
			.map((datum: any) => {
				return Object.values(datum);
			})
			.flat();
		return res;
	}

	async logIn(req: any, res: any): Promise<void> {
		if (req.body && 'username' in req.body && 'password' in req.body) {
			const { username, password } = req.body;
			const query = 'SELECT * FROM users WHERE username = ?';
			try {
				const [result] = (await this.pool.execute(query, [username])) as any[];
				if (result.length === 0) {
					res.send(MESSAGES.NO_USER_FOUND);
				} else {
					const user = result[0];
					if (user.password === password) {
						const data = await this.get(username);
						if (!('error' in data)) {
							const { tasks, sections } = data;
							res.send({ tasks, sections });
						}
					} else {
						res.send(MESSAGES.WRONG_PASSWORD);
					}
				}
			} catch (error) {
				console.log(error);
			}
		}
	}
}

export const databaseService = new Database();
