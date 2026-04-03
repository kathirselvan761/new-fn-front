import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen]);

  return (
    <div>
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 bg-blue-500 text-white">
        {isMenuOpen ? 'Close Menu' : 'Open Menu'}
      </button>

      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white">
          <p className="p-4">Menu Content Here</p>
        </div>
      )}
    </div>
  );
}
