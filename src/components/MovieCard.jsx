import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { PICTURE_URL } from '../constants/constants';
import puls from '../assets/images/pulse.svg';

function MovieCard({ image, name, date, country, rate, click, media }) {
  return (
    <div
      className="flex h-96 w-48 flex-col gap-2 border-b-2 border-dark hover:border-red-light cursor-pointer justify-between pb-2 transition-all ease-in-out duration-500 min-w-80 relative"
      onClick={click}>
      <div className="h-72">
        <LazyLoadImage
          src={PICTURE_URL + image}
          alt={name}
          effect="blur"
          height="288px"
          placeholderSrc={puls}
        />
      </div>
      <h1 className="text-white font-semibold truncate uppercase ml-2">{name}</h1>
      <p className="text-gray flex justify-between font-semibold ml-2">
        <span>{date?.slice(0, 4)}</span>
        <span className="text-yellow-400 fill-current">
          {Array.from({ length: parseInt(rate / 2) }, (_, i) => i + 1).map((r) => {
            return <i key={r} className="ri-star-s-fill text-yellow"></i>;
          })}
        </span>
        <span className="border px-0.5 text-xs flex flex-col justify-center uppercase">
          {country}
        </span>
        {media && (
          <span className="border px-0.5 text-xs flex flex-col justify-center uppercase">
            {media}
          </span>
        )}
      </p>
    </div>
  );
}

MovieCard.propTypes = {
  image: PropTypes.string,
  // id: PropTypes.string,
  name: PropTypes.string,
  date: PropTypes.string,
  country: PropTypes.string,
  rate: PropTypes.number,
  click: PropTypes.func,
  media: PropTypes.string
};
MovieCard.defaultProps = {
  image: '',
  // id: '',
  name: '',
  date: '',
  country: '',
  rate: 0,
  media: '',
  click: () => {}
};

export default MovieCard;
