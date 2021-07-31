'use strict';
import {
  Model
} from 'sequelize';
import { TypeI } from '../src/interfaces/Type';
module.exports = (sequelize: any, DataTypes: any) => {
  class Type extends Model<TypeI> implements TypeI {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     id!: number
     name!: string
    static associate(models: any) {
      // define association here
    }
  };
  Type.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Type',
  });
  return Type;
};