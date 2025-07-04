    import React from 'react';
import { assets } from '../assets/assets';


    const Footer = () => {
    return (
        <footer className="bg-black text-gray-300 w-full">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 pt-14 pb-10 border-b border-gray-700">
            <div className="flex flex-col md:flex-row justify-between gap-10">
            {/* Logo & Description */}
            <div className="md:max-w-md">
                <img src="/logo.svg" alt="logo" className="w-36 h-auto" />
                <p className="mt-6 text-base leading-relaxed text-gray-300">
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type
                specimen book.
                </p>
                <div className="flex items-center gap-3 mt-6">
                <img
                    src={assets.googlePlay}
                    alt="Google Play"
                    className="h-12 border border-gray-600 rounded hover:opacity-90 transition"
                />
                <img
                    src={assets.appStore}
                    alt="App Store"
                    className="h-12 border border-gray-600 rounded hover:opacity-90 transition"
                />
                </div>
            </div>

            {/* Links */}
            <div className="flex flex-col sm:flex-row gap-10 md:gap-20">
                <div>
                <h2 className="font-semibold mb-4 text-white text-xl">Company</h2>
                <ul className="space-y-3 text-base text-gray-300">
                    <li><a href="/" className="hover:text-white transition">Home</a></li>
                    <li><a href="#" className="hover:text-white transition">About us</a></li>
                    <li><a href="#" className="hover:text-white transition">Contact us</a></li>
                    <li><a href="#" className="hover:text-white transition">Privacy policy</a></li>
                </ul>
                </div>

                <div>
                <h2 className="font-semibold mb-4 text-white text-xl">Get in touch</h2>
                <div className="space-y-3 text-base text-gray-300">
                    <p>+1-234-567-890</p>
                    <p>contact@example.com</p>
                </div>
                </div>
            </div>
            </div>
        </div>

        {/* Bottom Line */}
        <div className="text-center py-5 text-sm text-gray-500">
            Copyright © {new Date().getFullYear()}GreatStack . All Rights Reserved.
        </div>
        </footer>
    );
    };

    export default Footer;
