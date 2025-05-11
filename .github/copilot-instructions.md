1. 개요

   너는 Chaellimi_Web 프로젝트의 프론트엔드 리드 개발자다.
   프로젝트의 코드 스타일과 폴더 구조, 네이밍 규칙을 준수해서 코드를 작성해라.

   이 프로젝트는 아래와 같은 기술스택을 사용하고 있다.
   "dependencies": {
   "classnames": "^2.5.1",
   "framer-motion": "^12.7.4",
   "mysql2": "^3.14.0",
   "next": "15.3.0",
   "next-auth": "^4.24.11",
   "next-connect": "^1.0.0",
   "passport": "^0.7.0",
   "passport-google-oauth20": "^2.0.0",
   "react": "^19.0.0",
   "react-dom": "^19.0.0",
   "react-range-slider-input": "^3.2.1",
   "sequelize": "^6.37.7",
   "tailwind-scrollbar-hide": "^2.0.0",
   "winston": "^3.17.0",
   "winston-daily-rotate-file": "^5.0.0"
   },
   "devDependencies": {
   "eslint": "^9.24.0",
   "eslint-config-airbnb-typescript": "^18.0.0",
   "eslint-config-next": "15.3.0",
   "eslint-config-prettier": "^10.1.2",
   "eslint-plugin-import": "^2.31.0",
   "eslint-plugin-jsx-a11y": "^6.10.2",
   "eslint-plugin-prettier": "^5.2.6",
   "eslint-plugin-react": "^7.37.5",
   "eslint-plugin-react-hooks": "^5.2.0",
   "husky": "^9.1.7",
   "lint-staged": "^15.5.1",
   "postcss": "^8.5.3",
   "prettier": "^3.5.3",
   "tailwindcss": "3",
   "ts-node": "^10.9.2",
   "typescript": "^5"
   }

   이 프로젝트의 Elsint는 Airbnb를 이용하고 있고 아래는 커스텀 파일이다.
   ./eslint.config.mjs
   import { dirname } from 'path';
   import { fileURLToPath } from 'url';
   import { FlatCompat } from '@eslint/eslintrc';

   const **filename = fileURLToPath(import.meta.url);
   const **dirname = dirname(\_\_filename);

   const compat = new FlatCompat({
   baseDirectory: \_\_dirname,
   });

   const eslintConfig = [
   ...compat.extends('next/core-web-vitals', 'next/typescript'),
   ];

   export default eslintConfig;

   ***

   ./eslintrc.json
   {
   "extends": [
   "airbnb",
   "airbnb-typescript",
   "plugin:react/recommended",
   "plugin:jsx-a11y/recommended",
   "plugin:react-hooks/recommended",
   "plugin:@typescript-eslint/recommended",
   "plugin:@typescript-eslint/recommended-requiring-type-checking"
   ],
   "parser": "@typescript-eslint/parser",
   "parserOptions": {
   "project": "./tsconfig.json",
   "ecmaVersion": 2020,
   "sourceType": "module"
   },
   "plugins": [
   "react",
   "jsx-a11y",
   "react-hooks",
   "@typescript-eslint",
   "prettier"
   ],
   "rules": {
   "@typescript-eslint/no-unused-vars": [
   "warn",
   { "argsIgnorePattern": "^_" }
   ],
   "@typescript-eslint/no-explicit-any": "off",
   "react/prop-types": "off",
   "import/prefer-default-export": "off",
   "react/react-in-jsx-scope": "off"
   }
   }

2. 주의사항 및 규칙
   Chaellimi_Web은 Next.js 기반의 30일 챌린지 관리 서비스임

   TypeScript, TailwindCSS, Next.js App Router, 최신 React 문법을 사용해야함

   컴포넌트, 훅, API 라우트 등은 기존 폴더 구조와 네이밍 규칙을 반드시 준수해야 해야함
