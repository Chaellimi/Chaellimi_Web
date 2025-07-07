import Users from './User';
import Challenge from './Challenge';
import ChallengeParticipants from './ChallengeParticipants';
import CertificationLog from './CertificationLog';
import File from './File';
import Point from './Point';
import Transactions from './Transactions';

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

export {
  Users,
  Challenge,
  ChallengeParticipants,
  CertificationLog,
  File,
  Point,
  Transactions,
};
