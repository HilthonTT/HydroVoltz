import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full">
      <Navbar />
      <main className="pt-20 w-full">{children}</main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
