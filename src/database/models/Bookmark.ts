import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../sequelize';

interface BookmarkAttributes {
  id: number;
  challengeId: number;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type BookmarkCreationAttributes = Optional<BookmarkAttributes, 'id'>;

class Bookmark
  extends Model<BookmarkAttributes, BookmarkCreationAttributes>
  implements BookmarkAttributes
{
  public id!: number;
  public challengeId!: number;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Bookmark.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    challengeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Challenge',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'userId',
      },
    },
  },
  {
    sequelize,
    modelName: 'Bookmark',
    tableName: 'Bookmark',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['challengeId', 'userId'], // 같은 사용자가 같은 챌린지를 중복으로 북마크할 수 없도록
      },
    ],
  }
);

export default Bookmark;
