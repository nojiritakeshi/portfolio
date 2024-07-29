// import Image from 'next/image';
import VideoPlayer from './_components/VideoPlayer';
import VideoSummaries from './_components/VideoSummaries';
import ChannelOnerLabel from './_components/ChannelOnerLabel';
import OverviewColomn from './_components/OverviewColomn';
import AssessmentIcons from './_components/AssessmentIcons';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-16">
      <div className="flex min-h-screen flex-col">
        <div className="w-hull text-sm ml-6">
          <div className="p-4">
            <div className="md:flex w-hull">
              <div className="p-2 md:w-8/12">
                <VideoPlayer videoUrl="https://www.youtube.com/embed/j8VN_RhkdCQ?si=znTbFe3uqHfyximi" />
                <VideoSummaries />
                <div className="md:flex items-center w-full mb-2">
                  <div className="md:w-3/5">
                    <ChannelOnerLabel />
                  </div>
                  <div className="flex space-x-4 my-2 md:w-2/5 md:justify-end">
                    <AssessmentIcons />
                  </div>
                </div>
                <OverviewColomn />
              </div>
              <div className="p-2 w-4/12">
                <div className="mt-8"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
