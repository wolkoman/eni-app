import * as React from 'react';
import {CockpitArticles, cockpitBase} from '../util/cockpit';

export default function Articles({articles}: { articles: CockpitArticles }) {
  const articleMax = 300;
  return <div>
    <div className="pt-12 flex flex-col lg:flex-row">
      <div className="h-80 lg:w-1/2" style={{
        backgroundImage: `url(${cockpitBase}${articles[0].preview_image.path})`,
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%'
      }}/>
      <div className="lg:w-1/2 md:pl-8 flex flex-col">
        <div className="uppercase text-primary1 font-bold mb-1">{articles[0].resort}</div>
        <div className="text-4xl font-bold">{articles[0].title}</div>
        <div className="text-lg leading-7 mt-2">
          {articles[0].content.substring(0, articleMax)}{articles[0].content.length > articleMax ? '...' : ''}
        </div>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-2 md:gap-12 pt-6">
      {articles.slice(0, 3).map(article => <div className="flex flex-col lg:flex-row hover:bg-gray-100 p-2 cursor-pointer">
        <div className="flex flex-col overflow-hidden">
          <div className="text-md uppercase text-primary1 font-bold">{article.resort ?? 'Neues'}</div>
          <div className="text-lg font-semibold truncate">{article.title}</div>
        </div>
      </div>)}
    </div>
  </div>;
}