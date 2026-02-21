import { Image, StyleSheet, Text, View } from 'react-native';

import {
  AuthCard,
  AuthLayout,
  AuthTextField,
  Checkbox,
  ChoiceChipGrid,
  InfoPanel,
  OtpField,
  PasswordField,
  PrimaryButton,
  RadioGroup,
  SectionTitle,
  SelectField,
  StepFooter,
  StepLabel,
  TextButton,
} from '../components/AuthPrimitives';
import {
  Option,
  SignInFormState,
  SignInValidationErrors,
  SignUpFormState,
  StepFourErrors,
  StepOneErrors,
  StepThreeErrors,
  StepTwoErrors,
  YesNoValue,
} from '../types';
import { colors, spacing } from '../../../theme/tokens';

interface SignInScreenProps {
  form: SignInFormState;
  errors: SignInValidationErrors;
  loading: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onRememberChange: (value: boolean) => void;
  onSubmit: () => void;
  onForgotPassword: () => void;
  onCreateAccount: () => void;
}

interface SignUpStepOneScreenProps {
  form: SignUpFormState;
  errors: StepOneErrors;
  loading: boolean;
  countryCodeOptions: Option[];
  onCountryCodeChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onSmsCodeChange: (value: string[]) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onNext: () => void;
}

interface SignUpStepTwoScreenProps {
  form: SignUpFormState;
  errors: StepTwoErrors;
  loading: boolean;
  usageReasonOptions: Option[];
  roleOptions: Option[];
  onUsageReasonChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onPreferenceChange: (value: YesNoValue) => void;
  onPrevious: () => void;
  onNext: () => void;
}

interface SignUpStepThreeScreenProps {
  form: SignUpFormState;
  errors: StepThreeErrors;
  loading: boolean;
  businessDirectionOptions: Option[];
  teamSizeOptions: Option[];
  onCompanyNameChange: (value: string) => void;
  onBusinessDirectionChange: (value: string) => void;
  onTeamSizeChange: (value: string) => void;
  onPrevious: () => void;
  onNext: () => void;
}

