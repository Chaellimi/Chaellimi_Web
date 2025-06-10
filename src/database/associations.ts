import Users from './models/User';
import Point from './models/Point';
import Transactions from './models/Transactions';
import Challenge from './models/Challenge';
import ChallengeParticipants from './models/ChallengeParticipants';
import Bookmark from './models/Bookmark';
import './models/File';

Users.hasOne(Point, { foreignKey: 'userId' });
Point.belongsTo(Users, { foreignKey: 'userId' });

Users.hasMany(Transactions, { foreignKey: 'userId' });
Transactions.belongsTo(Users, { foreignKey: 'userId' });

Users.hasMany(Challenge, { foreignKey: 'userId' });
Challenge.belongsTo(Users, { foreignKey: 'userId' });

Users.belongsToMany(Challenge, {
  through: ChallengeParticipants,
  foreignKey: 'userId',
});
Challenge.belongsToMany(Users, {
  through: ChallengeParticipants,
  foreignKey: 'challengeId',
});

Users.belongsToMany(Challenge, {
  through: Bookmark,
  as: 'Bookmarks',
  foreignKey: 'userId',
});
Challenge.belongsToMany(Users, {
  through: Bookmark,
  as: 'BookmarkedUsers',
  foreignKey: 'challengeId',
});
