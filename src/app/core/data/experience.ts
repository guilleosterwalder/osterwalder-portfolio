export interface Experience {
  company: string;
  role: string;
  period: string;
  summary: string;
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    company: 'Teracode',
    role: 'Senior Frontend Developer',
    period: '2021 - Present',

    summary:
      'Leading frontend initiatives across healthcare and IoT solutions.',

    technologies: [
      'Angular',
      'React',
      'JQuery',
      'Leadership',
    ],
  },

  {
    company: 'Nimble Giant Entertainment',
    role: 'Game Developer / Frontend Lead',
    period: '2023 - 2025',

    summary:
      'Development of game interfaces using Unreal Engine 5 and Coherent Gameface.',

    technologies: [
      'Unreal Engine 5',
      'Gameface',
      'C++',
      'Leadership'
    ],
  },

  {
    company: 'Globant',
    role: 'Frontend Developer',
    period: '2017 - 2021',

    summary:
      'Enterprise applications across insurance, logistics and e-commerce.',

    technologies: [
      'Angular',
      'Ionic',
    ],
  },
];