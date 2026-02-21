import { AuthSession, SignInFormState, SignUpFormState } from '../types';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function signInWithDummyData(_payload: SignInFormState): Promise<AuthSession> {
  await sleep(650);

  return {
    token: 'dummy-auth-token',
    userId: 'user-001',
  };
}

export async function completeSignUpWithDummyData(_payload: SignUpFormState): Promise<AuthSession> {
  await sleep(900);

  return {
    token: 'dummy-signup-token',
    userId: 'user-new-001',
  };
}
