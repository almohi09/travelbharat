import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function HeroBanner() {
  return (
    <div className="hero mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="mb-4">Explore the Beauty of India</h1>
        <p className="mb-8">
          Discover amazing places, local experiences, and unforgettable memories across India.
          From ancient temples to pristine beaches, mountains to deserts – your adventure awaits.
        </p>
        <Link to="/places">
          <Button size="lg">
            Explore Now →
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
