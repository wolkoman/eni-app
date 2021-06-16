import Site from '../../components/Site';
import React, {useEffect} from 'react';
import {Cockpit, CockpitArticle, cockpitBase} from '../../util/cockpit';
import {SanitizeHTML} from '../../components/SanitizeHtml';

export default function Article({article}: {article: CockpitArticle}) {
  useEffect(() => {if(article.external_url) {
    window.location.replace(article.external_url);
  }},[]);
  return <Site narrow={true}>
    <div className="flex flex-col mt-12 mb-6">
        <div className="font-bold text-5xl">{article.title}</div>
      <div>am <div className="inline font-bold text-lg">{new Date(article._created * 1000).toLocaleDateString()}</div> von <div className="inline font-bold">{article.author}</div></div>
    </div>
    <img src={`${cockpitBase}/${article.preview_image.path}`} className="h-52 max-w-full mr-4"/>
    <div className="text-lg">
      {article.layout?.map(layoutEntity => ({
        text: <SanitizeHTML html={layoutEntity.settings.text} options={{}}/>
      }[layoutEntity.component as 'text'] as any))}
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