import { Input, Field } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import styles from "../styles/ui_css/Inputs.module.css";
import stylesForm from "../styles/pages_css/Form.module.css";
import PurpleButton from "../components/ui_elements/PurpleButton";

const ForgotPassword = () => {
  const { forgotPassword } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data: any) => {
    setError('')
    setIsLoading(true)
    try {
      await forgotPassword(data.email)
      setSuccess(true)
    } catch (error: any) {
      setError('Email not found')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={stylesForm.container}>
      <form className={stylesForm.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Recover Password</h2>

        {success ? (
          <p>Email sent! Check your inbox.</p>
        ) : (
          <>
            <Field.Root invalid={!!errors.email}>
              <Field.Label>E-mail</Field.Label>
              <Input
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
                {typeof errors.email?.message === "string" ? errors.email.message : ""}
              </Field.ErrorText>
            </Field.Root>

            {error && <p>{error}</p>}

            <PurpleButton
              title={isLoading ? "Sending..." : "Send Recovery Email"}
              type="submit"
              disabled={isLoading}
            />
          </>
        )}

        <PurpleButton title="Back to Login" onClick={() => navigate('/login')} />
      </form>
    </div>
  )
}

export default ForgotPassword