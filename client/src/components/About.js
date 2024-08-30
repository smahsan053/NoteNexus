import React from 'react';

const About = () => {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-teal-600 mb-4">About NoteNexus</h1>
        <p className="text-gray-700 text-lg mb-6">
          Welcome to <span className="font-semibold text-teal-500">NoteNexus</span> – Where Ideas Connect. 
          Our app is designed to help you capture, organize, and connect your thoughts seamlessly. Whether you are a student, 
          professional, or creative thinker, NoteNexus offers a clean and intuitive interface for all your note-taking needs.
        </p>
        <p className="text-gray-600">
          With powerful features and a focus on simplicity, NoteNexus makes it easy to keep your ideas organized and accessible 
          anytime, anywhere. Join our community of thinkers and start connecting your ideas today!
        </p>
      </div>
    </div>
  );
};

export default About;
