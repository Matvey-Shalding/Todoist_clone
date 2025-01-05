"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseService = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const Database_1 = require("../constants/Database");
const Messages_1 = require("../constants/Messages");
const formatSections_1 = require("../utils/formatSections");
const formatTasks_1 = require("../utils/formatTasks");
class Database {
    constructor() {
        this.pool = mysql2_1.default
            .createPool({
            host: Database_1.DATABASE.SQL_HOST,
            user: Database_1.DATABASE.SQL_USER,
            password: Database_1.DATABASE.SQL_PASSWORD,
            database: Database_1.DATABASE.SQL_DATABASE,
        })
            .promise();
    }
    insert(data, database, isTask) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!database)
                return;
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
                const connection = yield this.pool.getConnection();
                try {
                    yield connection.beginTransaction();
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
                        yield connection.execute(insertQuery, values);
                    }
                    yield connection.commit();
                }
                catch (err) {
                    yield connection.rollback();
                    throw err;
                }
                finally {
                    connection.release();
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    sendToServer(req) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('sending to server');
            if (req.body && 'tasks' in req.body && 'sections' in req.body && 'username' in req.body) {
                const { tasks, sections, username } = req.body;
                const userIdQuery = `SELECT user_id FROM users WHERE username = ?`;
                const id = yield this.pool.execute(userIdQuery, [username]).then((users) => {
                    if (users.length === 0) {
                        throw new Error('User not found');
                    }
                    return users[0][0].user_id;
                });
                if (!id)
                    return;
                //Delete query
                const tasksQuery = `DELETE FROM ${Database_1.DATABASE.SQL_TASK_DATABASE} WHERE user_id = ?`;
                const sectionsQuery = `DELETE FROM ${Database_1.DATABASE.SQL_SECTION_DATABASE} WHERE user_id = ?`;
                yield this.pool.execute(tasksQuery, [id]);
                yield this.pool.execute(sectionsQuery, [id]);
                //Insert tasks
                const formattedTasks = tasks.map(task => {
                    const copy = Object.assign({}, task);
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
                    this.insert(formattedTasks, Database_1.DATABASE.SQL_TASK_DATABASE, true);
                formattedSections.length > 0 &&
                    this.insert(formattedSections, Database_1.DATABASE.SQL_SECTION_DATABASE, false);
            }
        });
    }
    singUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body && 'username' in req.body && 'password' in req.body) {
                const { username, password } = req.body;
                const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
                try {
                    yield this.pool.query(sql, [username, password]);
                    res.status(200).json({ message: 'User added' });
                }
                catch (e) {
                    res.status(401).json({ message: 'Login failed. Invalid username or password.' });
                }
            }
        });
    }
    get(username) {
        return __awaiter(this, void 0, void 0, function* () {
            let userId;
            const getUsernamesQuery = `SELECT user_id FROM users WHERE username = ?`;
            const getTasksQuery = `SELECT * FROM ${Database_1.DATABASE.SQL_TASK_DATABASE}  WHERE user_id = ?`;
            const getSectionsQuery = `SELECT * FROM sections WHERE user_id = ?`;
            // Query to fetch the user ID
            return this.pool
                .execute(getUsernamesQuery, [username])
                .then((users) => {
                if (users.length === 0) {
                    throw new Error('User not found');
                }
                userId = users[0][0].user_id;
                return this.pool.execute(getTasksQuery, [userId]);
            })
                .then((_a) => __awaiter(this, [_a], void 0, function* ([tasks]) {
                const [sections] = yield this.pool.execute(getSectionsQuery, [userId]);
                const formattedTasks = (0, formatTasks_1.formatTasks)(tasks);
                const formattedSections = (0, formatSections_1.formatSections)(sections);
                const res = { tasks: formattedTasks, sections: formattedSections };
                return res;
            }))
                .catch(error => {
                return { error: error.message };
            });
        });
    }
    autoLogIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body && 'username' in req.body) {
                const { username } = req.body;
                const data = yield this.get(username);
                if ('error' in data) {
                    return;
                }
                const { tasks, sections } = data;
                if (tasks || sections) {
                    res.status(200).json({ tasks, sections });
                }
            }
        });
    }
    getUsernames() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT username FROM users`;
            const data = (yield this.pool.query(query));
            const res = data[0]
                .map((datum) => {
                return Object.values(datum);
            })
                .flat();
            return res;
        });
    }
    logIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body && 'username' in req.body && 'password' in req.body) {
                const { username, password } = req.body;
                const query = 'SELECT * FROM users WHERE username = ?';
                try {
                    const [result] = (yield this.pool.execute(query, [username]));
                    if (result.length === 0) {
                        res.send(Messages_1.MESSAGES.NO_USER_FOUND);
                    }
                    else {
                        const user = result[0];
                        if (user.password === password) {
                            const data = yield this.get(username);
                            if (!('error' in data)) {
                                const { tasks, sections } = data;
                                res.send({ tasks, sections });
                            }
                        }
                        else {
                            res.send(Messages_1.MESSAGES.WRONG_PASSWORD);
                        }
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
        });
    }
}
exports.databaseService = new Database();
