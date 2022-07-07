import PropTypes from 'prop-types';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { PICTURE_URL } from '../constants/constants';
// import puls from '../assets/images/pulse.svg';

function MovieCard({ image, name, date, country, rate, click, media }) {
  return (
    <div
      className="flex h-96 w-48 flex-col gap-2 border-b-2 border-dark hover:border-primary cursor-pointer justify-between pb-2 transition-all ease-in-out duration-500 min-w-80 relative flex-auto max-w-[15rem]"
      onClick={click}>
      <div className="h-72">
        <img
          src={
            `${PICTURE_URL}${image}` ||
            'https://militaryhealthinstitute.org/wp-content/uploads/sites/37/2021/08/blank-profile-picture-png.png'
          }
          alt={name}
          placeholder="https://militaryhealthinstitute.org/wp-content/uploads/sites/37/2021/08/blank-profile-picture-png.png"
          load="eager"
          className="h-[288px] w-full"
        />
      </div>
      <h1 className="text-gray font-semibold truncate uppercase ml-2">{name}</h1>
      <p className="text-gray flex gap-2 justify-around font-semibold ml-2">
        {date && <span>{date?.slice(0, 4)}</span>}
        {rate !== 0 && (
          <span className="text-yellow-400 fill-current">
            {Array.from({ length: parseInt(rate / 2) }, (_, i) => i + 1).map((r) => {
              return <i key={r} className="ri-star-s-fill text-warning"></i>;
            })}
          </span>
        )}
        {country && (
          <span className="border px-0.5 text-xs flex items-center  uppercase">{country}</span>
        )}
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
  media: '',
  click: () => {}
};

export default MovieCard;
