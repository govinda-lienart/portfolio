// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Project site on GitHub Pages -> https://govinda-lienart.github.io/portfolio/
export default defineConfig({
  site: 'https://govinda-lienart.github.io',
  base: '/portfolio',
  integrations: [
    starlight({
      title: 'AquaMind',
      description:
        'Automated computer-vision analysis of zebrafish behaviour — an end-to-end PyTorch + OpenCV pipeline.',
      customCss: ['./src/styles/plos.css'],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/govinda-lienart/AquaMind' },
      ],
      sidebar: [
        { label: 'Overview', link: '/aquamind/' },
        { label: 'About me', link: '/aquamind/about/' },
        { label: 'Introduction', link: '/aquamind/introduction/' },
        { label: 'Tank setup', link: '/aquamind/tank-setup/' },
        { label: 'Pipeline overview', link: '/aquamind/pipeline/' },
        {
          label: 'Pipeline stages',
          items: [
            { label: '1 · Frame extraction', link: '/aquamind/stages/01-frame-extraction/' },
            { label: '2 · Annotation', link: '/aquamind/stages/02-annotation/' },
            { label: '3 · Dataset class', link: '/aquamind/stages/03-dataset-class/' },
            { label: '3b · Auto-labeling', link: '/aquamind/stages/03b-auto-labeling/' },
            { label: '4 · Custom tracker', link: '/aquamind/stages/04-tracker/' },
            { label: '5 · Tracker evaluation', link: '/aquamind/stages/05-tracker-evaluation/' },
            { label: '6 · Re-identification', link: '/aquamind/stages/06-reid/' },
            { label: '7 · Chasing detection', link: '/aquamind/stages/07-chasing/' },
            { label: '8 · Feeding-strike detection', link: '/aquamind/stages/08-feeding-strike/' },
            { label: '9 · Anomaly detection', link: '/aquamind/stages/09-anomaly-detection/' },
            { label: '10 · Pipeline & deployment', link: '/aquamind/stages/10-deployment/' },
            { label: '11 · Active-learning loop', link: '/aquamind/stages/11-active-learning/' },
          ],
        },
        { label: 'Discussion', link: '/aquamind/discussion/' },
        { label: 'References', link: '/aquamind/references/' },
      ],
    }),
  ],
});
