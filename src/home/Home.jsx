import React from 'react';
import Navbar from 'components/Navbar/Navbar.jsx';
import hero_banner from 'assets/hero_banner.jpg';
import hero_title from 'assets/hero_title.png';
import play_icon from 'assets/play_icon.png';
import info_icon from 'assets/info_icon.png';
import TitleCards from '../Titlecards/TitleCards';
import Footer from '../components/footer/Footer';

const Home = () => {
  return (
    <>
      <div className="relative w-full bg-black text-white">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <div className="relative w-full h-screen">
          {/* Background Image */}
          <img
            src={hero_banner}
            alt="Hero Banner"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10" />

          {/* Hero Content */}
          <div className="relative z-20 flex flex-col justify-center h-full max-w-4xl px-6 md:px-12">
            {/* Title Image */}
            <img
              src={hero_title}
              alt="Hero Title"
              className="w-[80%] max-w-xs md:max-w-md mb-6 object-contain"
            />

            {/* Description */}
            <p className="text-sm md:text-base mb-6 max-w-lg">
              Discovering his ties to a secret order, a young man living in modern<br />
              Istanbul embarks on a quest to save the city from an immortal enemy.
            </p>

            {/* Buttons */}
            <div className="btns flex items-center gap-4 flex-wrap">
              <button className="btn flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-md text-sm font-semibold hover:bg-red-600 hover:text-white hover:scale-105 transition-transform duration-300 shadow-md">
                <img src={play_icon} alt="Play Icon" className="w-5 h-5 object-contain" />
                <span>Play</span>
              </button>

              <button className="btn flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white rounded-md text-sm font-semibold hover:bg-red-600 hover:scale-105 transition-transform duration-300 shadow-md">
                <img src={info_icon} alt="Info Icon" className="w-5 h-5 object-contain" />
                <span>More Info</span>
              </button>
            </div>
          </div>
        </div>
<br></br>
        {/* Section Rows */}
        <div className="z-30 relative mt-[-4rem] md:mt-[-2rem]">
          <TitleCards title="Popular On CineStack" />
        </div>

        <div className="more relative z-30 space-y-20 pb-10">
          <TitleCards title="Blockbuster" />
          <TitleCards title="Action" />
          <TitleCards title="Drama" />
          <TitleCards title="Favorites for You" />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
