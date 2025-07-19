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

    // 모든 재고를 상품 정보와 함께 조회
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

    // 상품별로 재고 그룹화
    const inventoryByProduct = inventories.reduce(
      (acc: InventoryByProduct, inventory) => {
        const productId = inventory.productId;
        const inventoryWithProduct =
          inventory as unknown as InventoryWithProduct; // Sequelize include 결과를 위한 타입 단언

        if (!acc[productId]) {
          acc[productId] = {
            product: inventoryWithProduct.product,
            inventories: [],
            totalCount: 0,
            availableCount: 0,
            soldCount: 0,
            usedCount: 0,
          };
        }

        acc[productId].inventories.push({
          id: inventory.id,
          imgURL: inventory.imgURL,
          isSold: inventory.isSold,
          isUse: inventory.isUse,
          expiration: inventory.expiration,
          createdAt: inventory.createdAt,
          updatedAt: inventory.updatedAt,
        });

        acc[productId].totalCount++;

        if (!inventory.isSold && !inventory.isUse) {
          acc[productId].availableCount++;
        } else if (inventory.isSold) {
          acc[productId].soldCount++;
        } else if (inventory.isUse) {
          acc[productId].usedCount++;
        }

        return acc;
      },
      {} as InventoryByProduct
    );

    // 배열 형태로 변환
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
