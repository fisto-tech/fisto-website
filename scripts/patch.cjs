const fs = require('fs');

const html_lines = fs.readFileSync('event-webpage-3-main/index.html', 'utf-8').split('\n').map(l => l + '\n');
const css_lines = fs.readFileSync('event-webpage-3-main/style.css', 'utf-8').split('\n').map(l => l + '\n');

const html_to_insert = html_lines.slice(172, 382);

const css_to_insert = [
  ...css_lines.slice(554, 562),
  '\n',
  ...css_lines.slice(572, 579),
  '\n',
  ...css_lines.slice(867, 1231)
];

const astro_content = fs.readFileSync('src/pages/idc.astro', 'utf-8');
const astro_lines = astro_content.split('\n').map(l => l + '\n');

let html_insert_idx = -1;
for (let i = 0; i < astro_lines.length; i++) {
    if (astro_lines[i].includes('<section id="services"')) {
        html_insert_idx = i;
        break;
    }
}

let astro_lines_html = [...astro_lines.slice(0, html_insert_idx), ...html_to_insert, ...astro_lines.slice(html_insert_idx)];

let css_insert_idx = -1;
for (let i = 0; i < astro_lines_html.length; i++) {
    if (astro_lines_html[i].includes('</style>')) {
        css_insert_idx = i;
        break;
    }
}

const final_lines = [...astro_lines_html.slice(0, css_insert_idx), ...css_to_insert, ...astro_lines_html.slice(css_insert_idx)];

fs.writeFileSync('src/pages/idc.astro', final_lines.join('').replace(/\n\n/g, '\n'), 'utf-8');
console.log('Patched idc.astro successfully');
