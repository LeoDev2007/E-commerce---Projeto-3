import { Dialog, Field, Input, Portal, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import styles from "../../styles/components_CSS/EditNameForm.module.css";

const EditNameForm = () => {
  const { user, updateName } = useAuth();
  const [name, setName] = useState(user?.displayName ?? "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await updateName(name);
      toast.success("Name updated!");
    } catch {
      toast.error("Failed to update name");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className={styles.triggerBtn}>Edit Name</button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content className={styles.content}>
            <Dialog.Header className={styles.header}>
              <Dialog.Title className={styles.title}>Edit Name</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body className={styles.body}>
              <Stack gap="4">
                <Field.Root>
                  <Field.Label className={styles.label}>Name</Field.Label>
                  <Input
                    className={styles.input}
                    placeholder="New name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Field.Root>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer className={styles.footer}>
              <Dialog.ActionTrigger asChild>
                <button className={styles.cancelBtn}>Cancel</button>
              </Dialog.ActionTrigger>
              <button
                className={styles.saveBtn}
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default EditNameForm;