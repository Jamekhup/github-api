import React from 'react';
import { useEffect } from "react";

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> =  ({ title }) => {
  useEffect(() => {
    document.title = title + " - Github API Integration Task";
  }, [title]);

  return null;
};

export default Header;
