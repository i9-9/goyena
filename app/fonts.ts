import localFont from 'next/font/local'

export const arizonaSans = localFont({
  src: [
    { path: '../public/fonts/ABCArizonaSans-Light.woff2', weight: '300', style: 'normal' },
    { path: '../public/fonts/ABCArizonaSans-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/ABCArizonaSans-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
});

export const goudosMono = localFont({
  src: [
    { path: '../public/fonts/GOUDOS.woff2', weight: '400', style: 'normal' },
  ],
  variable: '--font-mono',
  display: 'swap',
});

export const arizonaSerif = localFont({
  src: [
    { path: '../public/fonts/ABCArizonaSerif-Regular.woff2', weight: '400', style: 'normal' },
  ],
  variable: '--font-serif',
  display: 'swap',
}); 