import { useMemo, useState } from 'react';
import { Alert } from 'react-native';

import {
  businessDirectionOptions,
  countryCodeOptions,
  initialSignInForm,
  initialSignUpForm,
  roleOptions,
  teamSizeOptions,
  usageReasonOptions,
} from './data/authDummyData';
import {
  SignInScreen,
  SignUpStepFourScreen,
  SignUpStepOneScreen,
  SignUpStepThreeScreen,
  SignUpStepTwoScreen,
  SignUpSuccessScreen,
} from './screens/AuthScreens';
import { completeSignUpWithDummyData, signInWithDummyData } from './services/authService';
import {
  SignInValidationErrors,
  StepFourErrors,
  StepOneErrors,
  StepThreeErrors,
  StepTwoErrors,
  YesNoValue,
} from './types';
import {
  hasErrors,
  validateSignIn,
  validateStepFour,
  validateStepOne,
  validateStepThree,
  validateStepTwo,
} from './validation';

type AuthView = 'sign-in' | 'sign-up' | 'success';
type SignUpStep = 1 | 2 | 3 | 4;

const emptyStepFourErrors = (count: number): StepFourErrors => ({
  invites: Array.from({ length: count }, () => ''),
});

interface AuthFlowProps {
  onSignedIn?: () => void;
}

