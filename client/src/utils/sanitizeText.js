import sanitizeHtml from 'sanitize-html';

export function sanitize(text) {
  return {
    __html: `<p>${sanitizeHtml(text,
      {
        allowedTags: ['img', 'p', 'pre', 'code', 'em', 'strong', 'h3'],
        allowedSchemes: ['data', 'http'],
        allowedClasses: {
          pre: ['prettyprint', 'prettyprinted'],
          p: ['fancy', 'simple']
        }
      })}</p>`
  };
}
