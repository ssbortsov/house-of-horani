/* core behaviour for content pages: header, language, newsletter, reveal, parallax, accordions */
(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const toast=m=>{const t=$('#toast');if(!t)return;t.textContent=m;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),2200);};
window.hhToast=toast;
const header=$('#header'),hero=$('#hero');
const zones=header?[...header.querySelectorAll('.bar>nav,.bar>.logo,.bar>.burger,.crumbs')]:[];
const lum=c=>{const m=c.match(/[\d.]+/g);if(!m||(m[3]!==undefined&&+m[3]<.5))return null;return(.2126*m[0]+.7152*m[1]+.0722*m[2])/255;};
const isDark=(x,y)=>{for(const el of document.elementsFromPoint(x,y)){if(header.contains(el)||el.closest('.drawer,.scrim,.mmenu'))continue;if(el.tagName==='IMG')return el.hasAttribute('data-dark');const l=lum(getComputedStyle(el).backgroundColor);if(l!==null)return l<.5;}return false;};
const onHeader=()=>{if(!header)return;const past=!hero||scrollY>hero.offsetHeight-80;let any=false;
  if(hero)for(const z of zones){const r=z.getBoundingClientRect();if(!r.width||!r.height)continue;const d=isDark(r.left+r.width/2,r.top+r.height/2);z.classList.toggle('inv',d);any=any||d;}
  header.classList.toggle('past',!!hero&&past);header.classList.toggle('solid',!hero||(past&&!any));};
const lang=$('#lang');
if(lang){$('#langBtn').onclick=e=>{e.stopPropagation();lang.classList.toggle('open');};
  lang.querySelectorAll('.menu button').forEach(b=>b.onclick=()=>{$('#langCode').textContent=b.dataset.l;lang.classList.remove('open');});
  document.addEventListener('click',()=>lang.classList.remove('open'));}
const news=$('#news');if(news)news.addEventListener('submit',e=>{e.preventDefault();toast('Thank you — you are on the list');e.target.reset();});
$$('form[data-msg]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();toast(f.dataset.msg);f.reset();const m=f.closest('.modal');if(m){m.classList.remove('on');const s=$('.scrim');s&&s.classList.remove('on');}}));
$$('.acc .head').forEach(h=>h.onclick=()=>{const a=h.parentElement;const o=a.classList.toggle('open');h.setAttribute('aria-expanded',o);});
$$('[data-add]').forEach(b=>b.addEventListener('click',()=>{toast(b.dataset.add+' added to bag');window.hhOpenDrawer&&window.hhOpenDrawer('bag');}));
$$('[aria-pressed]').forEach(b=>b.addEventListener('click',()=>b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true')));
$$('[data-soon]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();toast('This page is not in the prototype yet');}));
const rv=$$('.rv');
if(!reduce&&'IntersectionObserver' in window){rv.forEach(el=>{if(el.getBoundingClientRect().top>innerHeight)el.classList.add('pre');});
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const el=e.target;const i=[...el.parentElement.children].indexOf(el);el.style.transitionDelay=(i%5)*90+'ms';el.classList.remove('pre');io.unobserve(el);}}),{rootMargin:'0px 0px -8% 0px'});rv.forEach(el=>io.observe(el));}
const pars=$$('[data-par]');
const tick=()=>{onHeader();if(reduce)return;const vh=innerHeight;pars.forEach(img=>{const r=(img.closest('picture')||img).parentElement.getBoundingClientRect();if(r.bottom<0||r.top>vh)return;const p=(r.top+r.height/2-vh/2)/vh;img.style.transform=`translate3d(0,${(-p*img.dataset.par*100).toFixed(2)}%,0)`;});};
let raf=0;addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(()=>{raf=0;tick();});},{passive:true});
addEventListener('resize',tick);tick();
})();
