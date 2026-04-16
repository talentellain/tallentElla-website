fetch('https://website-updated-seven.vercel.app').then(r=>r.text()).then(html=>{
  const match = html.match(/assets\/index-[^"']*\.js/);
  console.log('js bundle:', match[0]);
  return fetch('https://website-updated-seven.vercel.app/' + match[0])
    .then(r=>r.text())
    .then(js => {
      console.log('has recaptcha:', js.toLowerCase().includes('recaptcha'));
    });
});
