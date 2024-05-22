import React, { useState } from 'react';
import SideNavbar from './SideNavbar';
import ThemeSwitcher from './ThemeSwitcher';
import themes from '../themes';

const SuperAdmin = () => {
  const [theme, setTheme] = useState('default');
  const [section, setSection] = useState('workflow');

  const currentTheme = themes[theme];

  const renderSection = () => {
    switch (section) {
      case 'workflow':
        return <div>Workflow Management Content</div>;
      case 'theme':
        return <ThemeSwitcher setTheme={setTheme} />;
      case 'fields':
        return <div>Fields Management Content</div>;
      case 'enquiry':
        return <div>Enquiry Message Content</div>;
      default:
        return <div>Workflow Management Content</div>;
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <SideNavbar setSection={setSection} />
      <div style={{ marginLeft: '250px', padding: '20px', backgroundColor: currentTheme.background, color: currentTheme.color, width: '100%' }}>
        <h1>Super Admin Module</h1>
        {renderSection()}
      </div>
    </div>
  );
};

export default SuperAdmin;
