import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="pt-20 w-full h-full">
        <Sidebar />
        <div className="pl-20">{children}</div>
      </main>
    </>
  );
};

export default ChatLayout;
