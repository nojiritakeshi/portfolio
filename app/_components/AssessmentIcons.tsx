import Share from '@mui/icons-material/Share';
import ThumbUp from '@mui/icons-material/ThumbUp';
import ThumbDown from '@mui/icons-material/ThumbDown';

const AssessmentIcons: React.FC = () => {
  return (
    <>
      <div className="flex items-center">
        <span className="border rounded-full p-1">
          <ThumbUp className="text-xl text-black-500" />
        </span>
        <span className="ml-2 text-base">1998</span>
      </div>
      <div className="flex items-center">
        <span className="border rounded-full p-1">
          <ThumbDown className="text-black-500" />
        </span>
        <span className="ml-2 text-base">08</span>
      </div>
      <div className="flex items-center">
        <span className="border rounded-full p-1">
          <Share className="text-black-500" />
        </span>
        <span className="ml-2 text-base">09</span>
      </div>
    </>
  );
};

export default AssessmentIcons;
