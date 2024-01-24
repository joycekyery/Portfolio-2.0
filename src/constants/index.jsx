import Home from "../components/Home";
import AboutMe from "../components/AboutMe";
import Art from "../components/Art";
import Info from "../components/Info";
import ProjectDisplay from "../components/ProjectDisplay";

export const navLinks = [
    {
      link: "/",
      title: "Home",
      component:<Home/>,
    },
    {
      link: "/aboutMe",
      title: "About Me",
      component:<AboutMe/>,
    },
    {
      link: "/projects",
      title: "Projects",
      component:<ProjectDisplay/>,
    },
    {
      link: "/info",
      title: "Info",
      component:<Info/>,
    },
    {
      link: "/artWorks",
      title: "Artworks",
      component:<Art/>,
    },
  ];