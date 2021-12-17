export interface ValuesSignupForm {
  email: string;
  password: string;
  confirm_password: string;
  full_name: string;
  accepted_terms: string[];
}

export type ValuesLoginForm = Pick<ValuesSignupForm, "email" | "password">;
