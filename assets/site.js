/* 中国法律可视化地图 · 共享脚本 */
window.LawUI = (function(){
  const money = n => (isFinite(n)?n:0).toLocaleString('zh-CN',{maximumFractionDigits:2});
  const $ = id => document.getElementById(id);
  const val = id => parseFloat(($(id)||{}).value) || 0;

  // 满一年=1；6个月以上不满一年=1；不满6个月=0.5（劳动合同法第47条）
  function yearsToMonths(y){
    const whole = Math.floor(y + 1e-9);
    const rem = y - whole;
    let add = 0;
    if (rem > 1e-9) add = rem >= 0.5 ? 1 : 0.5;
    return whole + add;
  }

  function on(ids, fn){ ids.forEach(id => { const el=$(id); if(el) el.addEventListener('input',fn); }); fn(); }

  // 滚动高亮左侧目录
  function initNav(){
    const links = [...document.querySelectorAll('nav.toc a')];
    if(!links.length) return;
    const map = new Map();
    links.forEach(a => { const t = document.querySelector(a.getAttribute('href')); if(t) map.set(t,a); });
    const io = new IntersectionObserver(es => {
      es.forEach(e => {
        if(e.isIntersecting){
          links.forEach(l => l.classList.remove('on'));
          const a = map.get(e.target); if(a) a.classList.add('on');
        }
      });
    }, {rootMargin:'-12% 0px -72% 0px', threshold:0});
    [...map.keys()].forEach(t => io.observe(t));
  }

  document.addEventListener('DOMContentLoaded', initNav);
  return { money, $, val, yearsToMonths, on, initNav };
})();
