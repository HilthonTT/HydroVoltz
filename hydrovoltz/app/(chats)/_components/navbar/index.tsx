import { Actions } from "./actions";
import { Logo } from "./logo";

export const Navbar = () => {
  return (
    <nav className="top-0 fixed z-[49] bg-secondary h-20 w-full flex items-center justify-between p-2">
      <Logo className="h-16 w-16" />
      <Actions />
    </nav>
  );
};
