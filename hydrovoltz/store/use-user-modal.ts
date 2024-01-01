import { create } from "zustand";
import { User } from "@prisma/client";

interface UserModalStore {
  isOpen: boolean;
  user: Partial<User>;
  onOpen: (user?: User) => void;
  onClose: () => void;
}

export const useUserModal = create<UserModalStore>((set) => ({
  isOpen: false,
  user: {},
  onOpen: (user?: User) => set(() => ({ isOpen: true, user })),
  onClose: () => set(() => ({ isOpen: false })),
}));
