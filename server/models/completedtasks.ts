'use strict';
import {
  Model
} from 'sequelize';
import { CompletedI } from '../src/interfaces/Completed';
module.exports = (sequelize: any, DataTypes: any) => {
  class CompletedTasks extends Model<CompletedI> implements CompletedI{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

     id!: number;
     taskTitle!: string;
     typeId!: string;
     date!: string;
     taskId!: number;
     completed!: boolean;

    static associate(models: any) {
      // define association here
      CompletedTasks.belongsTo(models.User);
    }
  };
  CompletedTasks.init({
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
      type: DataTypes.STRING,
      allowNull: false
    },
    taskId: {
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
    modelName: 'CompletedTasks',
  });
  return CompletedTasks;
};