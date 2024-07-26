import Image from 'next/image';
import React from 'react';

export const AvatarIcon = ({
  src,
  size = 40
}: {
  src: string;
  size?: number;
}) => (
  <Image
    src={src}
    alt="Avatar"
    height={size}
    width={size}
    className="rounded-full object-cover w-10 h-10"
  />
);
