
import { Dialog, Portal } from "@chakra-ui/react";
import styles from "../../styles/components_CSS/DialogWarning.module.css";

type Props = {
  callBtnTitle: string;
  actionBtnTitle: string;
  classname?: string;
  onClick?: () => void;
};

const DialogWarning = ({
  callBtnTitle,
  actionBtnTitle,
  classname,
  onClick,
}: Props) => {
  return (
    <Dialog.Root placement='center'>
      <Dialog.Trigger>
        <button className={classname}>{callBtnTitle}</button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content className={styles.content}>
            <Dialog.CloseTrigger />
            <Dialog.Header className={styles.header}>
              <Dialog.Title className={styles.title}>Warning</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body className={styles.body}>
              <p>This action cannot be reversed</p>
            </Dialog.Body>
            <Dialog.Footer className={styles.footer}>
              <Dialog.ActionTrigger asChild>
                <button className={styles.cancelBtn}>Cancel</button>
              </Dialog.ActionTrigger>
              <button onClick={onClick} className={styles.actionBtn}>{actionBtnTitle}</button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default DialogWarning;
