import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PAGE_TITLES = {
  '/': "Today's Specials",
  '/menu': 'Full Menu',
  '/login': 'Sign In',
  '/register': 'Create Account',
  '/cart': 'Your Cart',
  '/checkout': 'Checkout',
  '/legal': 'Privacy & Terms',
};

function PageTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    let pageName = PAGE_TITLES[pathname];

    if (!pageName && pathname.startsWith('/dish/')) {
      pageName = 'Dish Details';
    }

    document.title = pageName ? `${pageName} | Addis Eats` : 'Addis Eats';
  }, [pathname]);

  return null;
}

export default PageTitle;