import * as React from 'react';

export default function Article() {
  return <div className="py-12 flex min-h-xl">
        <div className="w-1/2 pr-4 font-serif flex flex-col">
          <div className="font-sans uppercase text-primary1-default font-bold">Glaubensimpuls</div>
          <div className="text-4xl">Ostern - das Fest der Auferstehung</div>
          <div className="text-lg leading-6 mt-3">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </div>
        </div>
    <div className="w-1/2 rounded-lg" style={{backgroundImage: `url(./C4BD9A36.jpg)`, backgroundSize: 'cover'}}/>
  </div>;
}