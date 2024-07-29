'use client';

import NextLink from 'next/link';
import { AvatarIcon } from './AvatarIcon';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { CalendarMonth } from '@mui/icons-material';

const ChannelOnerLabel: React.FC = () => {
  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center space-x-4">
        <NextLink href="https://x.com/jsotakebmx" target="_blank">
          <AvatarIcon src="/twitterIcon.jpg" />
        </NextLink>
        <NextLink
          href="https://x.com/jsotakebmx"
          target="_blank"
          className="text-xl font-semibold"
        >
          <span>otake</span>
        </NextLink>
      </div>
      <div className="flex">
        <NextLink
          href="https://x.com/jsotakebmx"
          target="_blank"
          className="items-center text-white bg-black text-center align-center py-2 px-4 rounded-md text-sm h-10 w-28"
        >
          フォロー
        </NextLink>
      </div>
      <div />
    </div>
  );
};

export default ChannelOnerLabel;
