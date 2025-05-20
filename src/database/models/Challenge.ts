import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { sequelize } from '../sequelize';

interface ChallengeModel
  extends Model<
    InferAttributes<ChallengeModel>,
    InferCreationAttributes<ChallengeModel>
  > {
  id: CreationOptional<number>;
  userId: number;
  title: string;
  description: string;
  category: string;
  difficulty: 'hard' | 'normal' | 'easy';
  day: string;
  imgURL: string;
}

const Challenge = sequelize.define<ChallengeModel>(
  'Challenge',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    difficulty: {
      type: DataTypes.ENUM('hard', 'normal', 'easy'),
      allowNull: false,
    },
    day: { type: DataTypes.STRING, allowNull: false },
    imgURL: { type: DataTypes.STRING, allowNull: false },
  },
  {
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true,
    tableName: 'Challenge',
  }
);

export default Challenge;
