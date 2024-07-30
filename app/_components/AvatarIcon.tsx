import Image from 'next/image';
import React from 'react';
import config from '../../next.config.mjs';
const BASE_PATH = config.basePath ? config.basePath : '';

export const AvatarIcon = ({
  src,
  size = 40
}: {
  src?: string;
  size?: number;
}) => (
  <Image
    src={src ? `${BASE_PATH}${src}` : 'https://picsum.photos/id/237/200/300'}
    alt="Avatar"
    height={size}
    width={size}
    className="rounded-full object-cover w-10 h-10"
  />
);
