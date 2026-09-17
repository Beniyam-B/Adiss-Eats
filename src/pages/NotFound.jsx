import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found-page">
      <h2>404 — Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/">Back to Menu</Link>
    </div>
  );
}

export default NotFound;