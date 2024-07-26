// import Image from 'next/image';
import VideoPlayer from './_components/VideoPlayer';
import VideoSummaries from './_components/VideoSummaries';
import ChannelOnerLabel from './_components/ChannelOnerLabel';
import OverviewColomn from './_components/OverviewColomn';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-16">
      <div className="flex min-h-screen flex-col">
        <div className="w-hull text-sm ml-6">
          <div className="p-4">
            <div className="md:flex w-hull">
              <div className="p-2 md:w-8/12">
                <VideoPlayer videoUrl="https://www.youtube.com/embed/LdxI0EhLXrs?si=YN_SRfCkhdSawBIt" />
                <VideoSummaries />
                <ChannelOnerLabel />
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
