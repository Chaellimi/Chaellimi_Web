import Users from './User';
import Challenge from './Challenge';
import ChallengeParticipants from './ChallengeParticipants';
import CertificationLog from './CertificationLog';
import File from './File';
import Point from './Point';
import Transactions from './Transactions';
import Product from './Product';
import Inventory from './Inventory';
import Custody from './Custody';
import Bookmark from './Bookmark';

// 유저 → 챌린지(생성자)
Users.hasMany(Challenge, { foreignKey: 'userId', as: 'createdChallenges' });
Challenge.belongsTo(Users, { foreignKey: 'userId', as: 'User' });

// 유저 ↔ 챌린지(참여자)
Users.belongsToMany(Challenge, {
  through: ChallengeParticipants,
  foreignKey: 'userId',
  otherKey: 'challengeId',
  as: 'participatedChallenges',
});
Challenge.belongsToMany(Users, {
  through: ChallengeParticipants,
  foreignKey: 'challengeId',
  otherKey: 'userId',
  as: 'participants',
});

// 챌린지 ↔ 챌린지 참여자 (조인 관계 분석용)
Challenge.hasMany(ChallengeParticipants, {
  foreignKey: 'challengeId',
  as: 'ChallengeParticipants',
});
ChallengeParticipants.belongsTo(Challenge, {
  foreignKey: 'challengeId',
  as: 'challenge',
});
ChallengeParticipants.belongsTo(Users, {
  foreignKey: 'userId',
  as: 'user',
});

// 인증 로그
CertificationLog.belongsTo(Users, { foreignKey: 'userId' });
CertificationLog.belongsTo(Challenge, { foreignKey: 'challengeId' });

// 파일 업로드
File.belongsTo(Users, { foreignKey: 'userId', as: 'user' });
Users.hasMany(File, { foreignKey: 'userId', as: 'files' });

// 포인트
Point.belongsTo(Users, { foreignKey: 'userId' });
Users.hasOne(Point, { foreignKey: 'userId' });

// 거래 내역
Transactions.belongsTo(Users, { foreignKey: 'userId' });
Users.hasMany(Transactions, { foreignKey: 'userId' });

// 상품 관계
Product.hasMany(Inventory, { foreignKey: 'productId', as: 'inventories' });
Inventory.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// 보관 관계
Custody.belongsTo(Users, { foreignKey: 'userId', as: 'user' });
Custody.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
Custody.belongsTo(Inventory, { foreignKey: 'inventoryId', as: 'inventory' });

Users.hasMany(Custody, { foreignKey: 'userId', as: 'custody' });
Product.hasMany(Custody, { foreignKey: 'productId', as: 'custody' });
Inventory.hasOne(Custody, { foreignKey: 'inventoryId', as: 'custody' });

// 북마크 관계
Bookmark.belongsTo(Users, { foreignKey: 'userId', as: 'user' });
Bookmark.belongsTo(Challenge, { foreignKey: 'challengeId', as: 'challenge' });

Users.hasMany(Bookmark, { foreignKey: 'userId', as: 'bookmarks' });
Challenge.hasMany(Bookmark, { foreignKey: 'challengeId', as: 'bookmarks' });

export {
  Users,
  Challenge,
  ChallengeParticipants,
  CertificationLog,
  File,
  Point,
  Transactions,
  Product,
  Inventory,
  Custody,
  Bookmark,
};
