import Header from "./Header";
import Chatbot from "./Chatbot";

// Layout component to wrap the application content
const Layout = ({ children }) => {
  return (
    <>
      <Header /> {/* Render the Header component */}
      <main>{children}</main> {/* Render the main content passed as children */}
      <Chatbot /> {/* Global chatbot component */}
    </>
  );
};

export default Layout;
