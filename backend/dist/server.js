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
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const Request_1 = require("./constants/Request");
const Database_service_1 = require("./services/Database.service");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userNames = yield Database_service_1.databaseService.getUsernames();
    res.json(userNames);
}));
app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if ('purpose' in req.body) {
        switch (req.body.purpose) {
            case Request_1.REQUEST.AUTO_LOG_IN:
                Database_service_1.databaseService.autoLogIn(req, res);
                break;
            case Request_1.REQUEST.SING_UP: {
                Database_service_1.databaseService.singUp(req, res);
                break;
            }
            case Request_1.REQUEST.SEND_TO_SERVER: {
                console.log('hello');
                Database_service_1.databaseService.sendToServer(req);
            }
            case Request_1.REQUEST.LOG_IN: {
                {
                    Database_service_1.databaseService.logIn(req, res);
                }
            }
            default:
                break;
        }
    }
}));
const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});
