import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Instagram, 
  Facebook, 
  Mail, 
  ChevronDown, 
  ArrowRight, 
  ShoppingBag, 
  Cake, 
  Bone, 
  Star,
  Menu,
  X,
  MapPin
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Shop', href: '#shop' },
    { name: 'Custom Cakes', href: '#custom' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'About', href: '#about' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4 glass' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div 
            whileHover={{ rotate: 10 }}
            className="w-10 h-10 bg-brand-pink rounded-full flex items-center justify-center text-brand-dark font-bold text-xl"
          >
            2T
          </motion.div>
          <span className="font-serif text-2xl font-bold tracking-tight text-brand-dark">2TREATSDOWN</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-brand-dark hover:text-brand-pink transition-colors uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
          <button className="bg-brand-mint text-brand-dark px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-sm">
            ORDER NOW
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-brand-dark" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-black/5 p-6 flex flex-col gap-4 md:hidden shadow-xl"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-serif italic text-brand-dark hover:text-brand-pink transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button className="bg-brand-pink text-brand-dark w-full py-3 rounded-full font-bold mt-2">
              ORDER NOW
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden flex items-center justify-center">
      {/* Background Image & Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/dogcelebration/1920/1080?blur=2" 
          alt="Hero Background" 
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        {/* Brand Blobs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-mint/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-pink/30 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-yellow/10 blur-[150px] rounded-full" />
        
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-[#FAFAFA]" />
      </div>

      <motion.div 
        style={{ y }}
        className="relative z-10 text-center px-6 max-w-4xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block px-4 py-1 rounded-full glass text-xs font-bold tracking-[0.2em] uppercase mb-6 text-brand-dark">
            Ottawa's Gourmet Dog Bakery
          </span>
          <h1 className="text-6xl md:text-8xl font-serif font-light leading-[0.9] mb-8 text-brand-dark">
            Celebrate Your <br />
            <span className="italic text-brand-pink">Best Friend</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Personalized dog cakes, pupcakes, and healthy treats made with love and dog-safe ingredients. Baked fresh in Kanata.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-brand-dark text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-pink transition-colors w-full sm:w-auto shadow-lg">
              Request a Custom Cake
            </button>
            <button className="glass text-brand-dark px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition-colors w-full sm:w-auto flex items-center justify-center gap-2">
              Shop Treats <ArrowRight size={20} />
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-brand-dark/20">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, description, color }: any) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="glass p-8 rounded-3xl flex flex-col gap-4 group"
  >
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color} text-brand-dark`}>
      <Icon size={28} />
    </div>
    <h3 className="text-2xl font-serif italic">{title}</h3>
    <p className="text-gray-400 font-light leading-relaxed">{description}</p>
  </motion.div>
);

const ProductSection = () => {
  const products = [
    {
      title: "Custom Cakes",
      price: "From $35",
      image: "https://picsum.photos/seed/dogcake/800/800",
      tag: "Best Seller",
      link: "https://www.canva.com/design/DAG6wEb1bMk/Zv3G4DUKVPZGIBWhgSjeWg/edit"
    },
    {
      title: "Pupcakes",
      price: "From $15",
      image: "https://picsum.photos/seed/pupcake/800/800",
      tag: "Party Favorite",
      link: "https://www.canva.com/design/DAG9k33Nzek/kVIXQbSWpCpUxBwauMFkng/view"
    },
    {
      title: "PB Biscuits",
      price: "$10",
      image: "https://picsum.photos/seed/dogtreat/800/800",
      tag: "Healthy",
      link: "#"
    },
    {
      title: "Chicken Jerky",
      price: "$12",
      image: "https://picsum.photos/seed/jerky/800/800",
      tag: "Single Ingredient",
      link: "#"
    }
  ];

  return (
    <section id="shop" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
        <div className="max-w-xl">
          <h2 className="text-5xl md:text-7xl font-serif font-light leading-tight mb-4 text-brand-dark">
            Our <span className="italic text-brand-pink">Favorites</span>
          </h2>
          <p className="text-gray-500 text-lg font-light">
            Hand-crafted with human-grade ingredients. No preservatives, just pure joy for your pup.
          </p>
        </div>
        <div className="flex gap-4">
          <a href="https://www.canva.com/design/DAG6wEb1bMk/Zv3G4DUKVPZGIBWhgSjeWg/edit" target="_blank" className="text-brand-pink border-b border-brand-pink pb-1 font-bold tracking-widest text-xs uppercase hover:text-white hover:border-white transition-all">
            2025 Cake Catalog
          </a>
          <a href="https://www.canva.com/design/DAG9k33Nzek/kVIXQbSWpCpUxBwauMFkng/view" target="_blank" className="text-brand-mint border-b border-brand-mint pb-1 font-bold tracking-widest text-xs uppercase hover:text-white hover:border-white transition-all">
            2025 Pupcake Catalog
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
        {products.map((p, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden mb-6">
              <img 
                src={p.image} 
                alt={p.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-brand-yellow text-brand-dark text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {p.tag}
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="bg-white text-brand-dark px-6 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  Quick View
                </button>
              </div>
            </div>
            <h4 className="text-xl font-serif italic mb-1 text-brand-dark">{p.title}</h4>
            <p className="text-brand-pink font-mono text-sm">{p.price}</p>
          </motion.div>
        ))}
      </div>

      {/* Winnie the Pooh Highlight */}
      <div className="bg-brand-dark rounded-[40px] overflow-hidden flex flex-col md:flex-row items-center border border-white/5">
        <div className="flex-1 p-12 md:p-20">
          <span className="text-brand-yellow font-mono text-xs uppercase tracking-widest mb-4 block">Themed Creations</span>
          <h3 className="text-4xl md:text-5xl font-serif italic mb-6 text-brand-pink">Winnie the Pooh & Friends</h3>
          <p className="text-gray-300 font-light leading-relaxed mb-8 text-lg">
            A whimsical themed cake that showcases our creativity. Have a unique idea or want your dog’s name on it? We’ll bring it to life and make your pup’s celebration extra special!
          </p>
          <button className="text-white border border-white/20 px-8 py-3 rounded-full font-bold hover:bg-white hover:text-brand-dark transition-all">
            Discuss Your Idea
          </button>
        </div>
        <div className="flex-1 h-full min-h-[400px]">
          <img 
            src="https://picsum.photos/seed/pooh/800/800" 
            alt="Themed Cake" 
            className="w-full h-full object-cover opacity-90"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </section>
  );
};

