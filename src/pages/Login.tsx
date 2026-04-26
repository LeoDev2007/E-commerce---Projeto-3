import { Input, Field } from "@chakra-ui/react";
import { PasswordInput } from "../components/ui/password-input";
import { useForm } from "react-hook-form";
import styles from "../styles/ui_css/Inputs.module.css";
import stylesForm from "../styles/pages_css/Form.module.css";
import PurpleButton from "../components/ui_elements/PurpleButton";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../routes/routes";
import GoogleBtn from "../components/ui_elements/GoogleBtn";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginSubmit = async (data: any) => {
    setError("");
    setIsLoading(true);

    const { email, password } = data;

    try {
      await login(email, password);
      navigate("/");
    } catch (error: any) {
      const code = error.code
      if (code === "auth/user-not-found") {
        setError("User not found");
      } else if (code === "auth/wrong-password") {
        setError("Incorrect Password");
      } else if (code === "auth/invalid-email") {
        setError("Invalid E-mail");
      } else {
        setError("Error logging in");
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

  return (
    <div className={stylesForm.container}>
      <form className={stylesForm.form} onSubmit={handleSubmit(loginSubmit)}>
        <h2>Type your E-mail and your Password</h2>

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

        <div className={stylesForm.links}>
          <NavLink to={ROUTES.REGISTER}>Create an Account</NavLink>
          <NavLink to={ROUTES.FORGOT_PASSWORD}>Recover Password</NavLink>
        </div>

        {error && <p style={{color: 'red'}}>{error}</p>}

        <PurpleButton
          title={isLoading ? "Login in..." : "Login"}
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

export default Login;
