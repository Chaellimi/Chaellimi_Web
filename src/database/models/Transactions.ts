import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { sequelize } from '../sequelize';

interface TransactionsModel
  extends Model<
    InferAttributes<
      TransactionsModel,
      { omit: 'createdAt' | 'updatedAt' | 'deletedAt' }
    >,
    InferCreationAttributes<
      TransactionsModel,
      { omit: 'createdAt' | 'updatedAt' | 'deletedAt' }
    >
  > {
  id: CreationOptional<number>;
  userId: number;
  type: 'withdrawal' | 'deposit';
  amount: string;
  balance_after: string;
  description: string;
  challengeId: number | null;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

const Transactions = sequelize.define<TransactionsModel>(
  'Transactions',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    type: {
      type: DataTypes.ENUM('withdrawal', 'deposit'),
      allowNull: false,
    },
    challengeId: { type: DataTypes.INTEGER, allowNull: true },
    amount: { type: DataTypes.STRING, allowNull: false },
    balance_after: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
  },
  {
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true,
    tableName: 'Transactions',
  }
);

export default Transactions;
