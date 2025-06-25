import Users from './User';
import Challenge from './Challenge';
import ChallengeParticipants from './ChallengeParticipants';

Users.hasMany(Challenge, { foreignKey: 'userId', as: 'createdChallenges' });
Users.belongsToMany(Challenge, {
  through: ChallengeParticipants,
  foreignKey: 'userId',
  as: 'participatedChallenges',
});
Challenge.belongsToMany(Users, {
  through: ChallengeParticipants,
  foreignKey: 'challengeId',
  as: 'participants',
});
ChallengeParticipants.belongsTo(Users, { foreignKey: 'userId', as: 'user' });
ChallengeParticipants.belongsTo(Challenge, {
  foreignKey: 'challengeId',
  as: 'challenge',
});

export { Users, Challenge, ChallengeParticipants };
