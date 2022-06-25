import React from 'react';

function Footer() {
  return (
    <div className="bg-gray-dark lg:pt-16 md:pt-10 sm:pt-5 pt-5 flex lg:flex-row md:flex-row sm:flex-col flex-col pb-10">
      <div className="w-96 bg-gray-dark text-white flex justify-end items-center lg:px-24 md:px-12 px-3">
        <div>
          <h1 className="text-3xl text-red-light font-bold">NETFLIX-CLONE</h1>
          <p className="text-md text-gray mt-2">
            Here , write the complete address of the Registered office address along with telephone
            number.
          </p>
          <p className="text-sm text-gray mt-2">NETFLIX-CLONE Inc © 1995 - 2022</p>
          <p className="flex gap-2 my-5 text-xl items-center align-self-center">
            {' '}
            <i className="ri-twitter-fill ri-xl text-white hover:text-red-light cursor-pointer"></i>
            <i className="ri-facebook-fill ri-xl text-white hover:text-red-light cursor-pointer"></i>
            <i className="ri-instagram-line ri-xl text-white hover:text-red-light cursor-pointer"></i>
            <i className="ri-youtube-fill ri-2x text-white hover:text-red-light cursor-pointer"></i>
          </p>
        </div>
      </div>
      <div className=" bg-gray-600 flex lg:flex-row md:flex-row flex-col items-start flex-1 justify-around  gap-5 px-5 text-gray-400">
        <div className="">
          <h1 className="text-white font-bold mb-3">DISPLAY TYPE</h1>
          <ul className="text-white font-semibold">
            <li>Action</li>
            <li>Comedy</li>
            <li>Drama</li>
            <li>Horror</li>
          </ul>
        </div>
        <div className="text-white font-semibold">
          <p className="mb-3  font-bold">PRODUCTION</p>
          <p>2018 Year</p>
          <p>2019 Year</p>
          <p>2020 Year</p>
          <p>2021 Year</p>
          <p>2022 Year</p>
        </div>
        <div className="flex flex-col gap-1 text-white font-semibold">
          <p className="mb-3 font-bold">DISPLAY QUALITY</p>
          <p>720p HDTV</p>
          <p>720p BlueRay</p>
          <p>1080p BlueRay</p>
          <p>1080p WEB-DL</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
