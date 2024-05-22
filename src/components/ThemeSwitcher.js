import React from 'react';
import themes from '../themes';

const ThemeSwitcher = ({ setTheme }) => {
  return (
    <div>
      {Object.keys(themes).map(theme => (
        <button 
          key={theme} 
          onClick={() => setTheme(theme)} 
          style={{
            backgroundColor: themes[theme].background, 
            color: themes[theme].color,
            margin: '5px',
            padding: '10px'
          }}
        >
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
