import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {Permission, useStore} from '../../util/store';
import Site from '../../components/Site';
import Button from '../../components/Button';


export default function InternArticles() {
  const [isLoggedIn, permissions, load] = useStore(state => [state.isLoggedIn(), state.permissions, state.load]);
  const [news, setNews] = useState<any>();
  const [images, setImages] = useState<any>({});

  useEffect(() => {
    load();
    fetch("/api/vaticannews/articles").then(response => response.json()).then(setNews);
  }, []);

  function loadImage(link: string) {
    let path = link.split(".va/", 2)[1];
    setImages((images: any) => ({...images, [link]: ""}))
    fetch("/api/vaticannews/image", {method: "POST", body: JSON.stringify({link: path})})
      .then(response => response.json())
      .then(response => setImages((images: any) => ({...images, [link]: response.image || null})));
  }
  function addArticle(item: any) {
    fetch("/api/vaticannews/cockpit", {method: "POST", body: JSON.stringify({item})})
      .then(response => response.json())
      .then(({link}) => window.location.replace(link));
  }

  return isLoggedIn && permissions[Permission.Articles] && <Site>
    <div className="">
      {news?.items.map((item: any) => <div key={item.title} className="flex flex-row mb-3">
        <div className="bg-gray-200 w-24 h-24 flex-shrink-0 mr-4">
          {images[item.link] !== undefined
            ? <div className="h-full" style={{backgroundImage: `url(${images[item.link]})`, backgroundSize: "cover", backgroundPosition: "50% 50%"}}/>
            : <div className="flex justify-center items-center underline hover:no-underline cursor-pointer h-full"
                   onClick={() => loadImage(item.link)}>laden</div>
          }
        </div>
        <div>
          <div className="underline hover:no-underline"><Link href={item.link}>{item.title.trim()}</Link></div>
          <div>{item.content.trim()}</div>
          <Button label="Artikel laden" onClick={() => addArticle(item)}/>
        </div>
      </div>) ?? "lädt"}
    </div>
  </Site>
}
