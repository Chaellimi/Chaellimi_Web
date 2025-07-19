import { Users, Inventory, Product } from '@/database/models';
import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';
import resUtil from '@/lib/utils/responseUtil';

interface InventoryItem {
  id: number;
  imgURL: string;
  isSold: boolean;
  isUse: boolean;
  expiration: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface InventoryWithProduct extends InventoryItem {
  productId: number;
  product: ProductInfo;
}

interface ProductInfo {
  id: number;
  title: string;
  brand: string;
  category: string;
  price: string;
  imgURL: string;
}

interface ProductInventory {
  product: ProductInfo;
  inventories: InventoryItem[];
  totalCount: number;
  availableCount: number;
  soldCount: number;
  usedCount: number;
}

interface InventoryByProduct {
  [key: number]: ProductInventory;
}

async function postHandler() {
  try {
    const user = await getUserFromRequest();
    const userRole = await Users.findOne({ where: { userId: user?.id } });

    if (userRole?.dataValues.role === 'user') {
      return resUtil.successTrue({
        status: 400,
        message: '어드민 권한이 없습니다.',
      });
    }

    // 모든 제품 조회
    const allProducts = await Product.findAll({
      attributes: ['id', 'title', 'brand', 'category', 'price', 'imgURL'],
    });

    // 모든 재고 조회
    const inventories = await Inventory.findAll({
      include: [
        {
          model: Product,
          as: 'product',
          attributes: ['id', 'title', 'brand', 'category', 'price', 'imgURL'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    // 초기값: 모든 제품에 대해 기본 구조 생성
    const inventoryByProduct: InventoryByProduct = {};
    for (const product of allProducts) {
      inventoryByProduct[product.id] = {
        product: product as ProductInfo,
        inventories: [],
        totalCount: 0,
        availableCount: 0,
        soldCount: 0,
        usedCount: 0,
      };
    }

    // 재고 데이터 누적
    for (const inventory of inventories) {
      const inventoryWithProduct = inventory as unknown as InventoryWithProduct;
      const productId = inventoryWithProduct.productId;

      if (!inventoryByProduct[productId]) continue; // 혹시 누락된 제품이 있다면 skip

      inventoryByProduct[productId].inventories.push({
        id: inventory.id,
        imgURL: inventory.imgURL,
        isSold: inventory.isSold,
        isUse: inventory.isUse,
        expiration: inventory.expiration,
        createdAt: inventory.createdAt,
        updatedAt: inventory.updatedAt,
      });

      inventoryByProduct[productId].totalCount++;

      if (!inventory.isSold && !inventory.isUse) {
        inventoryByProduct[productId].availableCount++;
      } else if (inventory.isSold) {
        inventoryByProduct[productId].soldCount++;
      } else if (inventory.isUse) {
        inventoryByProduct[productId].usedCount++;
      }
    }

    const result = Object.values(inventoryByProduct);

    return resUtil.successTrue({
      status: 200,
      message: '재고 조회 성공',
      data: result,
    });
  } catch (err) {
    return resUtil.unknownError({ data: { err } });
  }
}

export const GetInventory = withLogging(withAuth(postHandler));
