import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../sequelize';

interface CustodyAttributes {
  id: number;
  productId: number;
  inventoryId: number;
  userId: number;
}

type CustodyCreationAttributes = Optional<CustodyAttributes, 'id'>;

class Custody
  extends Model<CustodyAttributes, CustodyCreationAttributes>
  implements CustodyAttributes
{
  public id!: number;
  public productId!: number;
  public inventoryId!: number;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Custody.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inventoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Custody',
    tableName: 'Custody',
    timestamps: true,
  }
);

export default Custody;
