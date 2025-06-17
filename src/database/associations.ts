import Users from './models/User';
import Point from './models/Point';
import Transactions from './models/Transactions';
import Challenge from './models/Challenge';
import ChallengeParticipants from './models/ChallengeParticipants';
import File from './models/File';

Users.hasOne(Point, { foreignKey: 'userId' });
Point.belongsTo(Users, { foreignKey: 'userId' });

Users.hasMany(Transactions, { foreignKey: 'userId' });
Transactions.belongsTo(Users, { foreignKey: 'userId' });

Users.hasMany(Challenge, { foreignKey: 'userId', as: 'challenges' });
Challenge.belongsTo(Users, { foreignKey: 'userId', as: 'User' });

Users.belongsToMany(Challenge, {
  through: ChallengeParticipants,
  foreignKey: 'userId',
});
Challenge.belongsToMany(Users, {
  through: ChallengeParticipants,
  foreignKey: 'challengeId',
});

File.belongsTo(Users, { foreignKey: 'userId', as: 'user' });
Users.hasMany(File, { foreignKey: 'userId', as: 'files' });
