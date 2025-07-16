import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../sequelize';

interface ProductAttributes {
  id: number;
  category: string;
  imgURL: string;
  brand: string;
  price: string;
  title: string;
  explanation: string;
}

type ProductCreationAttributes = Optional<ProductAttributes, 'id'>;

class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number;
  public category!: string;
  public imgURL!: string;
  public brand!: string;
  public price!: string;
  public title!: string;
  public explanation!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imgURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    explanation: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'Product',
    timestamps: true,
  }
);

export default Product;
