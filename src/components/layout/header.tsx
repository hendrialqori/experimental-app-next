'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

export const Header = () => {
  const [isCollapse1, setCollapse1] = useState(false);
  const [isCollapse2, setCollapse2] = useState(false);

  return (
    <header className="flex justify-between items-center py-5">
      <h1 className="font-semibold text-lg">Experimental app</h1>
      <nav className="flex gap-3 font-[500] text-sm text-gray-600">
        <Link href={'/'}>Home</Link>
        <button
          onClick={() => setCollapse1((prev) => !prev)}
          className="relative"
        >
          Data Fetching
          {isCollapse1 ? (
            <AnimatePresence>
              <motion.ul
                animate={{ top: 30, left: 0 }}
                exit={{ opacity: 0, top: 0 }}
                className="absolute bg-gray-50 rounded-md font-normal text-sm w-[130px] p-2"
              >
                <li className="p-2 hover:bg-white rounded-md tracking-wide">
                  <Link href={'/fetching/client'}>Client side</Link>
                </li>
                <li className="p-2 hover:bg-white rounded-md tracking-wide">
                  <Link href={'/fetching/server'}>Server side</Link>
                </li>
              </motion.ul>
            </AnimatePresence>
          ) : null}
        </button>
        <button
          onClick={() => setCollapse2((prev) => !prev)}
          className="relative"
        >
          Fetching Patterns
          {isCollapse2 ? (
            <AnimatePresence>
              <motion.ul
                animate={{ top: 30, left: 0 }}
                exit={{ opacity: 0, top: 0 }}
                className="absolute bg-gray-50 rounded-md font-normal text-sm w-[130px] p-2 z-10"
              >
                <li className="p-2 hover:bg-white rounded-md tracking-wide">
                  <Link href={'/fetching-patterns/parallel'}>Parallel</Link>
                </li>
                <li className="p-2 hover:bg-white rounded-md tracking-wide">
                  <Link href={'/fetching-patterns/blocking'}>Blocking</Link>
                </li>
                <li className="p-2 hover:bg-white rounded-md tracking-wide">
                  <Link href={'/fetching-patterns/sequential'}>Sequential</Link>
                </li>
              </motion.ul>
            </AnimatePresence>
          ) : null}
        </button>
      </nav>
    </header>
  );
};