interface SignUpStepFourScreenProps {
  form: SignUpFormState;
  errors: StepFourErrors;
  loading: boolean;
  onInviteChange: (index: number, value: string) => void;
  onAddMember: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

interface SignUpSuccessScreenProps {
  onStart: () => void;
}

const successImage = require('../../../../assets/splash-icon.png');

export function SignInScreen({
  form,
  errors,
  loading,
  onEmailChange,
  onPasswordChange,
  onRememberChange,
  onSubmit,
  onForgotPassword,
  onCreateAccount,
}: SignInScreenProps) {
  return (
    <AuthLayout>
      <AuthCard>
        <SectionTitle title="Sign In to Workroom" />

        <AuthTextField
          label="Email Address"
          value={form.email}
          placeholder="youremail@gmail.com"
          onChangeText={onEmailChange}
          keyboardType="email-address"
          error={errors.email}
        />

        <PasswordField
          label="Password"
          value={form.password}
          placeholder="********"
          onChangeText={onPasswordChange}
          error={errors.password}
        />

        <View style={styles.signInActionsRow}>
          <Checkbox label="Remember me" value={form.rememberMe} onChange={onRememberChange} />
          <TextButton label="Forgot Password?" onPress={onForgotPassword} />
        </View>

        <PrimaryButton label="Sign In" onPress={onSubmit} loading={loading} style={styles.fullWidthButton} />

        <TextButton
          label="Don't have an account?"
          onPress={onCreateAccount}
          style={styles.centeredTextButton}
        />
      </AuthCard>
    </AuthLayout>
  );
}

export function SignUpStepOneScreen({
  form,
  errors,
  loading,
  countryCodeOptions,
  onCountryCodeChange,
  onPhoneChange,
  onSmsCodeChange,
  onEmailChange,
  onPasswordChange,
  onNext,
}: SignUpStepOneScreenProps) {
  return (
    <AuthLayout footer={<StepFooter onNext={onNext} loading={loading} />}>
      <AuthCard>
        <StepLabel step="STEP 1/4" />
        <SectionTitle title="Valid your phone" />

        <View style={styles.rowFields}>
          <SelectField
            label="Country"
            placeholder="+1"
            value={form.countryCode}
            options={countryCodeOptions}
            onSelect={onCountryCodeChange}
            error={errors.countryCode}
            containerStyle={styles.countryField}
          />

          <AuthTextField
            label="Mobile Number"
            value={form.phoneNumber}
            placeholder="345 567-23-56"
            onChangeText={onPhoneChange}
            keyboardType="phone-pad"
            error={errors.phoneNumber}
            containerStyle={styles.phoneField}
          />
        </View>

        <OtpField
          label="Code from SMS"
          value={form.smsCode}
          onChange={onSmsCodeChange}
          error={errors.smsCode}
        />

        <InfoPanel>
          <Text style={styles.infoText}>SMS was sent to your number</Text>
          <Text style={styles.infoText}>{`${form.countryCode} ${form.phoneNumber || '345 673-56-67'}`}</Text>
          <Text style={styles.infoText}>It will be valid for 01:25</Text>
        </InfoPanel>

        <AuthTextField
          label="Email Address"
          value={form.email}
          placeholder="youremail@gmail.com"
          onChangeText={onEmailChange}
          keyboardType="email-address"
          error={errors.email}
        />

        <PasswordField
          label="Create Password"
          value={form.password}
          placeholder="********"
          onChangeText={onPasswordChange}
          error={errors.password}
        />
      </AuthCard>
    </AuthLayout>
  );
}

export function SignUpStepTwoScreen({
  form,
  errors,
  loading,
  usageReasonOptions,
  roleOptions,
  onUsageReasonChange,
  onRoleChange,
  onPreferenceChange,
  onPrevious,
  onNext,
}: SignUpStepTwoScreenProps) {
  return (
    <AuthLayout footer={<StepFooter onPrevious={onPrevious} onNext={onNext} loading={loading} />}>
      <AuthCard>
        <StepLabel step="STEP 2/4" />
        <SectionTitle title="Tell about yourself" />

        <SelectField
          label="Why will you use the service?"
          placeholder="Select an option"
          value={form.usageReason}
          options={usageReasonOptions}
          onSelect={onUsageReasonChange}
          error={errors.usageReason}
        />

        <SelectField
          label="What describes you best?"
          placeholder="Select your role"
          value={form.userRole}
          options={roleOptions}
          onSelect={onRoleChange}
          error={errors.userRole}
        />

        <RadioGroup
          label="What describes you best?"
          value={form.onboardingPreference}
          onChange={onPreferenceChange}
          error={errors.onboardingPreference}
        />
      </AuthCard>
    </AuthLayout>
  );
}

export function SignUpStepThreeScreen({
  form,
  errors,
  loading,
  businessDirectionOptions,
  teamSizeOptions,
  onCompanyNameChange,
  onBusinessDirectionChange,
  onTeamSizeChange,
  onPrevious,
  onNext,
}: SignUpStepThreeScreenProps) {
  return (
    <AuthLayout footer={<StepFooter onPrevious={onPrevious} onNext={onNext} loading={loading} />}>
      <AuthCard>
        <StepLabel step="STEP 3/4" />
        <SectionTitle title="Tell about your company" />

        <AuthTextField
          label="Your Company's Name"
          value={form.companyName}
          placeholder="Company's Name"
          onChangeText={onCompanyNameChange}
          error={errors.companyName}
          autoCapitalize="words"
        />

        <SelectField
          label="Business Direction"
          placeholder="Choose your direction"
          value={form.businessDirection}
          options={businessDirectionOptions}
          onSelect={onBusinessDirectionChange}
          error={errors.businessDirection}
        />

        <ChoiceChipGrid
          label="How many people in your team?"
          options={teamSizeOptions}
          selectedValue={form.teamSize}
          onSelect={onTeamSizeChange}
          error={errors.teamSize}
        />
      </AuthCard>
    </AuthLayout>
  );
}

export function SignUpStepFourScreen({
  form,
  errors,
  loading,
  onInviteChange,
  onAddMember,
  onPrevious,
  onNext,
}: SignUpStepFourScreenProps) {
  return (
    <AuthLayout footer={<StepFooter onPrevious={onPrevious} onNext={onNext} loading={loading} />}>
      <AuthCard>
        <StepLabel step="STEP 4/4" />
        <SectionTitle title="Invite Team Members" />

        {form.invites.map((invite, index) => (
          <AuthTextField
            key={`invite-${index}`}
            label={index === 0 ? "Member's Email" : `Member ${index + 1} Email`}
            value={invite}
            placeholder="memberemail@gmail.com"
            onChangeText={(value) => onInviteChange(index, value)}
            keyboardType="email-address"
            error={errors.invites[index]}
          />
        ))}

        <TextButton label="+ Add another Member" onPress={onAddMember} />
      </AuthCard>
    </AuthLayout>
  );
}

export function SignUpSuccessScreen({ onStart }: SignUpSuccessScreenProps) {
  return (
    <AuthLayout>
      <AuthCard>
        <View style={styles.successImageWrap}>
          <Image source={successImage} style={styles.successImage} resizeMode="contain" />
        </View>

        <Text style={styles.successText}>You are successfully registered!</Text>

        <PrimaryButton label="Let's Start" onPress={onStart} style={styles.successButton} />
      </AuthCard>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  signInActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
  centeredTextButton: {
    alignItems: 'center',
  },
  fullWidthButton: {
    width: '100%',
  },
  rowFields: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  countryField: {
    flex: 0.35,
  },
  phoneField: {
    flex: 0.65,
  },
  infoText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  successImageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
  },
  successImage: {
    width: 210,
    height: 180,
  },
  successText: {
    color: colors.textPrimary,
    fontSize: 32,
    lineHeight: 40,
    textAlign: 'center',
    fontWeight: '700',
    marginTop: spacing.md,
  },
  successButton: {
    alignSelf: 'center',
    marginTop: spacing.sm,
    minWidth: 180,
  },
});
