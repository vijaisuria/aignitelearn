import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-xl font-bold">AIgniteLearn</h1>
                    </div>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-gray-400">Home</a>
                        <a href="#" className="hover:text-gray-400">About</a>
                        <a href="#" className="hover:text-gray-400">Services</a>
                        <a href="#" className="hover:text-gray-400">Contact</a>
                    </div>
                </div>
                <div className="mt-4 text-center md:text-left">
                    <p className="text-sm">&copy; 2023 AIgniteLearn. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;