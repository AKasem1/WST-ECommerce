'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { CategoryResponse } from '@/types/category-api';

interface NavbarProps {
  categories: CategoryResponse[];
}

export default function Navbar({ categories }: NavbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);

  const navLinks = [
    { name: 'الرئيسية', href: '/' },
    { name: 'المتجر', href: '/shop', hasDropdown: true },
    { name: 'تواصل معنا', href: '/contact' },
    { name: 'من نحن', href: '/about' }
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-white shadow-md sticky top-0 z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={120}
                height={60}
                className="object-contain"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8" dir="rtl">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setIsDropdownOpen(true)}
                onMouseLeave={() => link.hasDropdown && setIsDropdownOpen(false)}
              >
                <Link
                  href={link.href}
                  className="text-lg font-medium transition-colors duration-300"
                  style={{
                    color: 'var(--color-text-primary)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-bg-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-text-primary)';
                  }}
                >
                  {link.name}
                  {link.hasDropdown && (
                    <svg
                      className="mr-1 inline-block w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </Link>

                {/* Desktop Dropdown Menu */}
                {link.hasDropdown && (
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg overflow-hidden min-w-[280px]"
                      >
                        {categories.map((category, idx) => (
                          <motion.div
                            key={category.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05, duration: 0.3 }}
                          >
                            <Link
                              href={`/shop?category=${category._id}`}
                              className="block px-6 py-3 text-right transition-colors duration-300 border-b border-gray-100 last:border-b-0"
                              style={{
                                color: 'var(--color-text-primary)'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#f9f9f9';
                                e.currentTarget.style.color = 'var(--color-bg-primary)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'white';
                                e.currentTarget.style.color = 'var(--color-text-primary)';
                              }}
                            >
                              {category.name}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            ))}
          </div>

          {/* Mobile Hamburger Menu */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="md:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-full h-0.5 transition-all"
              style={{ backgroundColor: 'var(--color-text-primary)' }}
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-full h-0.5 transition-all"
              style={{ backgroundColor: 'var(--color-text-primary)' }}
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-full h-0.5 transition-all"
              style={{ backgroundColor: 'var(--color-text-primary)' }}
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white border-t border-gray-100"
          >
            <div className="container mx-auto px-4 py-4" dir="rtl">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  {link.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
                        className="w-full text-right py-4 text-lg font-medium transition-colors duration-300 flex items-center justify-between"
                        style={{
                          color: 'var(--color-text-primary)'
                        }}
                      >
                        <svg
                          className={`w-5 h-5 transition-transform duration-300 ${
                            isMobileCategoriesOpen ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                        <span>{link.name}</span>
                      </button>
                      
                      <AnimatePresence>
                        {isMobileCategoriesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden bg-gray-50"
                          >
                            {categories.map((category, idx) => (
                              <motion.div
                                key={category.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05, duration: 0.2 }}
                              >
                                <Link
                                  href={`/shop?category=${category._id}`}
                                  className="block py-3 px-6 text-right transition-colors duration-300"
                                  style={{
                                    color: 'var(--color-text-primary)'
                                  }}
                                  onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setIsMobileCategoriesOpen(false);
                                  }}
                                  onTouchStart={(e) => {
                                    e.currentTarget.style.color = 'var(--color-bg-primary)';
                                  }}
                                  onTouchEnd={(e) => {
                                    e.currentTarget.style.color = 'var(--color-text-primary)';
                                  }}
                                >
                                  {category.name}
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className="block py-4 text-lg font-medium transition-colors duration-300"
                      style={{
                        color: 'var(--color-text-primary)'
                      }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      onTouchStart={(e) => {
                        e.currentTarget.style.color = 'var(--color-bg-primary)';
                      }}
                      onTouchEnd={(e) => {
                        e.currentTarget.style.color = 'var(--color-text-primary)';
                      }}
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
