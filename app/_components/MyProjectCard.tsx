import Image from 'next/image';
import NextLink from 'next/link';
import OpenInNew from '@mui/icons-material/OpenInNew';
import config from '../../next.config.mjs';
const BASE_PATH = config.basePath ? config.basePath : '';

type MyProjectCardProps = {
  iconPath: string;
  title: string;
  link: string;
  description: string;
  tags: string[];
};

const MyProjectCard: React.FC<MyProjectCardProps> = ({
  iconPath,
  title,
  link,
  description,
  tags
}) => {
  return (
    <div className="mb-3 p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-2">
        <Image
          src={`${BASE_PATH}${iconPath}`}
          alt="Avatar"
          height={40}
          width={40}
          className="rounded-full object-cover w-10 h-10"
        />
        <NextLink
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-semibold hover:underline"
        >
          {title}
          <OpenInNew fontSize="small" className="ml-1" />
        </NextLink>
      </div>
      <p className="text-gray-600 mt-2">{description}</p>
      <div className="flex flex-wrap mt-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-green-200 text-green-800 text-sm font-semibold m-1 px-2.5 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MyProjectCard;
