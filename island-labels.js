(function(){'use strict';
 const svgNS='http://www.w3.org/2000/svg';
 function create(container,definitions){
  const root=document.createElement('div');root.className='world-labels';const svg=document.createElementNS(svgNS,'svg');svg.classList.add('label-leaders');root.appendChild(svg);
  const lines=definitions.map(()=>{const line=document.createElementNS(svgNS,'line');svg.appendChild(line);return line});
  let selected=-1,focused=-1,last=null,lastKey='';const sizes=new Map();
  const badges=definitions.map((d,i)=>{const b=document.createElement('button');b.className='world-label compact-label';b.dataset.tile=i;b.setAttribute('aria-label',d.name+'，查看資料');const name=document.createElement('span');name.className='label-name';name.textContent=d.name;b.append(name);b.addEventListener('focus',()=>{if(b.matches(':focus-visible')){focused=i;refresh()}});b.addEventListener('blur',()=>{if(focused===i){focused=-1;refresh()}});root.appendChild(b);return b});container.appendChild(root);
  function refresh(){lastKey='';if(last)update(...last)}
  function update(anchors,width,height,options={}){
   last=[anchors,width,height,options];const key=[width,height,selected,focused,!!options.detail,document.body.className,...anchors.map(a=>`${Math.round(a.x*2)},${Math.round(a.y*2)},${a.visible!==false}`),...badges.map(b=>b.querySelector('.km-count')?.textContent||'')].join('|');if(key===lastKey)return;lastKey=key;
   svg.setAttribute('viewBox',`0 0 ${width} ${height}`);const origin=container.getBoundingClientRect(),obstacles=Array.from(container.parentElement.querySelectorAll('.masthead,.mapnav,.toolbar,.viewtools,.map-caption,.relation-key,.webgl-note')).map(el=>{const r=el.getBoundingClientRect();return{x:r.left-origin.left+r.width/2,y:r.top-origin.top+r.height/2,w:r.width+10,h:r.height+10}}).filter(r=>r.w>10&&r.h>10);
   const mobile=width<700,placed=[],visible=anchors.map((a,i)=>({...a,i})).filter(a=>a.visible!==false&&a.x>0&&a.x<width&&a.y>100&&a.y<height-35);
   const full=new Set([options.detail?selected:-1,focused].filter(i=>i>=0));
   if(options.detail){const candidates=visible.filter(a=>!full.has(a.i)).map(a=>({...a,near:Math.min(...visible.filter(b=>b.i!==a.i).map(b=>Math.hypot(a.x-b.x,a.y-b.y)),Infinity)})).sort((a,b)=>Math.hypot(a.x-width/2,a.y-height/2)-Math.hypot(b.x-width/2,b.y-height/2));for(const a of candidates.slice(0,Math.max(0,(mobile?2:5)-full.size)))full.add(a.i)}
   const ordered=visible.sort((a,b)=>(a.i===selected?-1:b.i===selected?1:full.has(b.i)-full.has(a.i))||a.y-b.y||a.x-b.x),shown=new Set(visible.map(a=>a.i));
   badges.forEach((b,i)=>{b.hidden=!shown.has(i);if(!shown.has(i))lines[i].style.display='none'});
   function intersects(a,b){return Math.abs(a.x-b.x)<(a.w+b.w)/2+4&&Math.abs(a.y-b.y)<(a.h+b.h)/2+4}
   for(const a of ordered){const b=badges[a.i],line=lines[a.i];let expanded=full.has(a.i),best;if(!expanded){b.classList.remove('is-full');b.classList.add('compact-label');b.style.transform=`translate(${a.x}px,${a.y}px) translate(-50%,-50%)`;line.style.display='none';continue}
    for(let attempt=0;attempt<2;attempt++){
     b.classList.toggle('is-full',expanded);b.classList.toggle('compact-label',!expanded);const sizeKey=a.i+':'+expanded+':'+(a.i===selected)+':'+mobile+':'+width+':'+b.textContent;let size=sizes.get(sizeKey);if(!size){size={w:b.offsetWidth||36,h:b.offsetHeight||36};sizes.set(sizeKey,size)}const {w,h}=size;
     const candidates=[[0,0]];for(const radius of [32,48,64,84,108,140,180,220,260])for(let k=0;k<16;k++)candidates.push([Math.cos(k*Math.PI/8)*radius,Math.sin(k*Math.PI/8)*radius]);
     let fallback=null;
     for(const[dx,dy]of candidates){const c={x:Math.max(w/2+10,Math.min(width-w/2-10,a.x+dx)),y:Math.max(120+h/2,Math.min(height-45-h/2,a.y+dy)),w,h};const collisions=[...obstacles,...placed].filter(p=>intersects(c,p)).length,cost=Math.hypot(c.x-a.x,c.y-a.y);if(!collisions&&(!best||cost<best.cost))best={...c,cost};if(!fallback||collisions<fallback.collisions||collisions===fallback.collisions&&cost<fallback.cost)fallback={...c,cost,collisions}}
     if(best||!expanded||a.i===selected||a.i===focused){best=best||fallback;break}expanded=false;
    }
    if(!expanded){b.style.transform=`translate(${a.x}px,${a.y}px) translate(-50%,-50%)`;line.style.display='none';continue}
    placed.push(best);b.style.transform=`translate(${best.x}px,${best.y}px) translate(-50%,-50%)`;b.style.zIndex=a.i===selected?60:expanded?45:40;
    line.style.display='';line.setAttribute('x1',a.x);line.setAttribute('y1',a.y);line.setAttribute('x2',best.x);line.setAttribute('y2',best.y);line.style.opacity=Math.hypot(best.x-a.x,best.y-a.y)>22?'.7':'0';
   }
  }
  function select(i){selected=i;badges.forEach((b,k)=>b.classList.toggle('selected',k===i));refresh()}
  return{root,badges,update,select,destroy(){root.remove()}};
 }
 window.MedtechLabels={create};
})();
