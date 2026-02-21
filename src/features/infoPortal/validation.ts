import { ShareFolderFormState, ShareFolderValidationErrors } from './types';

export function validateShareFolder(form: ShareFolderFormState): ShareFolderValidationErrors {
  const errors: ShareFolderValidationErrors = {
    memberIds: form.memberIds.map(() => ''),
  };

  const seen = new Set<string>();

  form.memberIds.forEach((memberId, index) => {
    if (!memberId) {
      errors.memberIds[index] = 'Select a member.';
      return;
    }

    if (seen.has(memberId)) {
      errors.memberIds[index] = 'Member already added.';
      return;
    }

    seen.add(memberId);
  });

  return errors;
}

export function hasShareFolderErrors(errors: ShareFolderValidationErrors): boolean {
  return errors.memberIds.some((error) => Boolean(error));
}
