import Site from '../../components/Site';
import React from 'react';
import {Cockpit} from '../../util/cockpit';

export default function Article() {
  return <Site narrow={true} children={[]}/>;
}


export async function getServerSideProps(context: any) {
  return {
    props: {
      article: (await Cockpit.article({platform: "eni", _id: context.params.id}, {_o: 1}))[0]
    }
  }
}