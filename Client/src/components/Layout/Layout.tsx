import Container from "./Container/Container";
import NavBar from "./NavBar/NavBar";
import PageContent from "./PageContent/PageContent";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Container>
      <NavBar />
      <PageContent>
        <Outlet />
      </PageContent>
    </Container>
  );
};

export default Layout;
