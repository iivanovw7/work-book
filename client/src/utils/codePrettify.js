export function runCodePrettify() {
  const script = document.createElement('script');
  const head = document.getElementsByTagName('head')[0];
  const body = document.getElementsByTagName('body')[0];

  script.type = 'text/javascript';
  script.async = true;

  script.src = 'https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js?skin=sunburst';
  (head || body).appendChild(script);
}
