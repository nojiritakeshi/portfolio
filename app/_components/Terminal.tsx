'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type Lang = 'ja' | 'en';
type Bi<T = string> = { ja: T; en: T };
type Seg = { t: string; c: string; w: string; href: string; notHref: boolean };
type Line = { id: string; indent: string; parts: Seg[] };
type Chip = { label: string; run: () => void };

/* ------------------------------------------------------------------ data --- */

const DATA = {
  whoami: {
    ja: [
      '野尻 武  (Takeshi Nojiri)',
      'ソフトウェアエンジニア @ フォースタートアップス株式会社',
      '京都 / 元・消防士',
      '消防士から、エンジニアへ。'
    ],
    en: [
      'Takeshi Nojiri  (野尻 武)',
      'Software Engineer @ For Startups, Inc.',
      'Kyoto, Japan / ex-firefighter',
      'From firefighter to engineer.'
    ]
  } satisfies Bi<string[]>,
  about: {
    ja: [
      '2017年、18歳で京都市消防局に入局。約5年間、消防士として人命救助の現場に立ちました。',
      '2020年、コロナ禍に独学でプログラミングを始め、夢中に。2022年にエンジニアへ転身しました。',
      '現在はNext.js・TypeScript・Ruby on Railsでプロダクトを開発。',
      '現場で身につけた「妥協しない姿勢」「細部へのこだわり」「チームで動く力」が、ものづくりの土台です。'
    ],
    en: [
      'In 2017, at eighteen, I joined the Kyoto City Fire Department and spent five years on the front line of rescue work.',
      'During the pandemic in 2020 I taught myself to code, and in 2022 I moved into engineering.',
      'Today I build products with Next.js, TypeScript and Ruby on Rails.',
      'The discipline, attention to detail and teamwork from the field are the foundation of how I make things.'
    ]
  } satisfies Bi<string[]>,
  interests: {
    ja: [
      'BMX に乗ること。',
      'ものづくりと個人開発。',
      '映画 — Netflix を快適にする拡張機能を自作するくらいには。',
      '新しい技術を、とりあえず触ってみること。'
    ],
    en: [
      'Riding BMX.',
      'Building things and side projects.',
      'Films — enough to build my own Netflix extension.',
      'Trying out new tech just to see how it feels.'
    ]
  } satisfies Bi<string[]>,
  career: [
    {
      year: '2017',
      color: '#d98c5f',
      tag: 'firefighter',
      org: { ja: '京都市消防局', en: 'Kyoto City Fire Department' },
      role: { ja: '消防士として社会人スタート', en: 'Started my career as a firefighter' },
      desc: {
        ja: '18歳で入局。約5年間、現場の最前線で妥協しない姿勢・細部へのこだわり・チームでの連携を体に刻んだ。',
        en: 'Joined at 18. Five years on the front line taught me to never cut corners, sweat the details, and move as a team.'
      },
      tags: ['現場対応', 'チームワーク', '規律']
    },
    {
      year: '2020',
      color: '#c79a6a',
      tag: 'turning-point',
      org: { ja: 'プログラミングとの出会い', en: 'Discovering programming' },
      role: { ja: 'コロナ禍に独学を開始、のめり込む', en: 'Started self-teaching during the pandemic' },
      desc: {
        ja: '家でできる趣味を探してコードに触れ、夢中になる。消防士を続けながら夜も休日も学習を重ねた。',
        en: 'Looking for something to do at home, I touched code and got hooked — studying nights and weekends while still a firefighter.'
      },
      tags: ['独学', 'JavaScript']
    },
    {
      year: '2022',
      color: '#9bb59f',
      tag: 'engineer',
      org: { ja: '株式会社イーゼ', en: 'e-ize Inc.' },
      role: { ja: 'フルスタックエンジニアへ転身', en: 'Became a full-stack engineer' },
      desc: {
        ja: '誰でもECサイトを構築・展開できる自社サービスを設計・開発。フロントからバックエンドまで一気通貫で担当。',
        en: 'Designed and built an in-house service that lets anyone launch an EC site — owning everything from frontend to backend.'
      },
      tags: ['Java', 'Vue.js', 'Nuxt.js', 'Spring Boot', 'AWS']
    },
    {
      year: '2024',
      color: '#86b3b8',
      tag: 'sub-leader',
      org: { ja: 'サブリーダー', en: 'Sub-leader' },
      role: { ja: '新卒育成と開発の牽引', en: 'Mentoring and leading development' },
      desc: {
        ja: '設計・実装・テストにおける指導を担当。新卒育成とチーム全体の品質向上に取り組んだ。',
        en: 'Guided new grads through design, implementation and testing, and worked to raise the team’s quality.'
      },
      tags: ['設計', 'レビュー', '育成']
    },
    {
      year: '2025',
      color: '#86b8a0',
      tag: 'now',
      org: { ja: 'フォースタートアップス株式会社', en: 'For Startups, Inc.' },
      role: { ja: 'エンジニアとして開発', en: 'Engineer' },
      desc: {
        ja: 'スタートアップ支援の事業領域で、Next.js・TypeScript・Ruby on Railsを用いたプロダクト開発に従事。',
        en: 'Building products with Next.js, TypeScript and Ruby on Rails in the startup-support domain.'
      },
      tags: ['Next.js', 'TypeScript', 'Ruby on Rails']
    }
  ],
  skills: [
    { g: 'frontend', items: 'React  Next.js  Vue.js  Nuxt.js  TypeScript  JavaScript' },
    { g: 'mobile  ', items: 'React Native  Expo' },
    { g: 'backend ', items: 'Java  Spring Boot  Ruby on Rails' },
    { g: 'data    ', items: 'MySQL  Firebase' },
    { g: 'infra   ', items: 'Docker  AWS' }
  ],
  projects: [
    {
      dir: 'netflix-mylist/',
      kind: 'Chrome Extension',
      title: 'Make More MyList in Netflix',
      desc: {
        ja: 'Netflixのマイリストをより快適にするChrome拡張機能。良いアイデアが浮かぶたびに更新中。',
        en: 'A Chrome extension that makes Netflix My List nicer. I keep shipping updates whenever a better idea strikes.'
      },
      url: 'https://chromewebstore.google.com/detail/make-more-mylist-in-netfl/bicnagkkmhehedgogcopdadkakldblfk'
    },
    {
      dir: 'omoide-meisho/',
      kind: 'Mobile App',
      title: 'おもいでメイショ',
      desc: {
        ja: '画像に点数・コメント・住所を付けてアルバム管理できるモバイルアプリ。現在は非公開。',
        en: 'A mobile app for managing photo albums with scores, comments and locations. Currently private.'
      },
      url: ''
    },
    {
      dir: 'camo-tag/',
      kind: 'npm Package',
      title: 'Camo-tag',
      desc: {
        ja: '子要素はそのままに、特定のタグだけを自由にレンダリングできる特別なタグ「Camo」を提供するnpmパッケージ。',
        en: 'An npm package providing “Camo” — a tag that freely renders only specific tags while leaving children untouched.'
      },
      url: 'https://www.npmjs.com/~camo-tag'
    }
  ],
  links: [
    { key: 'mail', val: 'kyu308379@gmail.com', url: 'mailto:kyu308379@gmail.com' },
    { key: 'x   ', val: '@jsotakebmx', url: 'https://x.com/jsotakebmx' },
    { key: 'git ', val: 'github.com/nojiritakeshi', url: 'https://github.com/nojiritakeshi' },
    { key: 'npm ', val: 'npmjs.com/~camo-tag', url: 'https://www.npmjs.com/~camo-tag' }
  ]
};

