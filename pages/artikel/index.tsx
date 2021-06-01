import Site from '../../components/Site';
import React from 'react';
import {Cockpit, CockpitArticles, cockpitBase} from '../../util/cockpit';
import Link from 'next/link';

export default function Events(props: {articles: CockpitArticles}) {
  return <Site>
    {props.articles.map(article => <Link href={`/artikel/${article._id}`}><div className="flex items-center mb-4 cursor-pointer">
      <img src={cockpitBase + article.preview_image.path} className="w-16 mr-4"/>
      <div>
        <div className="">{new Date(article._created * 1000).toLocaleDateString()}</div>
        <div className="font-bold text-lg">{article.title}</div>
      </div>

    </div></Link>)}
  </Site>;
}


export async function getServerSideProps() {
  return {
    props: {
      articles: await Cockpit.article({platform: "eni"}, {_o: 1})
    }
  }
}