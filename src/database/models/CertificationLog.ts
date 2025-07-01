import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { sequelize } from '../sequelize';

interface CertificationLogModel
  extends Model<
    InferAttributes<CertificationLogModel>,
    InferCreationAttributes<CertificationLogModel>
  > {
  id: CreationOptional<number>;
  userId: number;
  challengeId: number;
  imgURL: string;
  certifiedAt: string; // YYYY-MM-DD 형식으로 저장
}

const CertificationLog = sequelize.define<CertificationLogModel>(
  'CertificationLog',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    challengeId: { type: DataTypes.INTEGER, allowNull: false },
    imgURL: { type: DataTypes.STRING, allowNull: false },
    certifiedAt: { type: DataTypes.STRING, allowNull: false },
  },
  {
    paranoid: true,
    timestamps: true,
    tableName: 'CertificationLog',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  }
);

export default CertificationLog;
