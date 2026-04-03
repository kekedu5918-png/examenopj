import fs from 'fs';

const p = 'src/components/epreuves/epreuve-2/pv-cartouches-panels-extra.tsx';
let s = fs.readFileSync(p, 'utf8');

// id='x' title="..."  →  PVCard titre="..."
s = s.replace(
  /<AccBlock id='([^']+)' title="([^"]*)">\s*\n\s*<PVCard>/g,
  (_, id, t) => `<AccBlock id='${id}' title="${t}">\n        <PVCard titre="${t}">`
);

// Multiline AccBlock with title={"..."}
s = s.replace(
  /<AccBlock\s*\n\s*id='([^']+)'\s*\n\s*title=\{"([^"]+)"\}\s*\n\s*>\s*\n\s*<PVCard>/g,
  (_, id, t) =>
    `<AccBlock\n        id='${id}'\n        title={"${t}"}\n      >\n        <PVCard titre={"${t}"}>`
);

// Single line title={"..."}
s = s.replace(
  /<AccBlock id='([^']+)' title=\{"([^"]+)"\}>\s*\n\s*<PVCard>/g,
  (_, id, t) => `<AccBlock id='${id}' title={"${t}"}>\n        <PVCard titre={"${t}"}>`
);

// title='...' (échappement \')
s = s.replace(
  /<AccBlock id='([^']+)' title='((?:\\'|[^'])*)'>\s*\n\s*<PVCard>/g,
  (_, id, t) => `<AccBlock id='${id}' title='${t}'>\n        <PVCard titre='${t}'>`
);

fs.writeFileSync(p, s);
console.log('OK');