const MONO = "'JetBrains Mono','Zen Kaku Gothic New',monospace";
const PROMPT = 'nojiri@portfolio:~$';

/* palette */
const A = '#86b8a0';
const DIM = '#6b7771';
const TXT = '#aeb6b0';
const BRIGHT = '#eef3ef';
const WARN = '#d98c5f';

const NORMALIZE: Record<string, string> = {
  help: 'help', '?': 'help', commands: 'help', man: 'help', 'ls -la': 'help',
  whoami: 'whoami', id: 'whoami',
  about: 'about', 'cat about.txt': 'about', 'cat about': 'about',
  career: 'career', 'git log': 'career', 'git log --career': 'career', log: 'career',
  skills: 'skills', stack: 'skills', 'ls /skills': 'skills', 'ls -la /skills': 'skills', 'ls skills': 'skills',
  projects: 'projects', 'ls projects/': 'projects', 'ls projects': 'projects', ls: 'projects', work: 'projects', works: 'projects',
  interests: 'interests', 'cat interests.txt': 'interests', hobbies: 'interests', 'cat interests': 'interests',
  contact: 'contact', './contact.sh': 'contact', 'contact.sh': 'contact', 'sh contact.sh': 'contact', mail: 'contact',
  clear: 'clear', cls: 'clear', reset: 'clear',
  'lang ja': 'lang:ja', 'lang en': 'lang:en', ja: 'lang:ja', en: 'lang:en'
};

