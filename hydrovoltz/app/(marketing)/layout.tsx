import { Navbar } from "./_components/navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full">
      <Navbar />
      <div className="pt-20">{children}</div>
    </div>
  );
};

export default MarketingLayout;
