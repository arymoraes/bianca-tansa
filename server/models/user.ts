'use strict';
import {
  Model
} from 'sequelize';
import { UserI } from '../src/interfaces/User';
module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserI> implements UserI {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;
    static associate(models: any) {
      // define association here

      User.hasMany(models.Tasks, {
        foreignKey: {
          allowNull: false
        }
      })

      User.hasMany(models.Thoughts, {
        foreignKey: {
          allowNull: false
        }
      })

      User.hasMany(models.CompletedTasks, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  };
  User.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true //so no two users have the same e-mail address
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};