const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/h-\[8vw\]/g, 'h-[12vw]');

// Replace scale and script logic
const scriptRegex = /const scale = isSpread \? 0\.05 : 0\.08;([\s\S]*?)\/\/ Keep inline style/m;

const replacement = \const scale = isSpread ? 0.08 : 0.12; 
            
            cloneContainer.style.transform = 'scale(' + scale + ')';
            cloneContainer.style.width = isSpread ? '2000px' : '1000px';
            cloneContainer.style.height = '1414px';
            
            nums.forEach(n => {
              const pageIndex = parseInt(n) - 1;
              if(pageIndex >= 0 && pageIndex < originalPages.length) {
                const targetPage = originalPages[pageIndex];
                const clonedNode = targetPage.cloneNode(true);
                
                clonedNode.querySelectorAll('video, audio').forEach(v => {
                  v.removeAttribute('autoplay');
                  if(v.pause) v.pause();
                });
                clonedNode.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
                
                // Strip GSAP/animation classes so they are visible
                clonedNode.querySelectorAll('.up-img, .down-img, .left-img, .right-img, .opacity-0, .popup_img, .scale-img, .up-img-centered').forEach(el => {
                  el.classList.remove('up-img', 'down-img', 'left-img', 'right-img', 'opacity-0', 'popup_img', 'scale-img', 'up-img-centered');
                  el.style.opacity = '1';
                  el.style.transform = 'none';
                  el.style.animation = 'none';
                });
                
                const pageDiv = document.createElement('div');
                pageDiv.style.width = '1000px';
                pageDiv.style.height = '1414px';
                pageDiv.style.position = 'relative';
                pageDiv.style.overflow = 'hidden';
                pageDiv.className = targetPage.className;
                
                // Keep inline style\;

html = html.replace(scriptRegex, replacement);
fs.writeFileSync('index.html', html);
console.log('done');

