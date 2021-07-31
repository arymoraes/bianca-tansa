'use strict';
import {
  Model
} from 'sequelize';
import { TaskI } from '../src/interfaces/Task';
module.exports = (sequelize: any, DataTypes: any) => {
  class Tasks extends Model<TaskI> implements TaskI{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     id!: number;
     taskTitle!: string;
     typeId!: number;
     date!: string;
     completed!: boolean;
    static associate(models: any) {
      // define association here
      Tasks.belongsTo(models.User);
      Tasks.hasOne(models.Type)
    }
  };
  Tasks.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    taskTitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    typeId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Tasks',
  });
  return Tasks;
};