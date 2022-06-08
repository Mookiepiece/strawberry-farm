import clsx from 'clsx';
import React from 'react';
import { NavLink as NavLink2 } from 'react-router-dom';
import './styles.scss';

type NavLinkProps = {
  to: string;
  className?: string;
};

const NavLink: React.FC<NavLinkProps> = ({ to, className, children }) => {
  return (
    <NavLink2 to={to} className={clsx(className, 'docs-navlink')}>
      {children}
    </NavLink2>
  );
};

export default NavLink;
