// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Project site on GitHub Pages -> https://govinda-lienart.github.io/portfolio/
export default defineConfig({
  site: 'https://govinda-lienart.github.io',
  base: '/portfolio',
  devToolbar: { enabled: false },
  // Stages 5-8 were renumbered to 6-9 when the model-assisted annotation stage was inserted
  // (2026-09-21); keep the old URLs working for any link already shared.
  redirects: {
    '/aquamind/stages/05-reid': '/portfolio/aquamind/stages/06-reid/',
    '/aquamind/stages/06-chasing': '/portfolio/aquamind/stages/07-chasing/',
    '/aquamind/stages/07-feeding-strike': '/portfolio/aquamind/stages/08-feeding-strike/',
    '/aquamind/stages/08-deployment': '/portfolio/aquamind/stages/09-deployment/',
  },
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
        { label: 'About this project', link: '/aquamind/' },
        {
          label: 'Architecture',
          collapsed: false,
          items: [
            { label: 'Overview', link: '/aquamind/architecture/' },
            { label: 'Detailed', link: '/aquamind/architecture/detailed/' },
          ],
        },
        { label: 'Study system', link: '/aquamind/tank-setup/' },
        {
          label: 'Pipeline stages',
          collapsed: false,
          items: [
            { label: '1 · Frame extraction', link: '/aquamind/stages/01-frame-extraction/' },
            { label: '2 · Annotation', link: '/aquamind/stages/02-annotation/' },
            { label: '3 · Object detection', link: '/aquamind/stages/03-object-detection/' },
            { label: '4 · Custom tracker', link: '/aquamind/stages/04-tracker/' },
            { label: '5 · Model-assisted annotation', link: '/aquamind/stages/05-model-assisted-annotation/' },
            { label: '6 · Re-identification', link: '/aquamind/stages/06-reid/' },
            { label: '7 · Chasing detection', link: '/aquamind/stages/07-chasing/' },
            { label: '8 · Feeding-strike detection', link: '/aquamind/stages/08-feeding-strike/' },
            { label: '9 · Pipeline & deployment', link: '/aquamind/stages/09-deployment/' },
          ],
        },
        { label: 'Discussion', link: '/aquamind/discussion/' },
      ],
    }),
  ],
});
