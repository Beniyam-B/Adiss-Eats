import Skeleton from './Skeleton';

function SkeletonCard() {
  return (
    <div className="menu-card skeleton-card">
      <Skeleton className="skeleton-card__image" />
      <Skeleton className="skeleton-card__line skeleton-card__line--short" />
      <Skeleton className="skeleton-card__line skeleton-card__line--title" />
      <Skeleton className="skeleton-card__line" />
      <Skeleton className="skeleton-card__line skeleton-card__line--short" />
    </div>
  );
}

export default SkeletonCard;