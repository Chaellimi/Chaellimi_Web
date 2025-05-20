import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { sequelize } from '../sequelize';

interface ChallengeParticipantsModel
  extends Model<
    InferAttributes<ChallengeParticipantsModel>,
    InferCreationAttributes<ChallengeParticipantsModel>
  > {
  id: CreationOptional<number>;
  userId: number;
  challengeId: number;
  joinedAt: string;
  streak: string;
  status: string;
}

const ChallengeParticipants = sequelize.define<ChallengeParticipantsModel>(
  'ChallengeParticipants',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    challengeId: { type: DataTypes.INTEGER, allowNull: false },
    joinedAt: { type: DataTypes.STRING, allowNull: false },
    streak: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
  },
  {
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true,
    tableName: 'ChallengeParticipants',
  }
);

export default ChallengeParticipants;
