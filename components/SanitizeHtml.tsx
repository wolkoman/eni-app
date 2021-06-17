import React from 'react';
// @ts-ignore
import sanitize from 'htmlsanitize';

export const SanitizeHTML = ({ html }: {html: string}) => (
  <div dangerouslySetInnerHTML={{__html: sanitize(html)}} className="custom-html" />
);