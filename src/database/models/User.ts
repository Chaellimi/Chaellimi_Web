import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '../sequelize';

if (sequelize.models.Users) {
  delete sequelize.models.Users;
}

interface UsersModel
  extends Model<
    InferAttributes<UsersModel>,
    InferCreationAttributes<UsersModel>
  > {
  userId: CreationOptional<number>;
  authId: string;
  email: string;
  name: string;
  refreshToken: string | null;
  profileImg: string;
  provider: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

const Users = sequelize.define<UsersModel>(
  'Users',
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    authId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profileImg: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['kakao', 'google']],
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user',
      validate: {
        isIn: [['user', 'admin']],
      },
    },
  },
  {
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true,
    modelName: 'Users',
    tableName: 'Users',
  }
);

export default Users;
