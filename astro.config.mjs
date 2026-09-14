// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Project site on GitHub Pages -> https://govinda-lienart.github.io/portfolio/
export default defineConfig({
  site: 'https://govinda-lienart.github.io',
  base: '/portfolio',
  devToolbar: { enabled: false },
  integrations: [
    starlight({
      title: 'AquaMind',
      logo: {
        src: './src/assets/aquamind-logo.svg',
        replacesTitle: true,
      },
      description:
        'Automated computer-vision analysis of zebrafish behaviour — an end-to-end PyTorch + OpenCV pipeline.',
      customCss: ['./src/styles/plos.css'],
      head: [
        {
          tag: 'script',
          attrs: { src: '/portfolio/lightbox.js', defer: true },
        },
      ],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/govinda-lienart/AquaMind' },
      ],
      sidebar: [
        { label: 'Home', link: '/', attrs: { class: 'sl-back-link' } },
        { label: 'Overview', link: '/aquamind/' },
        { label: 'About me', link: '/aquamind/about/' },
        { label: 'Introduction', link: '/aquamind/introduction/' },
        { label: 'Tank setup', link: '/aquamind/tank-setup/' },
        { label: 'Detailed architecture', link: '/aquamind/pipeline/' },
        {
          label: 'Pipeline stages',
          collapsed: false,
          items: [
            { label: '1 · Frame extraction', link: '/aquamind/stages/01-frame-extraction/' },
            { label: '2 · Annotation', link: '/aquamind/stages/02-annotation/' },
            { label: '3 · Object detection', link: '/aquamind/stages/03-object-detection/' },
            { label: '4 · Custom tracker & evaluation', link: '/aquamind/stages/04-tracker/' },
            { label: '5 · Re-identification', link: '/aquamind/stages/05-reid/' },
            { label: '6 · Chasing detection', link: '/aquamind/stages/06-chasing/' },
            { label: '7 · Feeding-strike detection', link: '/aquamind/stages/07-feeding-strike/' },
            { label: '8 · Pipeline & deployment', link: '/aquamind/stages/08-deployment/' },
          ],
        },
        { label: 'Discussion', link: '/aquamind/discussion/' },
        { label: 'References', link: '/aquamind/references/' },
      ],
    }),
  ],
});
