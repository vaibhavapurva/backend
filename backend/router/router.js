import express from 'express';
import { signup , login, weatherCity  , current} from '../controller/user-controller.js';

const route = express.Router();

route.post('/signup',signup);
route.post('/login',login);
route.get('/city',weatherCity);
route.get('/current',current);

export default route;