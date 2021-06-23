import React from 'react';
import sanitize from 'sanitize-html';

export const SanitizeHTML = ({ html }: {html: string}) => (
  <div dangerouslySetInnerHTML={{__html: sanitize(html)}} className="custom-html" />
);