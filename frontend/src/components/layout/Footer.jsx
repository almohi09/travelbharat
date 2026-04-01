import { Link } from 'react-router-dom';
import { MdFacebook, MdTwitter, MdInstagram, MdEmail } from 'react-icons/md';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">🌍 TravelBharat</h3>
            <p className="text-sm text-gray-400">
              Discover the beauty and culture of India with our comprehensive travel guide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/places" className="text-sm hover:text-white transition-colors">Places</Link></li>
              <li><Link to="/states" className="text-sm hover:text-white transition-colors">States</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><Link to="/categories/temple" className="text-sm hover:text-white transition-colors">Temples</Link></li>
              <li><Link to="/categories/beach" className="text-sm hover:text-white transition-colors">Beaches</Link></li>
              <li><Link to="/categories/hill-station" className="text-sm hover:text-white transition-colors">Hill Stations</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors"><MdFacebook size={24} /></a>
              <a href="#" className="hover:text-white transition-colors"><MdTwitter size={24} /></a>
              <a href="#" className="hover:text-white transition-colors"><MdInstagram size={24} /></a>
              <a href="#" className="hover:text-white transition-colors"><MdEmail size={24} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 TravelBharat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
