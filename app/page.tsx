import VideoPlayer from './_components/VideoPlayer';
import VideoSummaries from './_components/VideoSummaries';
import ChannelOnerLabel from './_components/ChannelOnerLabel';
import OverviewColomn from './_components/OverviewColomn';
import AssessmentIcons from './_components/AssessmentIcons';
import MyProjectCard from './_components/MyProjectCard';
import { AvatarIcon } from './_components/AvatarIcon';
import CommentInput from './_components/CommentInput';
import { CommentProvider } from './_components/CommentProvider';
import Comment from './_components/Comment';
import WrittenComments from './_components/WrittenComments';

export default function Home() {
  const fireFighterComment =
    '2017年~2022年3月末までの5年間、消防士として約5年間働いていました。細部にこだわること、妥協しないこと、チームにおけるコミュニケーションなどは転職した現在にも役立っていると感じています。';
  const webEngineerComment =
    '入社してから現在までフルスタックエンジニアとして、webから誰でもECサイトを簡単に構築し展開できる自社サービスの開発を行ってきました。また、サブリーダとして新卒の育成や開発メンバーへの設計・実装・テストにおける指導を経験しました。';
  return (
    <main className="pt-16 xl:px-32">
      <div className="w-hull text-sm ml-3">
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
              <CommentProvider>
                <div>
                  <h2 className="py-4 text-xl font-bold">2件のケイレキ</h2>
                  <div className="sm:flex">
                    <AvatarIcon src="https://picsum.photos/id/237/200/300" />
                    <CommentInput />
                  </div>
                  <WrittenComments />
                  <Comment
                    avatarUrl="/car_shoubousya_front.png"
                    username="消防士"
                    comment={fireFighterComment}
                    tags={['やる気', '情熱']}
                  />
                  {/* Java JavaScript Spring Boot Vue.js Nuxt.js MySQL Docker AWS */}
                  <Comment
                    avatarUrl="/job_programmer.png"
                    username="株式会社イーゼ(Webエンジニア)"
                    comment={webEngineerComment}
                    tags={[
                      'Java',
                      'JavaScript',
                      'SpringBoot',
                      'Vue.js',
                      'Nuxt.js',
                      'MySQL',
                      'Docker',
                      'AWS'
                    ]}
                  />
                </div>
              </CommentProvider>
            </div>
            <div className="p-2 md:w-4/12">
              <h2 className="py-4 text-lg font-bold">個人開発</h2>
              <MyProjectCard
                iconPath="/NetflixExtension.png"
                title="Make More MyList in Netflix"
                link="https://chromewebstore.google.com/detail/make-more-mylist-in-netfl/bicnagkkmhehedgogcopdadkakldblfk"
                description="Netflixのマイリストをより快適にするためのGoogleChrome拡張機能を開発しました。より使いやすいアイデアが浮かべば都度アップデートしています。"
                tags={['Vue.js', 'TypeScript', 'pinia']}
              />
              <MyProjectCard
                iconPath="/omoidemeisho.png"
                title="おもいでメイショ"
                link=""
                description="画像に点数、コメント、住所などを設定しアルバム管理できるモバイルアプリを個人開発しました。現在は諸般の事情により非公開となっています。"
                tags={['ReactNative', 'TypeScript', 'Firebase', 'Android']}
              />
              <MyProjectCard
                iconPath="/npmIcon.png"
                title="Camo-tag"
                link="https://www.npmjs.com/~camo-tag"
                description="子要素はそのままに、特定のタグだけを自由にレンダリングできる特別なタグであるCamoを提供するnpmパッケージを開発しました。"
                tags={['Vue', 'React', 'TypeScript', 'npm']}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
