import React from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';

const Header = () => {
  return (
    <header className="border-b">
        <div className="container mx-auto flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold">BoardHub</h1>
            <ThemeToggle />
        </div>
    </header>
  )
}

export default Header;