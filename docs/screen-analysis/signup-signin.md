# Signup/Signin Screen Analysis

## Folder scope
`/Users/Nidhal.Ben.Taher/Developer/crm/screens/signup-signin`

## Screens in this folder
1. `Sign In.png`
2. `Sign up - step 1.png`
3. `Sign up - step 1 (entering).png`
4. `Sign up - step 2.png`
5. `Sign up - step 3.png`
6. `Sign up - step 4.png`
7. `Sign up - Success.png`

## Screen-by-screen analysis

### 1) Sign In
- Purpose: existing user authentication entry point.
- Primary content:
  - Email input.
  - Password input with visibility toggle.
  - `Remember me` checkbox.
  - `Forgot Password?` text action.
  - Primary CTA: `Sign In`.
  - Secondary CTA: `Don't have an account?` (go to sign-up flow).
- States:
  - Default.
  - Input focused.
  - Password visible/hidden.
  - Remember me checked/unchecked.
  - Validation error.
  - Loading on submit.
- Interactions:
  - Submit sign in.
  - Navigate to signup flow.
  - Forgot password placeholder action.
- Validation rules:
  - Email required and valid format.
  - Password required and minimum length.

### 2) Sign up - step 1 (includes entering variant)
- Purpose: first onboarding step, identity and account credentials.
- Primary content:
  - Country code selector.
  - Mobile number input.
  - 4-digit SMS code input.
  - Informational SMS status panel (phone + validity timer).
  - Email input.
  - Password input with visibility toggle.
  - CTA: `Next Step`.
- States:
  - Default.
  - Entering/focused variant (`Sign up - step 1 (entering).png`).
  - Partial SMS code.
  - Validation errors.
  - Loading when moving to next step.
- Interactions:
  - Input and edit phone/email/password.
  - Enter SMS digits.
  - Move to step 2.
- Validation rules:
  - Country code required.
  - Mobile number required.
  - SMS code must be exactly 4 digits.
  - Email required and valid format.
  - Password required and minimum length.

### 3) Sign up - step 2
- Purpose: capture user context/profile.
- Primary content:
  - Dropdown: `Why will you use the service?`
  - Dropdown: `What describes you best?`
  - Binary choice (Yes/No).
  - `Previous` and `Next Step` CTAs.
- States:
  - Default.
  - Dropdown selection states.
  - Binary choice selection.
  - Validation errors.
- Interactions:
  - Select from dropdown options.
  - Choose Yes/No.
  - Navigate back to step 1 or forward to step 3.
- Validation rules:
  - Both dropdown values required.
  - Yes/No choice required.

### 4) Sign up - step 3
- Purpose: company profile details.
- Primary content:
  - Company name input.
  - Business direction dropdown.
  - Team-size chip grid.
  - `Previous` and `Next Step` CTAs.
- States:
  - Default.
  - Selected team-size chip.
  - Validation errors.
- Interactions:
  - Enter company name.
  - Select business direction.
  - Select one team-size option.
  - Back/next navigation.
- Validation rules:
  - Company name required.
  - Business direction required.
  - Team size selection required.

### 5) Sign up - step 4
- Purpose: invite collaborators before account completion.
- Primary content:
  - Member email field.
  - `Add another Member` action.
  - `Previous` and `Next Step` CTAs.
- States:
  - Default with one invite field.
  - Multiple invite fields after add action.
  - Validation errors for malformed emails.
- Interactions:
  - Add invite rows.
  - Edit invite email rows.
  - Back to step 3.
  - Submit onboarding.
- Validation rules:
  - Invite list optional.
  - If invite row has value, it must be valid email.

### 6) Sign up - success
- Purpose: confirmation screen after successful signup.
- Primary content:
  - Success illustration area.
  - Message: registration completed.
  - CTA: `Let's Start`.
- States:
  - Success idle.
  - CTA pressed.
- Interactions:
  - Continue to post-onboarding entry point (implemented as return to sign-in in dummy flow).
- Validation rules:
  - None.

## Assumptions (pending approval)
1. Step 4 invites are optional; blank rows are allowed, but non-empty rows must be valid emails.
2. The ambiguous yes/no question on step 2 is implemented as a required binary onboarding preference.
3. `Forgot Password?` is placeholder-only for now (no backend flow).
4. Success CTA routes users back to sign-in in this dummy implementation.
