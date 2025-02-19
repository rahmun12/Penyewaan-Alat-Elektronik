import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface RegisterViewProps {
  onLogin: (data: RegisterPayload) => void;
  register: UseFormRegister<RegisterPayload>;
  errors: FieldErrors<RegisterPayload>;
  isSubmitting: boolean;
  handleSubmit: UseFormHandleSubmit<RegisterPayload, undefined>;
}