const FAQItem = ({ question, answer }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-black/5">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex items-center justify-between text-left group"
      >
        <span className="text-xl md:text-2xl font-serif italic text-brand-dark group-hover:text-brand-pink transition-colors">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-brand-dark/40"
        >
          <ChevronDown size={24} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-gray-600 font-light leading-relaxed max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "What is 2 Treats Down?",
      answer: "Artlist is the ultimate platform for video creators... wait, no! 2 Treats Down is Ottawa's gourmet dog bakery! We specialize in personalized dog cakes, pupcakes, and healthy treats made especially for your pup."
    },
    {
      question: "Are your treats healthy?",
      answer: "Absolutely! We use only dog-safe, human-grade ingredients. Our treats are preservative-free and we offer single-ingredient to limited-ingredient options that are all paw-approved."
    },
    {
      question: "How do I order a custom cake?",
      answer: "To place a custom cake order, simply click the 'Request a Custom Cake' button. Let us know your celebration date, occasion, and cake size, and we’ll be in touch to discuss the delicious details."
    },
    {
      question: "Where can I pick up my order?",
      answer: "Pickup is available in Kanata at 418 Galatina Way, Kanata, ON. We also frequently appear at local Ottawa markets!"
    }
  ];

  return (
    <section id="faq" className="py-24 px-6 max-w-4xl mx-auto">
      <h2 className="text-4xl md:text-6xl font-serif font-light mb-12 text-brand-dark">
        Frequently Asked <span className="italic text-brand-pink">Questions</span>
      </h2>
      <div className="flex flex-col">
        {faqs.map((faq, i) => (
          <FAQItem key={i} {...faq} />
        ))}
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-white py-20 px-6 border-t border-black/5">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-pink rounded-full flex items-center justify-center text-brand-dark font-bold">2T</div>
          <span className="font-serif text-xl font-bold tracking-tight text-brand-dark">2TREATSDOWN</span>
        </div>
        <p className="text-gray-500 font-light leading-relaxed">
          Ottawa's premier gourmet dog bakery. We specialize in personalized dog cakes, pupcakes, and healthy treats made especially for your pup.
        </p>
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-brand-mint text-brand-dark transition-all">
            <Instagram size={20} />
          </a>
          <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-brand-mint text-brand-dark transition-all">
            <Facebook size={20} />
          </a>
          <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-brand-mint text-brand-dark transition-all">
            <Mail size={20} />
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h4 className="font-bold text-sm uppercase tracking-widest text-brand-dark">Shop</h4>
        <ul className="flex flex-col gap-4 text-gray-500 font-light">
          <li><a href="#" className="hover:text-brand-pink transition-colors">Custom Cakes</a></li>
          <li><a href="#" className="hover:text-brand-pink transition-colors">Pupcakes</a></li>
          <li><a href="#" className="hover:text-brand-pink transition-colors">Healthy Treats</a></li>
          <li><a href="#" className="hover:text-brand-pink transition-colors">Gift Cards</a></li>
        </ul>
      </div>

      <div className="flex flex-col gap-6">
        <h4 className="font-bold text-sm uppercase tracking-widest text-brand-dark">Company</h4>
        <ul className="flex flex-col gap-4 text-gray-500 font-light">
          <li><a href="#" className="hover:text-brand-pink transition-colors">About Us</a></li>
          <li><a href="#" className="hover:text-brand-pink transition-colors">Reviews</a></li>
          <li><a href="#" className="hover:text-brand-pink transition-colors">Contact</a></li>
          <li><a href="#" className="hover:text-brand-pink transition-colors">Privacy Policy</a></li>
        </ul>
      </div>

      <div className="flex flex-col gap-6">
        <h4 className="font-bold text-sm uppercase tracking-widest text-brand-dark">Location</h4>
        <div className="flex items-start gap-3 text-gray-500 font-light">
          <MapPin size={20} className="text-brand-mint shrink-0" />
          <p>418 Galatina Way,<br />Kanata, ON K2K 0E7</p>
        </div>
        <div className="mt-4 p-4 glass rounded-2xl">
          <p className="text-xs text-brand-dark font-bold uppercase tracking-tighter mb-1">Pickup Hours</p>
          <p className="text-sm text-gray-500">By appointment only. Contact us to schedule!</p>
        </div>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto pt-10 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
      <p className="text-gray-400 text-sm">© 2025 2 Treats Down. All rights reserved.</p>
      <div className="flex gap-8 text-gray-400 text-sm">
        <a href="#" className="hover:text-brand-dark transition-colors">Terms of Use</a>
        <a href="#" className="hover:text-brand-dark transition-colors">Accessibility</a>
      </div>
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen selection:bg-brand-mint selection:text-brand-dark">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Why Choose Us Section */}
        <section className="py-24 px-6 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-mint/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-pink/20 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-serif font-light mb-6 text-brand-dark">
                Why <span className="italic text-brand-pink">2TreatsDown</span>?
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto font-light">
                We believe every dog deserves a celebration as unique as they are.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={Star}
                title="Personalized Touch"
                description="Every cake is custom-designed to match your pup's personality and the occasion."
                color="bg-brand-mint"
              />
              <FeatureCard 
                icon={Bone}
                title="Healthy Ingredients"
                description="Preservative-free, dog-safe ingredients that are as healthy as they are delicious."
                color="bg-brand-pink"
              />
              <FeatureCard 
                icon={Cake}
                title="Baked Fresh"
                description="We bake every order fresh in Kanata, ensuring the best quality for your furry friend."
                color="bg-brand-yellow"
              />
            </div>
          </div>
        </section>

        <ProductSection />

        {/* Custom Order CTA */}
        <section id="custom" className="py-24 px-6">
          <div className="max-w-7xl mx-auto bg-brand-dark rounded-[40px] p-12 md:p-24 flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative border border-white/5">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-mint/10 to-brand-pink/10 pointer-events-none opacity-50" />
            
            <div className="flex-1 relative z-10 text-center lg:text-left">
              <h2 className="text-5xl md:text-7xl font-serif font-light leading-tight mb-8 text-white">
                Ready to <span className="italic text-brand-mint">Celebrate</span>?
              </h2>
              <p className="text-xl text-gray-300 mb-10 font-light leading-relaxed">
                Whether it’s a birthday, gotcha day, or just because, our dog-friendly cakes are the perfect way to show your love.
              </p>
              <button className="bg-brand-pink text-brand-dark px-12 py-5 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-lg shadow-brand-pink/20">
                Request a Custom Cake
              </button>
            </div>
            
            <div className="flex-1 relative">
              <motion.div 
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <img 
                  src="https://picsum.photos/seed/dogparty/1000/1000" 
                  alt="Dog Party" 
                  className="rounded-3xl shadow-2xl opacity-90"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              {/* Decorative blobs */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-yellow rounded-full blur-3xl opacity-20" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-mint rounded-full blur-3xl opacity-20" />
            </div>
          </div>
        </section>

        <FAQ />

        {/* Reviews Section */}
        <section id="reviews" className="py-24 px-6 bg-black/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-serif italic mb-4 text-brand-dark">Paw-approved Reviews</h2>
              <div className="flex justify-center gap-1 text-brand-pink">
                {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={20} />)}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Luna's Mom", text: "The cake was absolutely beautiful and Luna loved every bite! Best dog bakery in Ottawa." },
                { name: "Max's Dad", text: "Healthy treats that my picky eater actually enjoys. The sweet potato chews are a hit!" },
                { name: "Bella's Family", text: "Ordered pupcakes for Bella's 1st birthday party. All the dogs went crazy for them!" }
              ].map((review, i) => (
                <div key={i} className="glass p-8 rounded-3xl">
                  <p className="text-gray-600 italic mb-6 font-light leading-relaxed">"{review.text}"</p>
                  <p className="font-bold text-brand-dark">— {review.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Instagram Feed Placeholder */}
        <section className="py-24 px-6 text-center">
          <h2 className="text-3xl font-serif italic mb-10">Follow our journey @2treatsdown</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden glass group cursor-pointer">
                <img 
                  src={`https://picsum.photos/seed/doginst${i}/400/400`} 
                  alt="Instagram" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
