import React from 'react';

const WelcomeCard = ({ user_name = "User" }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="relative">
        {/* Breathing glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
        
        {/* Card */}
        <div className="relative bg-white rounded-3xl shadow-2xl p-12 max-w-md animate-breathing">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-800">
              Welcome back <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">{user_name}</span>!
            </h1>
            <p className="text-xl text-gray-600">
              Ready to start a session?
            </p>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes breathing {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.03);
          }
        }
        
        .animate-breathing {
          animation: breathing 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default WelcomeCard;
