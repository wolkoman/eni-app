import Link from 'next/link';
import * as React from 'react';
import {CockpitArticles, cockpitBase} from '../util/cockpit';
import Button from './Button';

export default function Articles({articles}: { articles: CockpitArticles }) {
  const articleMax = 300;
  return <div>
    <div className="pt-12 grid md:grid-cols-2">
      <div className="h-80 rounded-sm" style={{
        backgroundImage: `url(${cockpitBase}${articles[0].preview_image.path})`,
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%'
      }}/>
      <div className="md:pl-8 flex flex-col">
        <div className="uppercase text-primary1 font-bold mb-1 mt-3">{articles[0].resort}</div>
        <div className="text-4xl font-bold">{articles[0].title}</div>
        <div className="text-lg leading-7 mt-2">
          {articles[0].content.substring(0, articleMax)}{articles[0].content.length > articleMax ? '...' : ''}
        </div>
        {articles[0].content.length > articleMax ? <div><Button label="Weiterlesen"/></div> : null}
      </div>
    </div>
    <div className="flex pt-6 items-stretch">
      <div className="flex flex-col md:grid md:grid-cols-3 gap-2 md:gap-12">
        {articles.slice(0, 3).map(article => <Link href={`/artikel/${article._id}`}>
          <div
            className="flex flex-col lg:flex-row hover:bg-gray-100 p-2 cursor-pointer">
            <div className="flex flex-col overflow-hidden">
              <div className="text-md uppercase text-primary1 font-bold">{article.resort ?? 'Neues'}</div>
              <div className="text-lg font-semibold truncate">{article.title}</div>
            </div>
          </div>
        </Link>)}
      </div>
      <Link href="/artikel">
        <div className="hover:bg-gray-100 p-2 flex items-center cursor-pointer">
          <img src="./logos-28.svg" className="w-8"/>
        </div>
      </Link>
    </div>

  </div>;
}