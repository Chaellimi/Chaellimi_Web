# GitHub Copilot 커스터마이징 설정

# 이 파일은 Copilot이 프로젝트에 더 적합한 코드 제안을 할 수 있도록 유도하는 데 사용됩니다.

# ========================

# 프로젝트 기본 정보

# ========================

project_name: "Chaellimi_Web"
description: |
30일 챌린지를 생성하고 관리하는 Next.js 기반 웹 애플리케이션입니다.
최신 React 19 문법, TypeScript, App Router, TailwindCSS를 적극 활용합니다.

# ========================

# 코드 스타일 가이드

# ========================

code_style:
language: TypeScript
framework: Next.js (App Router)
styling: TailwindCSS
eslint: Airbnb + 커스텀 설정 적용
prettier: 사용 (eslint-plugin-prettier 포함)

# ========================

# 디렉토리 구조 및 네이밍 규칙

# ========================

structure:
components:
path: src/components/
naming: PascalCase (e.g., `ChallengeCard.tsx`)
hooks:
path: src/hooks/
naming: camelCase (e.g., `useChallengeFilter.ts`)
pages:
path: src/app/
routing: Next.js App Router 방식 (파일 기반)
api:
path: src/app/api/
convention: next-connect를 이용한 핸들러 구조 사용
styles:
path: src/styles/
convention: 전역 스타일은 `globals.css`, 컴포넌트 스타일은 Tailwind로 작성

# ========================

# 코드 작성 규칙

# ========================

rules:
typescript:
strict*typing: true
allow_explicit_any: false
unused_vars: warn (underscore(*) prefix로 예외 허용)
react:
use_functional_components: true
use_hooks_only: true
no_prop_types: true
no_react_in_jsx_scope: true
css:
use_tailwind_only: true
no_inline_styles: true
import:
prefer_named_exports: true
no_index_exports: true
testing:
use: jest, react-testing-library (추후 도입 예정)

# ========================

# 추천 라이브러리

# ========================

libraries:
animation: framer-motion
auth: next-auth + passport (Google OAuth2)
db: sequelize + mysql2
logging: winston + winston-daily-rotate-file
utility: classnames

# ========================

# 코드 예시 스타일

# ========================

examples:

- description: "챌린지 카드 컴포넌트 생성 예시"
  language: TypeScript
  code: |
  import React from 'react';

  interface Props {
  title: string;
  count: number;
  }

  const ChallengeCard = ({ title, count }: Props) => (
  <div className="p-4 rounded-lg bg-white shadow">
  <h3 className="text-lg font-semibold">{title}</h3>
  <p className="text-sm text-gray-500">{count}명 도전중</p>
  </div>
  );

  export default ChallengeCard;
