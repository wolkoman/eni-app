import * as React from 'react';

export default function Article() {
  return <div className="py-12 flex flex-col lg:flex-row min-h-xl">
        <div className="lg:w-1/2 pr-4 font-serif flex flex-col">
          <div className="font-sans uppercase text-primary1 font-bold mb-2">Glaubensimpuls</div>
          <div className="text-4xl">Ostern - das Fest der Auferstehung</div>
          <div className="text-xl leading-7 mt-3">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </div>
        </div>
    <div className="h-80 lg:h-auto lg:w-1/2 rounded-lg" style={{backgroundImage: `url(./C4BD9A36.jpg)`, backgroundSize: 'cover'}}/>
  </div>;
}