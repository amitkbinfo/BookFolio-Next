import { FiStar } from 'react-icons/fi';
import clsx from 'clsx';

interface StarRatingProps {
  rating:   number;
  size?:    'sm' | 'md' | 'lg';
  showNum?: boolean;
}

export default function StarRating({ rating, size = 'md', showNum = true }: StarRatingProps) {
  const sizeMap = { sm: 'w-3 h-3', md: 'w-4 h-4', lg: 'w-5 h-5' };
  const textMap = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FiStar
          key={star}
          className={clsx(
            sizeMap[size],
            star <= Math.round(rating)
              ? 'text-amber-400 fill-amber-400'
              : 'text-ink-200',
          )}
        />
      ))}
      {showNum && (
        <span className={clsx(textMap[size], 'text-ink-400 ml-1 font-medium')}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
