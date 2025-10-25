// src/components/WelcomeCard.jsx
import React from 'react';

// We'll still accept props for user_name, textClass, secondaryText for consistency
const WelcomeCard = ({ user_name = "User", textClass, secondaryText }) => {
  return (
    // Outer div for spacing, if desired, but no specific background or layout
    <div className="py-4"> {/* Added some vertical padding here */}
      <div className="text-center"> {/* Centered horizontally */}
        <h1 className={`text-3xl sm:text-4xl font-bold ${textClass}`}>
          Welcome back <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">{user_name}</span>!
        </h1>
        <p className={`text-lg sm:text-xl ${secondaryText} mt-2`}>
          Ready to start a session?
        </p>
      </div>
    </div>
  );
};

export default WelcomeCard;
