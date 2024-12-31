import React, { useState, useEffect } from 'react';
import { api } from '../service/api';
import "../App.css"
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const LoadingPlaceholder = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-200 mb-4 w-3/4"></div>
    <div className="h-4 bg-gray-200 mb-2 w-1/2"></div>
    <div className="h-48 bg-gray-200 mb-4"></div>
  </div>
);


const Footer = () => (
  <footer className="max-w-6xl mx-auto px-4 py-12 border-t border-gray-200">
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
      <div>
        <h3 className="font-bold text-sm mb-4">NEWS</h3>
        <ul className="space-y-2">
          <li><a href="#" className="text-sm text-gray-600 hover:underline">Home Page</a></li>
          <li><a href="#" className="text-sm text-gray-600 hover:underline">World</a></li>
          <li><a href="#" className="text-sm text-gray-600 hover:underline">Politics</a></li>
          <li><a href="#" className="text-sm text-gray-600 hover:underline">Business</a></li>
        </ul>
      </div>
      
      <div>
        <h3 className="font-bold text-sm mb-4">ARTS</h3>
        <ul className="space-y-2">
          <li><a href="#" className="text-sm text-gray-600 hover:underline">Movies</a></li>
          <li><a href="#" className="text-sm text-gray-600 hover:underline">Television</a></li>
          <li><a href="#" className="text-sm text-gray-600 hover:underline">Theater</a></li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-sm mb-4">OPINION</h3>
        <ul className="space-y-2">
          <li><a href="#" className="text-sm text-gray-600 hover:underline">Today's Opinion</a></li>
          <li><a href="#" className="text-sm text-gray-600 hover:underline">Editorials</a></li>
          <li><a href="#" className="text-sm text-gray-600 hover:underline">Op-Ed</a></li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-sm mb-4">MORE</h3>
        <ul className="space-y-2">
          <li><a href="#" className="text-sm text-gray-600 hover:underline">Games</a></li>
          <li><a href="#" className="text-sm text-gray-600 hover:underline">Cooking</a></li>
          <li><a href="#" className="text-sm text-gray-600 hover:underline">Audio</a></li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-sm mb-4">ACCOUNT</h3>
        <ul className="space-y-2">
          <li><a href="#" className="text-sm text-gray-600 hover:underline">Subscribe</a></li>
          <li><a href="#" className="text-sm text-gray-600 hover:underline">Manage Account</a></li>
          <li><a href="#" className="text-sm text-gray-600 hover:underline">Gift Subscriptions</a></li>
        </ul>
      </div>
    </div>
    
    <div className="mt-12 pt-6 border-t border-gray-200">
      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
        <span>© 2024 The Company</span>
        <a href="#" className="hover:underline">Contact Us</a>
        <a href="#" className="hover:underline">Accessibility</a>
        <a href="#" className="hover:underline">Work with us</a>
        <a href="#" className="hover:underline">Privacy Policy</a>
        <a href="#" className="hover:underline">Terms of Service</a>
        <a href="#" className="hover:underline">Terms of Sale</a>
        <a href="#" className="hover:underline">Site Map</a>
        <a href="#" className="hover:underline">Help</a>
      </div>
    </div>
  </footer>
);


const NavLink = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative group">
      <button
        className="px-3 py-2 hover:text-gray-600 flex items-center font-franklin text-sm"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {label}
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div 
          className="absolute left-0 w-screen bg-white shadow-lg py-4 px-6 z-50 border-t border-gray-200"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

const ArticleCard = ({ article }) => (
  <article className="mb-12">
    <Link to={`/article/${article._id}`}>
      <h2 className="text-3xl font-playfair mb-4 text-slate-800 hover:underline">{article.title}</h2>
    </Link>
    <p className="text-gray-600 mb-4 font-crimson text-lg">{article.subtitle}</p>
    <span className="text-sm text-gray-500 font-franklin">{article.readTime} MIN READ</span>
    <div className="h-48 bg-blue-200 mt-4 relative overflow-hidden">
    <img 
            src={`https://drive.google.com/thumbnail?id=${article.imageUrl}&sz=w1000`}
            alt="Article hero"
            className='overflow-clip h-max w-full'
            />
    </div>
  </article>
);

const NewsFrontend = () => {
  const [mainArticles, setMainArticles] = useState([]);
  const [sidebarArticles, setSidebarArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  const formattedDateTime = {
    date: dateTime.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    time: dateTime.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
    full: dateTime.toLocaleString()
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mainData, sideData, categoryData] = await Promise.all([
          api.getArticles({ featured: true, limit: 3 }),
          api.getArticles({ featured: false, limit: 4 }),
          api.getCategories()
        ]);

        setMainArticles(mainData);
        console.log(mainArticles)
        setSidebarArticles(sideData);
        setCategories(categoryData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-red-600">
        Error loading content: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button className="p-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <input 
              type="text" 
              placeholder="SEARCH" 
              className="border-b border-transparent focus:border-black outline-none text-sm font-franklin"
            />
            <span className="text-sm font-franklin hidden md:block">{formattedDateTime.date} {formattedDateTime.time}</span>
          </div>
          <div className="flex items-center space-x-4">
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
               <UserButton />
              </SignedIn>
          </div>
        </div>
      </div>

      {/* Logo */}
      <div className="text-center py-6">
        <h1 className="text-5xl nyt">The AIT Gazette</h1>
      </div>

      {/* Navigation */}
      <nav className="border-y border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-6 overflow-x-auto">
            {/* {categories.map(category => (
              <NavLink key={category} label={category} />
            ))} */}
            <div class="w-full inline-flex flex-nowrap">
                <ul class="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll font-weight-500 font-franklin">
                    <li>
                    Random stuff just circulating
                    </li>
                    <li>
                    Random stuff just circulating
                    </li>
                    <li>
                    Random stuff just circulating
                    </li>
                    <li>
                    Random stuff just circulating
                    </li>
            
                </ul>                
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-8">
            {loading ? (
              <LoadingPlaceholder />
            ) : (
              mainArticles.map(article => (
                <ArticleCard key={article._id} article={article} />
              ))
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            {loading ? (
              <LoadingPlaceholder />
            ) : (
              sidebarArticles.map(article => (
                <div key={article._id} className="mb-8">
                  <div className="h-48 bg-red-600 mb-4 relative overflow-hidden">
                  <img 
                    src={`https://drive.google.com/thumbnail?id=${article.imageUrl}&sz=w1000`}
                    alt="Article hero"
                    className='overflow-clip h-max w-full'
                    />
                  </div>
                  <h3 className="text-xl font-playfair mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-2 font-crimson">{article.subtitle}</p>
                  <span className="text-sm text-gray-500 font-franklin">{article.readTime} MIN READ</span>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewsFrontend;