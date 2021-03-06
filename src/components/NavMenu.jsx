import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getCurrentUser,
  getCurrentUserRole,
  unlockProfile,
} from "../services/user";

function NavMenu() {
  const navigate = useNavigate();
  const [role, setRole] = useState();

  useEffect(() => {
    const userRole = getCurrentUserRole();
    setRole(userRole.role);
  }, []);

  /**
   * Trigger that runs when the use has logged out
   */
  const onLogout = async () => {
    const currentProfile = localStorage.getItem("profileCode");
    if (currentProfile) {
      await unlockProfile(currentProfile);
    }
    localStorage.removeItem("token");
    localStorage.removeItem("profileCode");
    navigate("/");
  };

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
        {role === "admin" ? (
          <li className="nav__option">
            <Link to={"/manageContent"}> Administrar </Link>
          </li>
        ) : (
          ""
        )}
        {role === "admin" ? (
          <li className="nav__option">
            <Link to={"/reports"}> Reportes </Link>
          </li>
        ) : (
          ""
        )}
        {role === "admin" ? (
          <li className="nav__option">
            <Link to={"/simulation"}> Simulacion </Link>
          </li>
        ) : (
          ""
        )}
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Opciones
          </MenuButton>
          <MenuList zIndex={10000}>
            <MenuItem
              onClick={() => {
                navigate("/cuenta");
              }}
            >
              Cuenta
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/profiles");
              }}
            >
              Seleccionar Perfil
            </MenuItem>
            <MenuItem onClick={onLogout}>Salir</MenuItem>
          </MenuList>
        </Menu>
      </ul>
    </nav>
  );
}

export default NavMenu;
