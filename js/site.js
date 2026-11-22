/* shared: bag / wishlist drawer, mobile menu, modals */
(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const scrim=$('.scrim'),drawer=$('.drawer'),menu=$('.mmenu');
const close=()=>{drawer&&drawer.classList.remove('on');scrim&&scrim.classList.remove('on');$$('.modal').forEach(m=>m.classList.remove('on'));document.body.classList.remove('has-drawer','has-menu');menu&&menu.classList.remove('on');};
const tab=t=>{$$('.drawer .tab').forEach(b=>b.classList.toggle('on',b.dataset.tab===t));$$('.drawer .panel').forEach(p=>p.classList.toggle('on',p.dataset.panel===t));};
const open=t=>{if(!drawer)return;menu&&menu.classList.remove('on');document.body.classList.remove('has-menu');tab(t);drawer.classList.add('on');scrim.classList.add('on');document.body.classList.add('has-drawer');};
window.hhOpenDrawer=open;
document.addEventListener('click',e=>{
  const o=e.target.closest('[data-open]');if(o){e.preventDefault();open(o.dataset.open);return;}
  const m=e.target.closest('[data-modal]');if(m){e.preventDefault();const d=document.getElementById(m.dataset.modal);if(d){d.classList.add('on');scrim.classList.add('on');}return;}
  if(e.target.closest('[data-close]')||e.target===scrim){close();return;}
  const tb=e.target.closest('.drawer .tab');if(tb){tab(tb.dataset.tab);return;}
  const b=e.target.closest('.burger');if(b&&menu){if(drawer&&drawer.classList.contains('on'))close();const o=menu.classList.toggle('on');document.body.classList.toggle('has-menu',o);return;}
  const rm=e.target.closest('.d-item .rm');if(rm){const it=rm.closest('.d-item'),pn=rm.closest('.panel');it.remove();refresh(pn);return;}
  const st=e.target.closest('.d-step button');if(st){const s=st.parentElement.querySelector('span');s.textContent=Math.max(1,+s.textContent+(+st.dataset.d));return;}
});
const refresh=pn=>{const n=pn.querySelectorAll('.d-item').length;pn.classList.toggle('is-empty',!n);const t=$(`.drawer .tab[data-tab="${pn.dataset.panel}"]`);if(t)t.textContent=t.textContent.replace(/\(\d+\)/,`(${n})`);if(pn.dataset.panel==='bag'){$$('.bagcount').forEach(c=>c.textContent=n);}};
const g=$('.d-gift input');if(g)g.addEventListener('change',()=>g.closest('.d-gift').classList.toggle('on',g.checked));
document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
})();

/* header: hide on scroll down, show immediately on scroll up */
(()=>{
const h=document.querySelector('.header');if(!h)return;
let y=scrollY;
const keep=()=>document.body.classList.contains('has-drawer')||document.body.classList.contains('has-menu')||h.querySelector('.lang.open');
addEventListener('scroll',()=>{const n=scrollY,d=n-y;y=n;
  if(n<=h.offsetHeight||keep()||d<0)h.classList.remove('hide');
  else if(d>2)h.classList.add('hide');},{passive:true});
h.addEventListener('focusin',()=>h.classList.remove('hide'));
})();