/* ------------------------------------------------------------- component --- */

export default function Terminal() {
  const [lang, setLang] = useState<Lang>('ja');
  const [history, setHistory] = useState<Line[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);

  const langRef = useRef<Lang>('ja');
  const lidRef = useRef(0);
  const lastRawRef = useRef('');
  const cmdHistRef = useRef<string[]>([]);
  const histIdxRef = useRef(-1);
  const pendingRef = useRef<Line[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const aliveRef = useRef(false);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  langRef.current = lang;

  /* -- line builders --------------------------------------------------- */

  const L = useCallback(<T,>(o: Bi<T> | T): T => {
    if (o && typeof o === 'object' && 'ja' in (o as Bi<T>)) {
      return (o as Bi<T>)[langRef.current];
    }
    return o as T;
  }, []);

  const mk = useCallback(
    (parts: { t: string; c?: string; b?: boolean; href?: string }[], indent = 0): Line => {
      lidRef.current += 1;
      return {
        id: 'l' + lidRef.current,
        indent: indent + 'px',
        parts: parts.map((s) => ({
          t: s.t,
          c: s.c || '#c2c9c3',
          w: s.b ? '600' : '400',
          href: s.href || '',
          notHref: !s.href
        }))
      };
    },
    []
  );

  const blank = useCallback(() => mk([{ t: ' ', c: '#000' }]), [mk]);

  const normalize = useCallback((raw: string) => {
    const c = (raw || '').toLowerCase().replace(/\s+/g, ' ').trim();
    return NORMALIZE[c] || 'UNKNOWN';
  }, []);

  const output = useCallback(
    (norm: string): Line[] => {
      const ja = langRef.current === 'ja';
      const out: Line[] = [];
      if (norm === 'help') {
        out.push(mk([{ t: ja ? '利用できるコマンド:' : 'Available commands:', c: DIM }]));
        out.push(blank());
        const rows: [string, Bi][] = [
          ['whoami', { ja: '基本プロフィール', en: 'basic profile' }],
          ['about', { ja: '自己紹介', en: 'about me' }],
          ['career', { ja: '経歴ログ (git log 風)', en: 'career log (git-log style)' }],
          ['skills', { ja: '技術スタック', en: 'tech stack' }],
          ['projects', { ja: '個人開発', en: 'personal works' }],
          ['interests', { ja: '趣味・人柄', en: 'interests & personality' }],
          ['contact', { ja: '連絡先', en: 'get in touch' }],
          ['clear', { ja: '画面をクリア', en: 'clear the screen' }],
          ['lang en/ja', { ja: '言語を切り替え', en: 'switch language' }]
        ];
        rows.forEach((r) => out.push(mk([{ t: '  ' + r[0].padEnd(13), c: A }, { t: L(r[1]), c: TXT }])));
        out.push(blank());
        out.push(
          mk([
            {
              t: ja ? '↑ 下のボタンをクリックしても実行できます。' : '↑ you can also click the buttons below.',
              c: DIM
            }
          ])
        );
        return out;
      }
      if (norm === 'whoami') {
        const w = L(DATA.whoami);
        out.push(mk([{ t: w[0], c: BRIGHT, b: true }]));
        out.push(mk([{ t: w[1], c: TXT }]));
        out.push(mk([{ t: w[2], c: DIM }]));
        out.push(blank());
        out.push(mk([{ t: w[3], c: A }]));
        return out;
      }
      if (norm === 'about') {
        L(DATA.about).forEach((s) => out.push(mk([{ t: s, c: '#cdd4ce' }])));
        return out;
      }
      if (norm === 'interests') {
        L(DATA.interests).forEach((s) => out.push(mk([{ t: '• ', c: A }, { t: s, c: '#cdd4ce' }])));
        return out;
      }
      if (norm === 'skills') {
        DATA.skills.forEach((g) => out.push(mk([{ t: g.g + '  ', c: A }, { t: g.items, c: TXT }])));
        return out;
      }
      if (norm === 'career') {
        out.push(
          mk([
            {
              t: ja ? '5件のコミット — 消防士からエンジニアへ。' : '5 commits — from firefighter to engineer.',
              c: DIM
            }
          ])
        );
        out.push(blank());
        DATA.career.forEach((c) => {
          out.push(mk([{ t: 'commit ', c: DIM }, { t: c.year + '  (' + c.tag + ')', c: c.color, b: true }]));
          out.push(mk([{ t: 'Date:   ', c: DIM }, { t: c.year, c: '#8b938d' }]));
          out.push(blank());
          out.push(mk([{ t: L(c.org), c: BRIGHT, b: true }], 20));
          out.push(mk([{ t: L(c.role), c: TXT }], 20));
          out.push(mk([{ t: L(c.desc), c: '#8b938d' }], 20));
          out.push(mk([{ t: c.tags.map((t) => '#' + t).join('  '), c: '#7d877f' }], 20));
          out.push(blank());
        });
        return out;
      }
      if (norm === 'projects') {
        DATA.projects.forEach((p) => {
          out.push(
            mk([
              { t: 'drwxr-xr-x  ', c: DIM },
              { t: p.dir.padEnd(18), c: A },
              { t: p.kind, c: '#7d877f' }
            ])
          );
          out.push(mk([{ t: p.title, c: BRIGHT, b: true }], 22));
          out.push(mk([{ t: L(p.desc), c: '#8b938d' }], 22));
          if (p.url) out.push(mk([{ t: '→ ' + p.url, c: A, href: p.url }], 22));
          else out.push(mk([{ t: ja ? '→ 非公開' : '→ private', c: DIM }], 22));
          out.push(blank());
        });
        return out;
      }
      if (norm === 'contact') {
        out.push(
          mk([{ t: ja ? 'つくりたいものがあれば、気軽に。' : 'Want to build something? Reach out.', c: '#cdd4ce' }])
        );
        out.push(blank());
        DATA.links.forEach((l) => out.push(mk([{ t: l.key + '   ', c: DIM }, { t: l.val, c: A, href: l.url }])));
        return out;
      }
      out.push(mk([{ t: 'zsh: command not found: ', c: WARN }, { t: lastRawRef.current || '', c: '#cdd4ce' }]));
      out.push(mk([{ t: ja ? '‘help’ で一覧を表示します。' : "type ‘help’ to see what's available.", c: DIM }]));
      return out;
    },
    [mk, blank, L]
  );

  /* -- streaming engine ------------------------------------------------ */

  const flush = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const p = pendingRef.current;
    pendingRef.current = [];
    if (p.length) setHistory((h) => [...h, ...p]);
    setBusy(false);
  }, []);

  const stream = useCallback((lines: Line[]) => {
    if (!lines || !lines.length) return;
    pendingRef.current = lines.slice();
    setBusy(true);
    const step = () => {
      if (!aliveRef.current) return;
      if (!pendingRef.current.length) {
        setBusy(false);
        return;
      }
      const ln = pendingRef.current.shift()!;
      setHistory((h) => [...h, ln]);
      if (pendingRef.current.length) timerRef.current = setTimeout(step, 42);
      else setBusy(false);
    };
    timerRef.current = setTimeout(step, 90);
  }, []);

  const boot = useCallback(() => {
    const ja = langRef.current === 'ja';
    const banner = [
      mk([
        { t: 'TAKESHI NOJIRI', c: '#eef3ef', b: true },
        { t: '  —  interactive resume  v1.0', c: '#6b7771' }
      ]),
      mk([
        {
          t: ja ? '消防士 → エンジニア / firefighter → engineer' : 'firefighter → engineer',
          c: '#86b8a0'
        }
      ]),
      blank(),
      mk([
        { t: ja ? 'コマンドを入力するか、ボタンをクリック。まずは ' : 'type a command or click a button. start with ', c: '#6b7771' },
        { t: 'help', c: '#86b8a0' },
        { t: ja ? ' から。' : '.', c: '#6b7771' }
      ]),
      blank()
    ];
    setHistory(banner);
    // stream help after banner is set
    setTimeout(() => stream(output('help')), 0);
  }, [mk, blank, stream, output]);

  const setLanguage = useCallback(
    (l: Lang) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      pendingRef.current = [];
      langRef.current = l;
      setLang(l);
      setBusy(false);
      setHistory([]);
      setTimeout(() => boot(), 0);
    },
    [boot]
  );

  const run = useCallback(
    (raw: string) => {
      if (pendingRef.current.length) flush();
      const cmd = (raw || '').trim();
      if (!cmd) return;
      lastRawRef.current = cmd;
      const echo = mk([
        { t: 'nojiri@portfolio:~$ ', c: '#86b8a0' },
        { t: cmd, c: '#eef3ef' }
      ]);
      const norm = normalize(cmd);
      cmdHistRef.current = [...cmdHistRef.current, cmd];
      histIdxRef.current = -1;
      setInput('');
      setHistory((h) => [...h, echo]);
      if (norm === 'clear') {
        setHistory([]);
        return;
      }
      if (norm === 'lang:ja') {
        setLanguage('ja');
        return;
      }
      if (norm === 'lang:en') {
        setLanguage('en');
        return;
      }
      stream(output(norm));
    },
    [flush, mk, normalize, stream, output, setLanguage]
  );

  /* -- input handlers -------------------------------------------------- */

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        run((e.target as HTMLInputElement).value);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const h = cmdHistRef.current;
        if (!h.length) return;
        const idx = histIdxRef.current < 0 ? h.length - 1 : Math.max(0, histIdxRef.current - 1);
        histIdxRef.current = idx;
        setInput(h[idx]);
      } else if (e.key === 'ArrowDown') {
        const h = cmdHistRef.current;
        if (histIdxRef.current < 0) return;
        const idx = histIdxRef.current + 1;
        if (idx >= h.length) {
          histIdxRef.current = -1;
          setInput('');
        } else {
          histIdxRef.current = idx;
          setInput(h[idx]);
        }
      }
    },
    [run]
  );

  /* -- lifecycle: boot + three.js rain --------------------------------- */

  useEffect(() => {
    aliveRef.current = true;
    boot();
    const t = setTimeout(() => inputRef.current?.focus(), 300);
    return () => {
      aliveRef.current = false;
      clearTimeout(t);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // boot only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // keep scrolled to bottom as history grows
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history, busy]);

  useEffect(() => {
    const canvas = document.getElementById('rain-canvas') as HTMLCanvasElement | null;
    if (!canvas) return;
    let raf = 0;
    const mouse = { x: 0, y: 0 };

    const buildAtlas = () => {
      const cols = 8;
      const cell = 64;
      const size = cols * cell;
      const cv = document.createElement('canvas');
      cv.width = size;
      cv.height = size;
      const ctx = cv.getContext('2d')!;
      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = '#ffffff';
      ctx.font = '46px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const chars = 'アカサタナハマヤラ0123456789<>{}[]=+/*$#&%ABCDEFGHIJKLMNｱｲｳｴｵﾊﾋﾌﾍﾎ;:'.split('');
      for (let i = 0; i < cols * cols; i++) {
        const c = chars[i % chars.length];
        ctx.fillText(c, (i % cols) * cell + cell / 2, Math.floor(i / cols) * cell + cell / 2);
      }
      const tex = new THREE.CanvasTexture(cv);
      tex.flipY = false;
      return tex;
    };

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 9);
    const atlas = buildAtlas();
    const cols = 8;
    const count = window.innerWidth < 768 ? 800 : 1500;
    const pos = new Float32Array(count * 3);
    const aCell = new Float32Array(count * 2);
    const aSpeed = new Float32Array(count);
    const aOff = new Float32Array(count);
    const aSize = new Float32Array(count);
    const range = 30;
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 28;
      pos[i * 3 + 1] = Math.random() * range;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14 - 3;
      const gi = Math.floor(Math.random() * cols * cols);
      aCell[i * 2] = (gi % cols) / cols;
      aCell[i * 2 + 1] = Math.floor(gi / cols) / cols;
      aSpeed[i] = 0.8 + Math.random() * 2.2;
      aOff[i] = Math.random() * range;
      aSize[i] = 0.5 + Math.random() * 0.7;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aCell', new THREE.BufferAttribute(aCell, 2));
    geo.setAttribute('aSpeed', new THREE.BufferAttribute(aSpeed, 1));
    geo.setAttribute('aOff', new THREE.BufferAttribute(aOff, 1));
    geo.setAttribute('aSize', new THREE.BufferAttribute(aSize, 1));
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uRange: { value: range },
        uAtlas: { value: atlas },
        uCell: { value: 1 / cols },
        uColor: { value: new THREE.Vector3(0.49, 0.7, 0.61) }
      },
      vertexShader: `attribute vec2 aCell; attribute float aSpeed; attribute float aOff; attribute float aSize; uniform float uTime; uniform float uRange; varying vec2 vCell; varying float vBright;
        void main(){ vec3 p=position; p.y=mod(p.y-uTime*aSpeed+aOff,uRange)-uRange*0.5; vec4 mv=modelViewMatrix*vec4(p,1.0); float depth=-mv.z; vBright=clamp(1.25-depth/24.0,0.0,1.0); vCell=aCell; gl_PointSize=aSize*(260.0/depth); gl_Position=projectionMatrix*mv; }`,
      fragmentShader: `uniform sampler2D uAtlas; uniform vec3 uColor; uniform float uCell; varying vec2 vCell; varying float vBright;
        void main(){ vec2 uv=vCell+gl_PointCoord*uCell; vec4 t=texture2D(uAtlas,uv); if(t.a<0.18) discard; gl_FragColor=vec4(uColor, t.a*vBright*0.72); }`,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouse);

    const animate = () => {
      raf = requestAnimationFrame(animate);
      mat.uniforms.uTime.value = performance.now() * 0.001;
      camera.position.x += (mouse.x * 0.9 - camera.position.x) * 0.03;
      camera.position.y += (-mouse.y * 0.6 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
      geo.dispose();
      mat.dispose();
      atlas.dispose();
      try {
        renderer.dispose();
      } catch {
        /* noop */
      }
    };
  }, []);

  /* -- derived view values --------------------------------------------- */

  const active = '#d6dbd7';
  const activeBg = 'rgba(134,184,160,0.16)';
  const idle = '#6b7771';
  const idleBg = 'transparent';
  const chipLabels = ['whoami', 'about', 'career', 'skills', 'projects', 'interests', 'contact', 'clear'];
  const chips: Chip[] = chipLabels.map((lb) => ({ label: lb, run: () => run(lb) }));
  const ph = lang === 'ja' ? 'コマンドを入力 (例: help)…' : 'type a command (try: help)…';

  /* -- render ---------------------------------------------------------- */

  return (
    <>
      <canvas
        id="rain-canvas"
        style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}
      />
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background: 'radial-gradient(125% 95% at 50% 45%, rgba(8,9,10,0.5) 0%, rgba(8,9,10,0.82) 80%)'
        }}
      />

      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 6vw',
          fontSize: 12,
          letterSpacing: '0.12em'
        }}
      >
        <div style={{ color: '#86b8a0' }}>
          TAKESHI NOJIRI <span style={{ color: '#4a5650' }}>{'// interactive resume'}</span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid rgba(214,219,215,0.14)',
            borderRadius: 6,
            overflow: 'hidden'
          }}
        >
          <button
            onClick={() => setLanguage('ja')}
            style={{
              background: lang === 'ja' ? activeBg : idleBg,
              color: lang === 'ja' ? active : idle,
              border: 'none',
              fontFamily: 'inherit',
              fontSize: 11,
              letterSpacing: '0.1em',
              padding: '7px 13px',
              cursor: 'pointer'
            }}
          >
            JA
          </button>
          <button
            onClick={() => setLanguage('en')}
            style={{
              background: lang === 'en' ? activeBg : idleBg,
              color: lang === 'en' ? active : idle,
              border: 'none',
              fontFamily: 'inherit',
              fontSize: 11,
              letterSpacing: '0.1em',
              padding: '7px 13px',
              cursor: 'pointer'
            }}
          >
            EN
          </button>
        </div>
      </nav>

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '88px 4vw 40px'
        }}
      >
        <div
          onClick={() => inputRef.current?.focus()}
          style={{
            width: 'min(940px,94vw)',
            height: '100%',
            maxHeight: 760,
            display: 'flex',
            flexDirection: 'column',
            background: 'rgba(9,11,12,0.74)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(214,219,215,0.13)',
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: '0 30px 90px rgba(0,0,0,0.55)'
          }}
        >
          {/* title bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '13px 18px',
              borderBottom: '1px solid rgba(214,219,215,0.09)',
              background: 'rgba(255,255,255,0.015)',
              flex: 'none'
            }}
          >
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#3a4540' }} />
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#3a4540' }} />
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#3a4540' }} />
            <span style={{ marginLeft: 12, color: '#6b7771', fontSize: 12 }}>
              nojiri@portfolio: ~/portfolio — zsh
            </span>
          </div>

          {/* body */}
          <div
            id="term-body"
            ref={bodyRef}
            style={{
              flex: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              padding: '20px 22px',
              fontSize: 13.5,
              lineHeight: 1.7
            }}
          >
            {history.map((line) => (
              <div
                key={line.id}
                style={{
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                  lineHeight: 1.7,
                  minHeight: '1.2em',
                  fontFamily: MONO,
                  fontSize: 13.5,
                  paddingLeft: line.indent
                }}
              >
                {line.parts.map((seg, i) =>
                  seg.href ? (
                    <a
                      key={i}
                      href={seg.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: seg.c, fontWeight: seg.w, textDecoration: 'none', whiteSpace: 'pre-wrap' }}
                    >
                      {seg.t}
                    </a>
                  ) : (
                    <span key={i} style={{ color: seg.c, fontWeight: seg.w, whiteSpace: 'pre-wrap' }}>
                      {seg.t}
                    </span>
                  )
                )}
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#86b8a0' }}>
              <span>{PROMPT}</span>
              {busy && (
                <span
                  style={{
                    width: 8,
                    height: 15,
                    background: '#86b8a0',
                    display: 'inline-block',
                    animation: 'term-blink 1s step-end infinite'
                  }}
                />
              )}
            </div>
          </div>

          {/* chips */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 7,
              padding: '12px 18px',
              borderTop: '1px solid rgba(214,219,215,0.08)',
              flex: 'none'
            }}
          >
            {chips.map((ch) => (
              <button
                key={ch.label}
                onClick={ch.run}
                className="term-chip"
                style={{
                  background: 'rgba(134,184,160,0.05)',
                  color: '#9aa49d',
                  border: '1px solid rgba(214,219,215,0.12)',
                  borderRadius: 5,
                  fontFamily: 'inherit',
                  fontSize: 11.5,
                  padding: '6px 11px',
                  cursor: 'pointer',
                  transition: 'color 0.2s,border-color 0.2s,background 0.2s'
                }}
              >
                {ch.label}
              </button>
            ))}
          </div>

          {/* input row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 11,
              padding: '15px 20px',
              borderTop: '1px solid rgba(214,219,215,0.1)',
              flex: 'none',
              background: 'rgba(255,255,255,0.01)'
            }}
          >
            <span style={{ color: '#86b8a0', fontSize: 14, flex: 'none' }}>{PROMPT}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              readOnly={busy}
              placeholder={ph}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#eef3ef',
                fontFamily: MONO,
                fontSize: 14,
                caretColor: '#86b8a0'
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
