import { Footer } from './footer';
import { Header } from './header';

interface TLayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<TLayoutProps> = ({ children }) => {
  return (
    <div
      className="w-[768px] mx-auto h-full flex flex-col justify-between"
      aria-label="main-wrapper"
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
};
