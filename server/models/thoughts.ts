'use strict';
import {
  Model
} from 'sequelize';
import { ThoughtI } from '../src/interfaces/Thought';
module.exports = (sequelize: any, DataTypes: any) => {
  class Thoughts extends Model<ThoughtI> implements ThoughtI{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    thoughtContent!: string;
    typeId!: number
    date!: string

    static associate(models: any) {
      // define association here
      Thoughts.belongsTo(models.User)
      Thoughts.hasOne(models.Type)
    }
  };
  Thoughts.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    thoughtContent: DataTypes.STRING,
    typeId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Thoughts',
  });
  return Thoughts;
};