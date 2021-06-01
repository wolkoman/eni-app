import Site from '../../components/Site';
import React from 'react';
import {Cockpit, CockpitArticle, cockpitBase} from '../../util/cockpit';

export default function Article({article}: {article: CockpitArticle}) {
  return <Site narrow={true}>
    <div className="flex flex-col mt-12">
        <div className="font-bold text-4xl">{article.title}</div>
        <div>{new Date(article._created * 1000).toLocaleDateString()} {article.author}</div>
    </div>
    <img src={`${cockpitBase}/${article.preview_image.path}`} className="h-52 max-w-full mr-4"/>
    <div>
      {article.content}
    </div>
  </Site>;
}


export async function getServerSideProps(context: any) {
  return {
    props: {
      article: (await Cockpit.article({platform: "eni", _id: context.params.id}, {_o: 1}))[0]
    }
  }
}