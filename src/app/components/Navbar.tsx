"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  House,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
} from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", icon: House, href: "#home" },
    { name: "Shop", icon: ShoppingBag, href: "#shop" },
    { name: "Favorites", icon: Heart, href: "#favorites" },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-lg shadow-lg"
            : "bg-white/95 backdrop-blur-sm"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="bg-linear-to-br from-pink-400 via-purple-400 to-indigo-400 p-2 rounded-xl"
                animate={{
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
              <span className="bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Slidey
              </span>
            </motion.div>

            <div className="hidden md:flex items-center gap-1 ml-8 flex-1">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-linear-to-r hover:from-pink-50 hover:to-purple-50 transition-colors group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    <link.icon className="w-4 h-4 text-purple-500 group-hover:text-pink-500 transition-colors" />
                  </motion.div>
                  <span className="text-gray-700 group-hover:text-purple-500 transition-colors">
                    {link.name}
                  </span>
                </motion.a>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 text-white hover:shadow-lg transition-shadow "
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(168,25,247, 0.4",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </motion.button>

              <motion.button
                className="md:hidden p-2 rounded-xl bg-linear-to-r from-pink-100 to-purple-100"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6 text-purple-600" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-4 h-5 text-purple-500" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              className="fixed top-16 right-4 bg-white rounded-2xl shadow-2xl z-50 md:hidden overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="p-4 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 transition-colors group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="bg-gradient-to-br from-pink-100 to-purple-100 p-2 rounded-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <link.icon className="w-5 h-5 text-purple-500" />
                    </motion.div>
                    <span className="text-gray-700 group-hover:text-purple-600 transition-colors">
                      {link.name}
                    </span>
                  </motion.a>
                ))}

                <motion.button
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 text-white mt-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="bg-white/20 p-2 rounded-lg">
                    <User className="w-5 h-5" />
                  </div>
                  <span>Profile</span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
