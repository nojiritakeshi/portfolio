import VideoPlayer from './_components/VideoPlayer';
import VideoSummaries from './_components/VideoSummaries';
import ChannelOnerLabel from './_components/ChannelOnerLabel';
import OverviewColomn from './_components/OverviewColomn';
import MyProjectCard from './_components/MyProjectCard';
import { AvatarIcon } from './_components/AvatarIcon';
import CommentInput from './_components/CommentInput';
import { CommentProvider } from './_components/CommentProvider';
import Comment from './_components/Comment';
import WrittenComments from './_components/WrittenComments';

export default function Home() {
  const fireFighterComment =
    '2017年~2022年3月末までの約5年間、消防士として働いていました。細部にこだわること、妥協しないこと、チームにおけるコミュニケーションなどは転職した現在にも役立っていると感じています。';
  const webEngineerComment =
    '入社してから2024年12月までフルスタックエンジニアとして、webから誰でもECサイトを簡単に構築し展開できる自社サービスの開発を行ってきました。また、サブリーダとして新卒の育成や開発メンバーへの設計・実装・テストにおける指導を経験しました。';
  const forstartupsComment =
    '現在、フォースタートアップス株式会社にてエンジニアとして働いています。Next.js、TypeScript、Ruby on Railsを用いた開発を行っています。';
  return (
    <main className="pt-16 xl:px-32">
      <div className="w-hull text-sm ml-3">
        <div className="p-4">
          <div className="md:flex w-hull">
            <div className="p-2 md:w-8/12">
              <VideoPlayer videoUrl="https://www.youtube.com/embed/j8VN_RhkdCQ?si=znTbFe3uqHfyximi" />
              <VideoSummaries />
              <div className="sm:flex items-center w-full mb-2">
                <div className="sm:w-3/5">
                  <ChannelOnerLabel />
                </div>
              </div>
              <OverviewColomn />
              <CommentProvider>
                <div>
                  <h2 className="py-4 text-xl font-bold">3件のケイレキ</h2>
                  <div className="sm:flex">
                    <AvatarIcon src="/job_programmer.png" />
                    <CommentInput />
                  </div>
                  <WrittenComments />
                  <Comment
                    avatarUrl="/car_shoubousya_front.png"
                    username="京都市消防局"
                    comment={fireFighterComment}
                    url="https://www.city.kyoto.lg.jp/shobo/index.html"
                    tags={['やる気', '情熱']}
                  />
                  <Comment
                    avatarUrl="/job_programmer.png"
                    username="株式会社イーゼ"
                    url="https://e-ize.jp"
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
                  <Comment
                    avatarUrl="/4star.svg"
                    username="for Startups, Inc. / フォースタートアップス株式会社"
                    comment={forstartupsComment}
                    url="https://www.forstartups.com/"
                    tags={['React', 'Next.js', 'TypeScript', 'Ruby on Rails']}
                  />
                </div>
              </CommentProvider>
            </div>
            <div className="p-2 md:w-4/12">
              <h2 className="mb-2 text-lg font-bold">個人開発</h2>
              <MyProjectCard
                iconPath="/NetflixExtension.png"
                title="Make More MyList in Netflix"
                link="https://chromewebstore.google.com/detail/make-more-mylist-in-netfl/bicnagkkmhehedgogcopdadkakldblfk"
                description="Netflixのマイリストをより快適にするためのGoogleChrome拡張機能を開発しました。より使いやすいアイデアが浮かべば都度アップデートしています。"
                tags={['Vue3', 'TypeScript', 'pinia', 'ChromeExtension']}
              />
              <MyProjectCard
                iconPath="/omoidemeisho.png"
                title="おもいでメイショ"
                link=""
                description="画像に点数、コメント、住所などを設定しアルバム管理できるモバイルアプリを個人開発しました。現在は非公開となっています。"
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
