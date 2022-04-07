import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function NavMenu() {
  return (
    <nav className="nav">
      <a href="#" className="nav__logo">
        StreamApp
      </a>
      <ul className="nav__options">
        <li className="nav__option">
          <Link to={"/movies"}>Peliculas</Link>
        </li>
        <li className="nav__option">
          <Link to={"/series"}>Series</Link>
        </li>
        <li className="nav__option">
          <Link to={"/search"}>Busqueda</Link>
        </li>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Opciones
          </MenuButton>
          <MenuList zIndex={10000}>
            <MenuItem>Cuenta</MenuItem>
            <MenuItem>Salir</MenuItem>
          </MenuList>
        </Menu>
      </ul>
    </nav>
  );
}

export default NavMenu;
