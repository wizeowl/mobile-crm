export interface InfoPortalMember {
  id: string;
  name: string;
  email: string;
}

export interface InfoPortalAttachment {
  id: string;
  name: string;
  meta: string;
}

export interface InfoPortalSection {
  id: string;
  title: string;
  body: string;
}

export interface InfoPortalFolder {
  id: string;
  name: string;
  pageCount: number;
  colorTone: 'yellow' | 'green' | 'blue' | 'purple';
  taskTitle: string;
  lastModified: string;
  sections: InfoPortalSection[];
  attachments: InfoPortalAttachment[];
}

export interface InfoPortalSnapshot {
  currentProjectsCount: number;
  growthAmount: number;
  folders: InfoPortalFolder[];
  members: InfoPortalMember[];
}

export interface ShareFolderFormState {
  memberIds: Array<string | null>;
}

export interface ShareFolderValidationErrors {
  memberIds: string[];
}
