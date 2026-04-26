import { Input, Field } from "@chakra-ui/react";
import { PasswordInput } from "../components/ui/password-input";
import { useForm } from "react-hook-form";
import styles from "../styles/ui_css/Inputs.module.css";
import stylesForm from "../styles/pages_css/Form.module.css";
import PurpleButton from "../components/ui_elements/PurpleButton";
import GoogleBtn from "../components/ui_elements/GoogleBtn";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerUser, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const registerSubmit = async (data: any) => {
    setError("");
    setIsLoading(true);

    const { email, password, name } = data;

    try {
      await registerUser(email, password, name);
      navigate("/");
    } catch (error: any) {
      const code = error.code
      if (code === "auth/email-already-in-use") {
        setError("This E-mail is already in use");
      } else if (code === "auth/invalid-email") {
        setError("Invalid E-mail");
      } else if (code === "auth/weak-password") {
        setError("The password is weak");
      } else {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (errorCode: any) {
      setError(errorCode.message);
    }
  };
  const watchPassword = watch("password");
  return (
    <div className={stylesForm.container}>
      <form className={stylesForm.form} onSubmit={handleSubmit(registerSubmit)}>
        <h2>Create your Account!</h2>

        <div>
          <Field.Root invalid={!!errors.name}>
            <Field.Label>Username</Field.Label>
            <Input
              variant="outline"
              type="text"
              placeholder="Name"
              className={errors?.name ? styles.inputError : styles.input}
              {...register("name", {
                required: "The name is required",
                pattern: {
                  value: /^[A-Za-zÀ-ÿ\s]+$/,
                  message: "Letters only permited.",
                },
              })}
            />
            <Field.ErrorText>
              {typeof errors.name?.message === "string"
                ? errors.name.message
                : ""}
            </Field.ErrorText>
          </Field.Root>
        </div>

        <div>
          <Field.Root invalid={!!errors.email}>
            <Field.Label>E-mail</Field.Label>
            <Input
              variant="outline"
              placeholder="E-mail"
              className={errors?.email ? styles.inputError : styles.input}
              {...register("email", {
                required: "The E-mail is Required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid E-mail Address",
                },
              })}
            />
            <Field.ErrorText>
              {typeof errors.email?.message === "string"
                ? errors.email.message
                : ""}
            </Field.ErrorText>
          </Field.Root>
        </div>

        <div>
          <Field.Root invalid={!!errors.password}>
            <Field.Label>Password</Field.Label>
            <PasswordInput
              variant="outline"
              placeholder="Password"
              className={errors?.password ? styles.inputError : styles.input}
              {...register("password", {
                required: "The Password is Required",
                minLength: {
                  value: 7,
                  message: "Minimum 7 characters",
                },
              })}
            />
            <Field.ErrorText>
              {typeof errors.password?.message === "string"
                ? errors.password.message
                : ""}
            </Field.ErrorText>
          </Field.Root>
        </div>

        <div>
          <Field.Root invalid={!!errors.confirmPassword}>
            <Field.Label>Confirmar Senha</Field.Label>
            <PasswordInput
              variant="outline"
              placeholder="Password Confirmation"
              className={
                errors?.confirmPassword ? styles.inputError : styles.input
              }
              {...register("confirmPassword", {
                required: "Password confirmation is required.",
                minLength: {
                  value: 7,
                  message: "Minimum 7 characters",
                },

                validate: (value) =>
                  value === watchPassword || "The passwords must be equal",
              })}
            />

            <Field.ErrorText>
              {typeof errors.confirmPassword?.message === "string"
                ? errors.confirmPassword.message
                : ""}
            </Field.ErrorText>
          </Field.Root>
        </div>

        {error && <p style={{color: 'red'}}>{error}</p>}

        <PurpleButton
          title={isLoading ? "Registering..." : "Register"}
          type="submit"
          disabled={isLoading}
        />
      </form>

      <span>Or</span>

      <div>
        <GoogleBtn onClick={handleGoogle} />
      </div>
    </div>
  );
};

export default Register;
