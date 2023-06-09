import { DataTypes, Model } from 'sequelize';
import { sequelize } from "../utils/db";
import { User as UserInterface } from '../types/User';

export enum UserRole {
  Admin = 'admin',
  Boss = 'boss',
  Regular = 'regular',
}

export type UserModel = Model & UserInterface;

export const User = sequelize.define<UserModel>('user', {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },

  password : {
    type: DataTypes.STRING,
    allowNull: false,
  },

  role: {
    type: DataTypes.ENUM(...Object.values(UserRole)),
    allowNull: false,
  },

  bossId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  }
});

User.hasMany(User, { foreignKey: 'bossId', as: 'subordinates' });
User.belongsTo(User, { foreignKey: 'bossId', as: 'boss' });

