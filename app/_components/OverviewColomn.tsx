'use client';
import { useState } from 'react';
import NextLink from 'next/link';
import XIcon from '@mui/icons-material/X';
import MyTechStack from './MyTechStack';

const OverviewColomn: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="p-4 bg-colomn rounded-md">
      <div
        className={`overflow-hidden ${
          expanded ? 'max-h-full' : 'max-h-16'
        } transition-max-height ease-in-out`}
      >
        <p>2017年 4月 18歳時点</p>
        <p>
          <span className="text-blue-600 pr-2">04/03</span>
          京都市消防局で消防士として社会人スタート
        </p>
        <p>
          <span className="text-blue-600 pr-2">2020/02</span>
          コロナ渦の影響で家で出来る趣味を探し始める
        </p>
        <p>
          <span className="text-blue-600 pr-2">2020/04</span>
          プログラミングをはじめる、はまる
        </p>
        <p>
          <span className="text-blue-600 pr-2">2022/04</span>
          <NextLink href="https://e-ize.jp" target="_blank">
            <span className="hover:underline">株式会社イーゼ</span>に入社
          </NextLink>
        </p>
        <p>
          <span className="text-blue-600 pr-2">~ 2024/04</span>
          自社サービスの設計・開発
        </p>
        <p>
          <span className="text-blue-600 pr-2">2024/04 ~</span>
          サブリーダー、自社サービスの設計・開発
        </p>
        <p className="my-6">Youtube風に作成したポートフォリオです。</p>
        <p className="mt-6 mb-1">動画の生成元:</p>
        <NextLink
          href="https://ai.invideo.io/"
          target="_blank"
          className="text-sm font-semibold"
        >
          invideo AI
        </NextLink>
        <p className="mt-6 mb-2 text-sm font-semibold">技術スタック：</p>
        <div className="flex flex-wrap">
          <MyTechStack text="JavaScript" />
          <MyTechStack text="Java" />
          <MyTechStack text="Vue.js" />
          <MyTechStack text="Nuxt.js" />
          <MyTechStack text="React" />
          <MyTechStack text="Next.js" />
          <MyTechStack text="React Native" />
          <MyTechStack text="Expo" />
          <MyTechStack text="Spring Boot" />
          <MyTechStack text="MySQL" />
          <MyTechStack text="Docker" />
          <MyTechStack text="Firebase" />
        </div>
      </div>
      <button onClick={toggleExpanded} className="mt-2 text-gray-600">
        {expanded ? '一部を表示' : 'もっと見る'}
      </button>
    </div>
  );
};

export default OverviewColomn;
