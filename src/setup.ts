import 'dotenv/config';
import { sequelize } from "./utils/db";
import './models/User'

sequelize.sync({ force: true });
