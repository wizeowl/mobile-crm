import { infoPortalSnapshot } from '../data/infoPortalDummyData';
import { InfoPortalSnapshot } from '../types';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchInfoPortalSnapshot(): Promise<InfoPortalSnapshot> {
  await sleep(380);

  return {
    currentProjectsCount: infoPortalSnapshot.currentProjectsCount,
    growthAmount: infoPortalSnapshot.growthAmount,
    members: [...infoPortalSnapshot.members],
    folders: infoPortalSnapshot.folders.map((folder) => ({
      ...folder,
      sections: [...folder.sections],
      attachments: [...folder.attachments],
    })),
  };
}

export async function shareFolderDummy(
  folderId: string,
  memberIds: string[],
): Promise<{ folderId: string; memberIds: string[] }> {
  await sleep(320);
  return { folderId, memberIds };
}
