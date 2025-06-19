import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
   

  <div className="min-h-90 flex  bg-gray-50 dark:bg-gray-900  ">
  
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="p-10  ml-10 m-0  ">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="p-6 ">
          <div className="  bg-gray-50 dark:bg-gray-900 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};