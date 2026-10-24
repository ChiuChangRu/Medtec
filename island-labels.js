(function(){'use strict';
 const svgNS='http://www.w3.org/2000/svg';
 function create(container,definitions){
  const root=document.createElement('div');root.className='world-labels';const svg=document.createElementNS(svgNS,'svg');svg.classList.add('label-leaders');root.appendChild(svg);
  const lines=definitions.map(()=>{const line=document.createElementNS(svgNS,'line');svg.appendChild(line);return line});
  const badges=definitions.map((d,i)=>{const b=document.createElement('button');b.className='world-label';b.dataset.tile=i;const n=document.createElement('span');n.textContent=String(i+1).padStart(2,'0');b.appendChild(n);b.appendChild(document.createTextNode(' '+d.name));b.setAttribute('aria-label',d.name+'，查看資料');root.appendChild(b);return b});container.appendChild(root);
  let selected=-1;
  function update(anchors,width,height){
   svg.setAttribute('viewBox',`0 0 ${width} ${height}`);const placed=[];
   const ordered=anchors.map((a,i)=>({...a,i})).sort((a,b)=>a.i===selected?-1:b.i===selected?1:a.y-b.y||a.x-b.x);
   for(const a of ordered){const b=badges[a.i],line=lines[a.i],visible=a.visible!==false&&a.x>-25&&a.x<width+25&&a.y>80&&a.y<height-45;b.hidden=!visible;line.style.display=visible?'':'none';if(!visible)continue;
    const w=Math.min(width-20,definitions[a.i].name.length*14+49),h=38,candidates=[[0,0],[0,35],[0,-35],[0,70],[0,-70],[65,18],[-65,18],[105,45],[-105,45],[0,105],[0,-105]];let best=null;
    for(const[dx,dy]of candidates){const x=Math.max(w/2+7,Math.min(width-w/2-7,a.x+dx)),y=Math.max(130,Math.min(height-65,a.y+dy));let penalty=Math.hypot(x-a.x,y-a.y)*.08;for(const p of placed){const ox=Math.max(0,(w+p.w)/2+5-Math.abs(x-p.x)),oy=Math.max(0,(h+p.h)/2+5-Math.abs(y-p.y));penalty+=ox*oy}if(!best||penalty<best.penalty)best={x,y,w,h,penalty};}
    placed.push(best);b.style.transform=`translate(${best.x}px,${best.y}px) translate(-50%,-50%)`;b.style.zIndex=a.i===selected?60:40;
    line.setAttribute('x1',a.x);line.setAttribute('y1',a.y+5);line.setAttribute('x2',best.x);line.setAttribute('y2',best.y);line.style.opacity=Math.hypot(best.x-a.x,best.y-a.y)>13?'1':'0';
   }
  }
  function select(i){selected=i;badges.forEach((b,k)=>b.classList.toggle('selected',k===i))}
  return{root,badges,update,select,destroy(){root.remove()}};
 }
 window.MedtechLabels={create};
})();
