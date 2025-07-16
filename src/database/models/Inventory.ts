import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../sequelize';

interface InventoryAttributes {
  id: number;
  productId: number;
  imgURL: string;
  isSold: boolean;
  isUse: boolean;
  expiration: Date;
}

type InventoryCreationAttributes = Optional<InventoryAttributes, 'id'>;

class Inventory
  extends Model<InventoryAttributes, InventoryCreationAttributes>
  implements InventoryAttributes
{
  public id!: number;
  public productId!: number;
  public imgURL!: string;
  public isSold!: boolean;
  public isUse!: boolean;
  public expiration!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Inventory.init(
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
    imgURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isSold: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isUse: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    expiration: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Inventory',
    tableName: 'Inventory',
    timestamps: true,
  }
);

export default Inventory;
