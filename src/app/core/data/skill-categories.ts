export interface SkillCategory {
  title: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    items: [
      'Angular',
      'TypeScript',
      'JavaScript',
      'RxJS',
      'NgRx',
      'Ionic',
      'HTML5',
      'CSS3',
      'SASS',
      'WebSockets',
      'Jest',
    ],
  },
  {
    title: 'Architecture & Leadership',
    items: [
      'Frontend Architecture',
      'Technical Leadership',
      'Mentoring',
      'Code Reviews',
      'Scrum',
      'Kanban',
    ],
  },
  {
    title: 'Game Development',
    items: [
      'Unreal Engine 5',
      'Coherent Gameface',
    ],
  },
  {
    title: 'Tools',
    items: [
      'Git',
      'Azure DevOps',
      'Jira',
      'Trello',
      'ChatGPT',
      'Claude',
      'Gemini',
    ],
  },
];