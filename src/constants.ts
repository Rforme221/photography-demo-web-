// System-level resolver for local asset paths during production builds
const localAssets = (import.meta as any).glob('/src/assets/**/*.{png,jpg,jpeg,gif,webp,mp4}', { eager: true, import: 'default' }) as Record<string, string>;

export function resolveAsset(path: string | undefined | null): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('blob:') || path.startsWith('data:')) {
    return path;
  }
  
  // Try to match the exact pattern key in Vite's compiled asset tree
  const resolved = localAssets[path];
  if (resolved) {
    return resolved;
  }
  
  // Support both leading-slash and non-leading-slash layouts
  const absolutePath = path.startsWith('/') ? path : `/${path}`;
  const resolvedAbsolute = localAssets[absolutePath];
  if (resolvedAbsolute) {
    return resolvedAbsolute;
  }

  return path;
}

export const GENRES = ['WEDDINGS', 'FESTIVALS', 'CULTURE', 'WILDLIFE', 'EVENTS'];

export const PORTFOLIO_ITEMS = [
  { 
    id: 1, 
    type: 'WEDDINGS', 
    title: 'The Amalfi Coast', 
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80', 
    images: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80'
    ],
    size: 'large' 
  },
  { 
    id: 3, 
    type: 'FESTIVALS', 
    title: 'Paris Fashion Week', 
    image: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?auto=format&fit=crop&q=80', 
    images: [
      'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1488900128323-21503983a07e?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80'
    ],
    size: 'small' 
  },
  { 
    id: 50, 
    type: 'WILDLIFE', 
    title: 'Symphony of the Wild', 
    image: '/src/assets/images/Wildlife/649803373_26748503848069310_2209708772683542242_n.jpg', 
    images: [
      '/src/assets/images/Wildlife/649803373_26748503848069310_2209708772683542242_n.jpg'
    ],
    size: 'large' 
  },
  { 
    id: 51, 
    type: 'WILDLIFE', 
    title: 'Silent Majesty', 
    image: '/src/assets/images/Wildlife/651763651_26755548060698222_8497391884020728362_n.jpg', 
    images: [
      '/src/assets/images/Wildlife/651763651_26755548060698222_8497391884020728362_n.jpg'
    ],
    size: 'small' 
  },
  { 
    id: 52, 
    type: 'WILDLIFE', 
    title: 'Golden Hours', 
    image: '/src/assets/images/Wildlife/652862670_26778867175032977_6244702328548430380_n.jpg', 
    images: [
      '/src/assets/images/Wildlife/652862670_26778867175032977_6244702328548430380_n.jpg'
    ],
    size: 'small' 
  },
  { 
    id: 53, 
    type: 'WILDLIFE', 
    title: 'Whispering Canopy', 
    image: '/src/assets/images/Wildlife/653155356_26749337631319265_5772763282792598166_n.jpg', 
    images: [
      '/src/assets/images/Wildlife/653155356_26749337631319265_5772763282792598166_n.jpg'
    ],
    size: 'large' 
  },
  { 
    id: 54, 
    type: 'WILDLIFE', 
    title: 'Alpine Serenade', 
    image: '/src/assets/images/Wildlife/653701950_26748625858057109_6975985201347044259_n.jpg', 
    images: [
      '/src/assets/images/Wildlife/653701950_26748625858057109_6975985201347044259_n.jpg'
    ],
    size: 'small' 
  },
  { 
    id: 55, 
    type: 'WILDLIFE', 
    title: 'Untamed Landscapes', 
    image: '/src/assets/images/Wildlife/653702305_26748625814723780_6730748887672357941_n.jpg', 
    images: [
      '/src/assets/images/Wildlife/653702305_26748625814723780_6730748887672357941_n.jpg'
    ],
    size: 'large' 
  },
  { 
    id: 56, 
    type: 'WILDLIFE', 
    title: 'Shadow Chaser', 
    image: '/src/assets/images/Wildlife/653704269_26749318091321219_7033572774203690539_n.jpg', 
    images: [
      '/src/assets/images/Wildlife/653704269_26749318091321219_7033572774203690539_n.jpg'
    ],
    size: 'small' 
  },
  { 
    id: 57, 
    type: 'WILDLIFE', 
    title: 'Ethereal Crest', 
    image: '/src/assets/images/Wildlife/653704666_26748626788057016_4248728041264364966_n.jpg', 
    images: [
      '/src/assets/images/Wildlife/653704666_26748626788057016_4248728041264364966_n.jpg'
    ],
    size: 'small' 
  },
  { 
    id: 58, 
    type: 'WILDLIFE', 
    title: 'Wild Haven', 
    image: '/src/assets/images/Wildlife/653704846_26749337807985914_4192418270302932623_n.jpg', 
    images: [
      '/src/assets/images/Wildlife/653704846_26749337807985914_4192418270302932623_n.jpg'
    ],
    size: 'large' 
  },
  { 
    id: 59, 
    type: 'WILDLIFE', 
    title: 'Savannah Guardian', 
    image: '/src/assets/images/Wildlife/653704909_26748638258055869_5333042858942306472_n.jpg', 
    images: [
      '/src/assets/images/Wildlife/653704909_26748638258055869_5333042858942306472_n.jpg'
    ],
    size: 'small' 
  },
  { 
    id: 60, 
    type: 'WILDLIFE', 
    title: 'Apex Majesty', 
    image: '/src/assets/images/Wildlife/653706102_26749337611319267_3378991732820624755_n.jpg', 
    images: [
      '/src/assets/images/Wildlife/653706102_26749337611319267_3378991732820624755_n.jpg'
    ],
    size: 'large' 
  },
  { 
    id: 61, 
    type: 'WILDLIFE', 
    title: 'Noble Stare', 
    image: '/src/assets/images/Wildlife/653706856_26748650564721305_2619844985470703389_n.jpg', 
    images: [
      '/src/assets/images/Wildlife/653706856_26748650564721305_2619844985470703389_n.jpg'
    ],
    size: 'small' 
  },
  { 
    id: 62, 
    type: 'WILDLIFE', 
    title: 'Primal Grace', 
    image: '/src/assets/images/Wildlife/653711316_26749294411323587_5112507320336669837_n.jpg', 
    images: [
      '/src/assets/images/Wildlife/653711316_26749294411323587_5112507320336669837_n.jpg'
    ],
    size: 'small' 
  },
  { 
    id: 63, 
    type: 'WILDLIFE', 
    title: 'Mountain Monarch', 
    image: '/src/assets/images/Wildlife/653713591_26779005811685780_2148473338988949454_n.jpg', 
    images: [
      '/src/assets/images/Wildlife/653713591_26779005811685780_2148473338988949454_n.jpg'
    ],
    size: 'large' 
  },
  { 
    id: 64, 
    type: 'WILDLIFE', 
    title: 'Dusk Patrol', 
    image: '/src/assets/images/Wildlife/653795517_26778867325032962_799913726713527586_n.jpg', 
    images: [
      '/src/assets/images/Wildlife/653795517_26778867325032962_799913726713527586_n.jpg'
    ],
    size: 'small' 
  },
  { 
    id: 65, 
    type: 'WILDLIFE', 
    title: 'Avian Elegance', 
    image: '/src/assets/images/Wildlife/653795978_26777981185121576_3669072576032084309_n.jpg', 
    images: [
      '/src/assets/images/Wildlife/653795978_26777981185121576_3669072576032084309_n.jpg'
    ],
    size: 'large' 
  },
  { 
    id: 66, 
    type: 'WILDLIFE', 
    title: 'Soaring Nomad', 
    image: '/src/assets/images/Wildlife/653848257_26777991981787163_2224577249771373358_n.jpg', 
    images: [
      '/src/assets/images/Wildlife/653848257_26777991981787163_2224577249771373358_n.jpg'
    ],
    size: 'small' 
  },
  { 
    id: 67, 
    type: 'WILDLIFE', 
    title: 'Feathered Grace', 
    image: '/src/assets/images/Wildlife/653900409_26778867191699642_5573569803730636348_n.jpg', 
    images: [
      '/src/assets/images/Wildlife/653900409_26778867191699642_5573569803730636348_n.jpg'
    ],
    size: 'small' 
  },
  { 
    id: 68, 
    type: 'WILDLIFE', 
    title: 'Wind Glider', 
    image: '/src/assets/images/Wildlife/653963605_26755559634030398_7551066068733376926_n.jpg', 
    images: [
      '/src/assets/images/Wildlife/653963605_26755559634030398_7551066068733376926_n.jpg'
    ],
    size: 'large' 
  },
  { 
    id: 69, 
    type: 'WILDLIFE', 
    title: 'Skyward Calling', 
    image: '/src/assets/images/Wildlife/654155457_26778867235032971_2775236570105683785_n.jpg', 
    images: [
      '/src/assets/images/Wildlife/654155457_26778867235032971_2775236570105683785_n.jpg'
    ],
    size: 'small' 
  },
  { 
    id: 70, 
    type: 'WILDLIFE', 
    title: 'Savannah Whispers', 
    image: '/src/assets/images/Wildlife/654233185_26749301011322927_5295982280746498538_n.jpg', 
    images: [
      '/src/assets/images/Wildlife/654233185_26749301011322927_5295982280746498538_n.jpg'
    ],
    size: 'large' 
  },
  { 
    id: 71, 
    type: 'WILDLIFE', 
    title: 'Sacred Plains', 
    image: '/src/assets/images/Wildlife/654367309_26781132458139782_5389486411266256010_n.jpg', 
    images: [
      '/src/assets/images/Wildlife/654367309_26781132458139782_5389486411266256010_n.jpg'
    ],
    size: 'small' 
  },
  { 
    id: 72, 
    type: 'WILDLIFE', 
    title: 'Golden Mirage', 
    image: '/src/assets/images/Wildlife/654423640_26747620444824317_2520128048175402195_n.jpg', 
    images: [
      '/src/assets/images/Wildlife/654423640_26747620444824317_2520128048175402195_n.jpg'
    ],
    size: 'small' 
  },
  { 
    id: 73, 
    type: 'WILDLIFE', 
    title: 'Horizon Gaze', 
    image: '/src/assets/images/Wildlife/654660832_26780928778160150_3998590387432757511_n.jpg', 
    images: [
      '/src/assets/images/Wildlife/654660832_26780928778160150_3998590387432757511_n.jpg'
    ],
    size: 'large' 
  },
  { 
    id: 74, 
    type: 'WILDLIFE', 
    title: 'Zion Majesty', 
    image: '/src/assets/images/Wildlife/654770382_26776495155270179_2183684064248550767_n.jpg', 
    images: [
      '/src/assets/images/Wildlife/654770382_26776495155270179_2183684064248550767_n.jpg'
    ],
    size: 'large' 
  },
  { 
    id: 6, 
    type: 'CULTURE', 
    title: 'Silence', 
    image: '/src/assets/images/Culture/IMG_0001.CR3.jpg', 
    images: [
      '/src/assets/images/Culture/IMG_0001.CR3.jpg',
      '/src/assets/images/Culture/IMG_0010.CR3.jpg',
      '/src/assets/images/Culture/IMG_0049.CR3.jpg'
    ],
    size: 'large' 
  },
  { 
    id: 13, 
    type: 'CULTURE', 
    title: 'Contours of Light', 
    image: '/src/assets/images/Culture/IMG_0010.CR3.jpg', 
    images: [
      '/src/assets/images/Culture/IMG_0010.CR3.jpg',
      '/src/assets/images/Culture/IMG_0001.CR3.jpg',
      '/src/assets/images/Culture/IMG_0123.CR3.jpg'
    ],
    size: 'small' 
  },
  { 
    id: 14, 
    type: 'CULTURE', 
    title: 'Architectural Shadows', 
    image: '/src/assets/images/Culture/IMG_0049.CR3.jpg', 
    images: [
      '/src/assets/images/Culture/IMG_0049.CR3.jpg',
      '/src/assets/images/Culture/IMG_0097.CR3.jpg',
      '/src/assets/images/Culture/IMG_0152.CR3.jpg'
    ],
    size: 'small' 
  },
  { 
    id: 15, 
    type: 'CULTURE', 
    title: 'Classic Modernism', 
    image: '/src/assets/images/Culture/IMG_0097.CR3.jpg', 
    images: [
      '/src/assets/images/Culture/IMG_0097.CR3.jpg',
      '/src/assets/images/Culture/IMG_0144.CR3.jpg',
      '/src/assets/images/Culture/IMG_0145.CR3.jpg'
    ],
    size: 'large' 
  },
  { 
    id: 16, 
    type: 'CULTURE', 
    title: 'Ethereal Form', 
    image: '/src/assets/images/Culture/IMG_0123.CR3.jpg', 
    images: [
      '/src/assets/images/Culture/IMG_0123.CR3.jpg',
      '/src/assets/images/Culture/IMG_0159.CR3.jpg',
      '/src/assets/images/Culture/IMG_0163.CR3.jpg'
    ],
    size: 'large' 
  },
  { 
    id: 17, 
    type: 'CULTURE', 
    title: 'Draped Texture', 
    image: '/src/assets/images/Culture/IMG_0144.CR3.jpg', 
    images: [
      '/src/assets/images/Culture/IMG_0144.CR3.jpg',
      '/src/assets/images/Culture/IMG_0145.CR3.jpg',
      '/src/assets/images/Culture/IMG_0167.CR3.jpg'
    ],
    size: 'small' 
  },
  { 
    id: 18, 
    type: 'CULTURE', 
    title: 'Silk Narrative', 
    image: '/src/assets/images/Culture/IMG_0145.CR3.jpg', 
    images: [
      '/src/assets/images/Culture/IMG_0145.CR3.jpg',
      '/src/assets/images/Culture/IMG_0166.CR3.jpg',
      '/src/assets/images/Culture/IMG_0175.CR3.jpg'
    ],
    size: 'small' 
  },
  { 
    id: 19, 
    type: 'CULTURE', 
    title: 'Monochrome Geometry', 
    image: '/src/assets/images/Culture/IMG_0152.CR3.jpg', 
    images: [
      '/src/assets/images/Culture/IMG_0152.CR3.jpg',
      '/src/assets/images/Culture/IMG_0159.CR3.jpg',
      '/src/assets/images/Culture/IMG_0163.CR3.jpg'
    ],
    size: 'large' 
  },
  { 
    id: 20, 
    type: 'CULTURE', 
    title: 'Chiaroscuro Reflection', 
    image: '/src/assets/images/Culture/IMG_0159.CR3.jpg', 
    images: [
      '/src/assets/images/Culture/IMG_0159.CR3.jpg',
      '/src/assets/images/Culture/IMG_0166.CR3.jpg',
      '/src/assets/images/Culture/IMG_0001.CR3.jpg'
    ],
    size: 'large' 
  },
  { 
    id: 21, 
    type: 'CULTURE', 
    title: 'The Artist Concept', 
    image: '/src/assets/images/Culture/IMG_0163.CR3.jpg', 
    images: [
      '/src/assets/images/Culture/IMG_0163.CR3.jpg',
      '/src/assets/images/Culture/IMG_0010.CR3.jpg',
      '/src/assets/images/Culture/IMG_0049.CR3.jpg'
    ],
    size: 'small' 
  },
  { 
    id: 22, 
    type: 'CULTURE', 
    title: 'Tactile Contrast', 
    image: '/src/assets/images/Culture/IMG_0166.CR3.jpg', 
    images: [
      '/src/assets/images/Culture/IMG_0166.CR3.jpg',
      '/src/assets/images/Culture/IMG_0167.CR3.jpg',
      '/src/assets/images/Culture/IMG_0175.CR3.jpg'
    ],
    size: 'small' 
  },
  { 
    id: 23, 
    type: 'CULTURE', 
    title: 'Symphony of Lines', 
    image: '/src/assets/images/Culture/IMG_0167.CR3.jpg', 
    images: [
      '/src/assets/images/Culture/IMG_0167.CR3.jpg',
      '/src/assets/images/Culture/IMG_0175.CR3.jpg',
      '/src/assets/images/Culture/IMG_0097.CR3.jpg'
    ],
    size: 'large' 
  },
  { 
    id: 24, 
    type: 'CULTURE', 
    title: 'Bespoke Editorial', 
    image: '/src/assets/images/Culture/IMG_0175.CR3.jpg', 
    images: [
      '/src/assets/images/Culture/IMG_0175.CR3.jpg',
      '/src/assets/images/Culture/IMG_0167.CR3.jpg',
      '/src/assets/images/Culture/IMG_0144.CR3.jpg'
    ],
    size: 'large' 
  },
  { 
    id: 7, 
    type: 'WEDDINGS', 
    title: 'Lake Como Villa', 
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80', 
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80'
    ],
    size: 'small' 
  },
  { 
    id: 8, 
    type: 'FESTIVALS', 
    title: 'Milan Runway', 
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80', 
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80'
    ],
    size: 'large' 
  },
  {
    id: 10,
    type: 'EVENTS',
    title: 'Venice Art Biennale',
    image: '/src/assets/images/Culture/IMG_0049.CR3.jpg',
    images: [
      '/src/assets/images/Culture/IMG_0049.CR3.jpg',
      '/src/assets/images/Culture/IMG_0010.CR3.jpg',
      '/src/assets/images/Culture/IMG_0123.CR3.jpg'
    ],
    size: 'large'
  },
  {
    id: 11,
    type: 'EVENTS',
    title: 'Milan Design Week',
    image: '/src/assets/images/Culture/IMG_0144.CR3.jpg',
    images: [
      '/src/assets/images/Culture/IMG_0144.CR3.jpg',
      '/src/assets/images/Culture/IMG_0145.CR3.jpg'
    ],
    size: 'small'
  },
  {
    id: 12,
    type: 'EVENTS',
    title: 'Teatro alla Scala Gala',
    image: '/src/assets/images/Culture/IMG_0175.CR3.jpg',
    images: [
      '/src/assets/images/Culture/IMG_0175.CR3.jpg',
      '/src/assets/images/Culture/IMG_0167.CR3.jpg'
    ],
    size: 'large'
  }
];

export const STATS = [
  { label: 'Shoots', target: 340, suffix: '+' },
  { label: 'Countries', target: 28, suffix: '' },
  { label: '48hr Delivery', target: 48, suffix: 'hr' },
  { label: 'Rating', target: 4.9, suffix: '', decimals: 1 },
];

export const TESTIMONIALS = [
  { text: "Every frame captured by Nep feels like a memory I didn't know I had. Pure cinematic magic.", author: "Elena Rossi", type: "Wedding" },
  { text: "The eye for detail and the way light is used is nothing short of artistic mastery.", author: "Marc Jacobs", type: "Editorial" },
  { text: "They don't just take photos; they craft an atmosphere that stays with you forever.", author: "Sarah Jenkins", type: "Commercial" },
];
