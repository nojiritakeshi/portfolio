import NextLink from 'next/link';
import Share from '@mui/icons-material/Share';
import XIcon from '@mui/icons-material/X';
import CopyAllSharp from '@mui/icons-material/ContentCopy';
import GitHubIcon from '@mui/icons-material/GitHub';

// Goodアイコンとかいらないかも。それよりGithubリンクや共有ボタンだけでいいかも

const AssessmentIcons: React.FC = () => {
  return (
    <>
      <div className="flex items-center">
        <NextLink
          href="https://github.com/nojiritakeshi/portfolio"
          className="border rounded-full p-1"
          target="_blank"
        >
          <GitHubIcon className="text-xl text-black-500" />
        </NextLink>
      </div>
      <div className="flex items-center">
        <NextLink
          href="https://x.com/jsotakebmx"
          className="border rounded-full p-1"
          target="_blank"
        >
          <XIcon className="text-black-500" />
        </NextLink>
      </div>
    </>
  );
};

export default AssessmentIcons;
