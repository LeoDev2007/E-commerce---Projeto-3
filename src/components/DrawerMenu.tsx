import { CloseButton, Drawer, Portal } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../routes/routes";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import styles from "../styles/components_CSS/Drawer.module.css";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const DrawerMenu = () => {
  const [open, setOpen] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Drawer.Root
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      placement="start"
    >
      <Drawer.Trigger asChild>
        <button className={styles.openBtn}>
          <FaBars size={26} className={styles.icon} />
        </button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner padding="4">
          <Drawer.Content rounded="md" padding="4" gap="5">
            <Drawer.Header marginTop="4">
              <Drawer.Title className={styles.title}>SHOP&GO</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body className={styles.links}>
              <NavLink to={ROUTES.HOME}>HOME</NavLink>
              <NavLink to={ROUTES.PRODUCTS}>ALL PRODUCTS</NavLink>
              <NavLink to={ROUTES.FAVORITES}>FAVORITES</NavLink>
              <NavLink to={ROUTES.CART}>CART</NavLink>
              {!user ? (
                <>
                  <button
                    onClick={() => navigate(ROUTES.LOGIN)}
                    className={styles.btn}
                  >
                    LOGIN
                  </button>
                  <button
                    onClick={() => navigate(ROUTES.REGISTER)}
                    className={styles.btn}
                  >
                    SIGN UP
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate(ROUTES.LOGIN)}
                    className={styles.btn}
                  >
                    MY ACCOUNT
                  </button>
                  <button
                    onClick={() => navigate(ROUTES.REGISTER)}
                    className={styles.btn}
                  >
                    LOGOUT
                  </button>
                </>
              )}
            </Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default DrawerMenu;
