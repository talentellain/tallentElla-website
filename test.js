fetch('https://website-updated-seven.vercel.app').then(r=>r.text()).then(html=>{
  const match = html.match(/assets\/index-[^"']*\.js/);
  if (!match) {
    console.log('No JS found');
    return;
  }
  console.log('Found:', match[0]);
  return fetch('https://website-updated-seven.vercel.app/' + match[0])
    .then(r=>r.text())
    .then(js => {
      console.log('ReCAPTCHA in JS:', js.includes('recaptcha'));
      console.log('hide-scrollbar in JS:', js.includes('hide-scrollbar'));
    });
});
