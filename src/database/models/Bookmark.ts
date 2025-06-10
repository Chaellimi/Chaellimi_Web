import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { sequelize } from '../sequelize';

interface BookmarkModel
  extends Model<
    InferAttributes<BookmarkModel>,
    InferCreationAttributes<BookmarkModel>
  > {
  id: CreationOptional<number>;
  userId: number;
  challengeId: number;
}

const Bookmark = sequelize.define<BookmarkModel>(
  'Bookmark',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    challengeId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true,
    tableName: 'Bookmark',
  }
);

export default Bookmark;
