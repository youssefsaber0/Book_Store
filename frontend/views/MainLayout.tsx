import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import css from './MainLayout.module.css';
import views, { RequiredViewInfoMap } from './views.js';

export default function MenuOnLeftLayout() {
  const { pathname } = useLocation();
  const currentTitle = views[pathname]?.title ?? 'Unknown';

  useEffect(() => {
    document.title = currentTitle || "";
  }, [currentTitle]);

  return (
    <div className="block h-full">
      <Outlet />
    </div>
  );
}
