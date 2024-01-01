"use client";

import { useIsClient } from "usehooks-ts";

import { UserModal } from "@/components/modals/user-modal";

export const ModalProvider = () => {
  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  return (
    <>
      <UserModal />
    </>
  );
};
