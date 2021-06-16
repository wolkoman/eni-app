import sanitizeHtml from 'sanitize-html';

const defaultOptions = {
  allowedTags: [ 'b', 'i', 'em', 'strong', 'a', 'p' ],
  allowedAttributes: {
    'a': [ 'href' ]
  },
  allowedIframeHostnames: ['www.youtube.com']
};

const sanitize = (dirty: string, options: any) => ({
  __html: sanitizeHtml(dirty, { ...defaultOptions, ...options })
});

export const SanitizeHTML = ({ html, options }: {html: string, options: any}) => (
  <div dangerouslySetInnerHTML={sanitize(html, options)} className="custom-html" />
);