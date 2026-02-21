import { InfoPortalSnapshot, ShareFolderFormState } from '../types';

const defaultSections = [
  {
    id: 'ips-1',
    title: 'Requirements for website design',
    body: 'When developing the site, predominantly light styles should be used. The main sections of the site should be accessible from the first page. The first page should not contain a lot of text information.\n\nThe site design should not include:\n- flashing banners;\n- a lot of merging text.',
  },
  {
    id: 'ips-2',
    title: 'Requirements for site presentation',
    body: 'Requirements for the presentation of the main page of the site. The main page of the site must contain a graphic part, a navigation menu of the site, as well as a content area so that a site visitor from the first page can receive introductory information about the company.',
  },
  {
    id: 'ips-3',
    title: 'Access sharing requirements',
    body: 'All published sections of the site must be open for read access without user authentication. When an unauthenticated user tries to enter a private section, a login and password must be requested.',
  },
];

const defaultAttachments = [
  { id: 'ipa-1', name: 'site screens.png', meta: '10 MB PNG' },
  { id: 'ipa-2', name: 'wireframes.png', meta: '10 MB PNG' },
];

export const createEmptyShareFolderForm = (): ShareFolderFormState => ({
  memberIds: [null],
});

export const infoPortalSnapshot: InfoPortalSnapshot = {
  currentProjectsCount: 10,
  growthAmount: 3,
  members: [
    { id: 'ipm-1', name: 'Evan Yates', email: 'evanyates@gmail.com' },
    { id: 'ipm-2', name: 'Blake Silva', email: 'blake.silva@workroom.app' },
    { id: 'ipm-3', name: 'Oscar Holloway', email: 'oscar.holloway@workroom.app' },
    { id: 'ipm-4', name: 'Emily Tyler', email: 'emily.tyler@workroom.app' },
    { id: 'ipm-5', name: 'Leonard Rodriquez', email: 'leonard.rodriquez@workroom.app' },
  ],
  folders: [
    {
      id: 'ipf-1',
      name: 'Medical App',
      pageCount: 5,
      colorTone: 'yellow',
      taskTitle: 'Technical task',
      lastModified: 'Last modified Sep 12, 2020',
      sections: defaultSections,
      attachments: defaultAttachments,
    },
    {
      id: 'ipf-2',
      name: 'Fortune website',
      pageCount: 8,
      colorTone: 'green',
      taskTitle: 'Technical task',
      lastModified: 'Last modified Sep 12, 2020',
      sections: defaultSections,
      attachments: defaultAttachments,
    },
    {
      id: 'ipf-3',
      name: 'Planner App',
      pageCount: 2,
      colorTone: 'blue',
      taskTitle: 'Technical task',
      lastModified: 'Last modified Sep 12, 2020',
      sections: defaultSections,
      attachments: defaultAttachments,
    },
    {
      id: 'ipf-4',
      name: 'Time tracker - personal account',
      pageCount: 5,
      colorTone: 'purple',
      taskTitle: 'Technical task',
      lastModified: 'Last modified Sep 12, 2020',
      sections: defaultSections,
      attachments: defaultAttachments,
    },
  ],
};
