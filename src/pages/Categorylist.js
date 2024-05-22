import React, { useState } from "react";
import themes from '../themes/index';
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../src/Userlist.css";

function Categorylist() {
  const [currentTheme, setCurrentTheme] = useState('default');

  const changeTheme = (theme) => {
    setCurrentTheme(theme);
    applyTheme(theme);
  };

  const applyTheme = (theme) => {
    document.getElementById('color-card').style.backgroundColor = themes[theme].background;
  };

  return (
    <div>
      <Card id="color-card" className="mb-4 p-4">
        <h5>Theme Color</h5>
        <div className="d-flex flex-wrap">
          {Object.keys(themes).map(theme => (
            <Button 
              key={theme} 
              onClick={() => changeTheme(theme)} 
              style={{
                backgroundColor: themes[theme].background, 
                color: themes[theme].color,
                margin: '5px',
                padding: '10px',
                border: 'none'
              }}
            >
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </Button>
          ))}
        </div>
      </Card>
      {/* Your Categorylist content goes here */}
    </div>
  );
}

export default Categorylist;
