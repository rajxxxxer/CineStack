import React from 'react';
import youtube_icon from 'assets/youtube_icon.png';
import twitter_icon from 'assets/twitter_icon.png';
import instagram_icon from 'assets/instagram_icon.png';
import facebook_icon from 'assets/facebook_icon.png';

const Footer = () => {
  return (
    <div className="footer bg-black text-white px-10 py-10">
      <div className="di flex flex-col md:flex-row justify-between items-start gap-6">
        {/* Social Icons Left Aligned */}
        <div className="footer-icons flex gap-4">
          <img src={facebook_icon} alt="Facebook" className="w-4 h-4 object-cover" />
          <img src={instagram_icon} alt="Instagram" className="w-4 h-4 object-cover" />
          <img src={twitter_icon} alt="Twitter" className="w-4 h-4 object-cover" />
          <img src={youtube_icon} alt="YouTube" className="w-4 h-4 object-cover" />
        </div>

        {/* Footer Links Right Grid */}
        <ul className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs list-none">
          <li>Audio Description</li>
          <li>Help Center</li>
          <li>Terms of Use</li>
          <li>Privacy Policy</li>
          <li>Cookie Preferences</li>
          <li>Accessibility</li>
          <li>Contact Us</li>
          <li>About Us</li>
          <li>Careers</li>
          <li>Media Center</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
