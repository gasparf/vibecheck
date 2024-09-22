// components/BackgroundImage.js
import React from 'react';
import Image from 'next/image';

export default function BackgroundImage() {
  return (
    <>
      <Image src="/images/juice.png" alt="placeHolder" width={2000} height={2000} className="shadow-2xl" />
      <h1 className="text-6xl absolute top-1/2 left-1/2 -translate-y-3/5 -translate-x-2/4 text-white">Vibecheck</h1>
      <p className="text-6xl absolute top-2/3 left-1/2 -translate-y-2/3 -translate-x-2/4 text-white">
        Click "Log In" to start!
      </p>
    </>
  );
}
