import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginViewProps {
  onLogin: (data: LoginPayload) => void;
  register: UseFormRegister<LoginPayload>;
  errors: FieldErrors<LoginPayload>;
  isSubmitting: boolean;
  handleSubmit: UseFormHandleSubmit<LoginPayload, undefined>;
}
