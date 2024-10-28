import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import React, { Fragment } from "react";

type ModalLayoutProps = {
  isOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  additionalClass?: string;
};

export const ModalLayout = (props: ModalLayoutProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 shadow-lg w-96">
        {props.children}
      </div>
    </div>
  );
};
