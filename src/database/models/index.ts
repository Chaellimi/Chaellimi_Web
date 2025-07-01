import Users from './User';
import Challenge from './Challenge';
import ChallengeParticipants from './ChallengeParticipants';
import CertificationLog from './CertificationLog';

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

CertificationLog.belongsTo(Users, { foreignKey: 'userId' });
CertificationLog.belongsTo(Challenge, { foreignKey: 'challengeId' });

export { Users, Challenge, ChallengeParticipants, CertificationLog };
