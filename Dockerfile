FROM node:22-alpine AS builder

WORKDIR /src/app

# package 파일만 복사 → 캐시 최적화
COPY package.json yarn.lock ./

# 의존성 설치
RUN yarn install --frozen-lockfile

# 전체 복사
COPY . .

# 환경 변수 파일 복사 (.env는 Jenkins에서 미리 만들어둠)
COPY .env .env

# Next.js 빌드 (env는 process.env에서 자동 인식됨)
RUN yarn build


FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=builder /src/app/.env .env

RUN yarn install --production --frozen-lockfile

ENV NODE_ENV=production
ENV PORT=7001

EXPOSE 7001

CMD ["yarn", "start"]