export function AuthFlow({ onSignedIn }: AuthFlowProps) {
  const [view, setView] = useState<AuthView>('sign-in');
  const [signUpStep, setSignUpStep] = useState<SignUpStep>(1);

  const [signInForm, setSignInForm] = useState(initialSignInForm);
  const [signUpForm, setSignUpForm] = useState(initialSignUpForm);

  const [signInErrors, setSignInErrors] = useState<SignInValidationErrors>({});
  const [stepOneErrors, setStepOneErrors] = useState<StepOneErrors>({});
  const [stepTwoErrors, setStepTwoErrors] = useState<StepTwoErrors>({});
  const [stepThreeErrors, setStepThreeErrors] = useState<StepThreeErrors>({});
  const [stepFourErrors, setStepFourErrors] = useState<StepFourErrors>(
    emptyStepFourErrors(initialSignUpForm.invites.length),
  );

  const [signInLoading, setSignInLoading] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);

  const resetSignUpState = (emailSeed = '') => {
    setSignUpForm({ ...initialSignUpForm, email: emailSeed });
    setSignUpStep(1);
    setStepOneErrors({});
    setStepTwoErrors({});
    setStepThreeErrors({});
    setStepFourErrors(emptyStepFourErrors(initialSignUpForm.invites.length));
  };

  const signIn = async () => {
    const errors = validateSignIn(signInForm);
    setSignInErrors(errors);

    if (hasErrors(errors)) {
      return;
    }

    try {
      setSignInLoading(true);
      await signInWithDummyData(signInForm);
      if (onSignedIn) {
        onSignedIn();
      } else {
        Alert.alert('Signed in', 'Dummy sign-in completed successfully.');
      }
    } finally {
      setSignInLoading(false);
    }
  };

  const goToSignUp = () => {
    resetSignUpState(signInForm.email.trim());
    setView('sign-up');
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot password', 'Placeholder action. Backend flow is not connected yet.');
  };

  const goToPreviousSignUpStep = () => {
    setSignUpStep((current) => (current > 1 ? ((current - 1) as SignUpStep) : current));
  };

  const goToNextSignUpStep = async () => {
    if (signUpStep === 1) {
      const errors = validateStepOne(signUpForm);
      setStepOneErrors(errors);
      if (hasErrors(errors)) {
        return;
      }

      setSignUpStep(2);
      return;
    }

    if (signUpStep === 2) {
      const errors = validateStepTwo(signUpForm);
      setStepTwoErrors(errors);
      if (hasErrors(errors)) {
        return;
      }

      setSignUpStep(3);
      return;
    }

    if (signUpStep === 3) {
      const errors = validateStepThree(signUpForm);
      setStepThreeErrors(errors);
      if (hasErrors(errors)) {
        return;
      }

      setSignUpStep(4);
      return;
    }

    const errors = validateStepFour(signUpForm);
    setStepFourErrors(errors);
    if (hasErrors(errors)) {
      return;
    }

    try {
      setSignUpLoading(true);
      await completeSignUpWithDummyData(signUpForm);
      setView('success');
    } finally {
      setSignUpLoading(false);
    }
  };

  const stepOneScreen = (
    <SignUpStepOneScreen
      form={signUpForm}
      errors={stepOneErrors}
      loading={signUpLoading}
      countryCodeOptions={countryCodeOptions}
      onCountryCodeChange={(value) => {
        setSignUpForm((prev) => ({ ...prev, countryCode: value }));
        setStepOneErrors((prev) => ({ ...prev, countryCode: undefined }));
      }}
      onPhoneChange={(value) => {
        setSignUpForm((prev) => ({ ...prev, phoneNumber: value }));
        setStepOneErrors((prev) => ({ ...prev, phoneNumber: undefined }));
      }}
      onSmsCodeChange={(value) => {
        setSignUpForm((prev) => ({ ...prev, smsCode: value }));
        setStepOneErrors((prev) => ({ ...prev, smsCode: undefined }));
      }}
      onEmailChange={(value) => {
        setSignUpForm((prev) => ({ ...prev, email: value }));
        setStepOneErrors((prev) => ({ ...prev, email: undefined }));
      }}
      onPasswordChange={(value) => {
        setSignUpForm((prev) => ({ ...prev, password: value }));
        setStepOneErrors((prev) => ({ ...prev, password: undefined }));
      }}
      onNext={() => {
        void goToNextSignUpStep();
      }}
    />
  );

  const stepTwoScreen = (
    <SignUpStepTwoScreen
      form={signUpForm}
      errors={stepTwoErrors}
      loading={signUpLoading}
      usageReasonOptions={usageReasonOptions}
      roleOptions={roleOptions}
      onUsageReasonChange={(value) => {
        setSignUpForm((prev) => ({ ...prev, usageReason: value }));
        setStepTwoErrors((prev) => ({ ...prev, usageReason: undefined }));
      }}
      onRoleChange={(value) => {
        setSignUpForm((prev) => ({ ...prev, userRole: value }));
        setStepTwoErrors((prev) => ({ ...prev, userRole: undefined }));
      }}
      onPreferenceChange={(value: YesNoValue) => {
        setSignUpForm((prev) => ({ ...prev, onboardingPreference: value }));
        setStepTwoErrors((prev) => ({ ...prev, onboardingPreference: undefined }));
      }}
      onPrevious={goToPreviousSignUpStep}
      onNext={() => {
        void goToNextSignUpStep();
      }}
    />
  );

  const stepThreeScreen = (
    <SignUpStepThreeScreen
      form={signUpForm}
      errors={stepThreeErrors}
      loading={signUpLoading}
      businessDirectionOptions={businessDirectionOptions}
      teamSizeOptions={teamSizeOptions}
      onCompanyNameChange={(value) => {
        setSignUpForm((prev) => ({ ...prev, companyName: value }));
        setStepThreeErrors((prev) => ({ ...prev, companyName: undefined }));
      }}
      onBusinessDirectionChange={(value) => {
        setSignUpForm((prev) => ({ ...prev, businessDirection: value }));
        setStepThreeErrors((prev) => ({ ...prev, businessDirection: undefined }));
      }}
      onTeamSizeChange={(value) => {
        setSignUpForm((prev) => ({ ...prev, teamSize: value }));
        setStepThreeErrors((prev) => ({ ...prev, teamSize: undefined }));
      }}
      onPrevious={goToPreviousSignUpStep}
      onNext={() => {
        void goToNextSignUpStep();
      }}
    />
  );

  const stepFourScreen = (
    <SignUpStepFourScreen
      form={signUpForm}
      errors={stepFourErrors}
      loading={signUpLoading}
      onInviteChange={(index, value) => {
        setSignUpForm((prev) => {
          const nextInvites = [...prev.invites];
          nextInvites[index] = value;
          return { ...prev, invites: nextInvites };
        });

        setStepFourErrors((prev) => {
          const nextErrors = [...prev.invites];
          nextErrors[index] = '';
          return { invites: nextErrors };
        });
      }}
      onAddMember={() => {
        setSignUpForm((prev) => ({ ...prev, invites: [...prev.invites, ''] }));
        setStepFourErrors((prev) => ({ invites: [...prev.invites, ''] }));
      }}
      onPrevious={goToPreviousSignUpStep}
      onNext={() => {
        void goToNextSignUpStep();
      }}
    />
  );

  const signUpStepScreen = useMemo(() => {
    if (signUpStep === 1) {
      return stepOneScreen;
    }

    if (signUpStep === 2) {
      return stepTwoScreen;
    }

    if (signUpStep === 3) {
      return stepThreeScreen;
    }

    return stepFourScreen;
  }, [signUpStep, stepFourScreen, stepOneScreen, stepThreeScreen, stepTwoScreen]);

  if (view === 'sign-in') {
    return (
      <SignInScreen
        form={signInForm}
        errors={signInErrors}
        loading={signInLoading}
        onEmailChange={(value) => {
          setSignInForm((prev) => ({ ...prev, email: value }));
          setSignInErrors((prev) => ({ ...prev, email: undefined }));
        }}
        onPasswordChange={(value) => {
          setSignInForm((prev) => ({ ...prev, password: value }));
          setSignInErrors((prev) => ({ ...prev, password: undefined }));
        }}
        onRememberChange={(value) => {
          setSignInForm((prev) => ({ ...prev, rememberMe: value }));
        }}
        onSubmit={() => {
          void signIn();
        }}
        onForgotPassword={handleForgotPassword}
        onCreateAccount={goToSignUp}
      />
    );
  }

  if (view === 'success') {
    return (
      <SignUpSuccessScreen
        onStart={() => {
          setSignInForm((prev) => ({
            ...prev,
            email: signUpForm.email,
            password: '',
          }));
          setSignInErrors({});
          resetSignUpState();
          setView('sign-in');
        }}
      />
    );
  }

  return signUpStepScreen;
}
