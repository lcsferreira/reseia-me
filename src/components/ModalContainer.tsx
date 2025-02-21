import { Dialog, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ModalContainerProps {
  children: React.ReactNode;
  isOpen: boolean;
  width?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  onClose: () => void;
}

export const ModalContainer = ({
  children,
  isOpen,
  onClose,
  width = "sm",
}: ModalContainerProps) => {
  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      maxWidth={width}
      fullWidth
      sx={{ "& .MuiDialog-paper": { borderRadius: 4, padding: 2 } }}
    >
      {children}
    </Dialog>
  );
};
