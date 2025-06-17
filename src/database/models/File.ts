import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize';
import Users from './User';

const File = sequelize.define(
  'File',
  {
    FileId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fileUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true,
    tableName: 'Files',
  }
);

File.belongsTo(Users, { foreignKey: 'userId', as: 'user' });
Users.hasMany(File, { foreignKey: 'userId', as: 'files' });

export default File;
