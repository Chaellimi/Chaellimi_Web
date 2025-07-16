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
      references: {
        model: 'products',
        key: 'id',
      },
    },
    inventoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'inventories',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'userId',
      },
    },
  },
  {
    sequelize,
    modelName: 'Custody',
    tableName: 'custody',
    timestamps: true,
  }
);

export default Custody;
