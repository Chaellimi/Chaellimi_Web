import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { sequelize } from '../sequelize';

interface PointModel
  extends Model<
    InferAttributes<PointModel>,
    InferCreationAttributes<PointModel>
  > {
  id: CreationOptional<number>;
  userId: number;
  totalPoint: string;
}

const Point = sequelize.define<PointModel>(
  'Point',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    totalPoint: { type: DataTypes.STRING, allowNull: false },
  },
  {
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true,
    tableName: 'Point',
  }
);

export default Point;
