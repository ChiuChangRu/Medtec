// Procedural medical town. All architecture and characters are generated here.
export function buildMedicalTown(T,RoundedBoxGeometry,definitions){
 const root=new T.Group(),parts=[],actors=[],lamps=[],tileCenters=[],doors=[],windowColors=[],roofs=[],rooftopSymbols=[];
 const G={box:new T.BoxGeometry(1,1,1),round:new RoundedBoxGeometry(1,1,1,2,.09),cyl:new T.CylinderGeometry(.5,.5,1,12),cone:new T.ConeGeometry(.5,1,10),ball:new T.SphereGeometry(.5,12,8),leaf:new T.IcosahedronGeometry(.5,1),hex:new T.CylinderGeometry(.5,.5,1,6),roof:new T.ConeGeometry(.5,1,4),ring:new T.TorusGeometry(.5,.055,8,24)};
 const heart=new T.Shape();heart.moveTo(0,-.35);heart.bezierCurveTo(-.65,.05,-.35,.60,0,.27);heart.bezierCurveTo(.35,.60,.65,.05,0,-.35);G.heart=new T.ExtrudeGeometry(heart,{depth:.12,bevelEnabled:true,bevelThickness:.025,bevelSize:.025,bevelSegments:1,steps:1,curveSegments:12});
 const C={cream:0xf7f0df,white:0xf6f6ec,coral:0xd96e43,orange:0xe3894e,teal:0x538d95,glass:0xa9d5d2,brown:0xa58263,wood:0xbc9774,ink:0x3c4a48,green:0x89a870,lime:0xaac186,sand:0xe1cd9f,gray:0xc6c6b8};
 // Pale clinical buildings form the center; deeper industrial colors frame them.
 function districtPalette(d){
  if(d.role==='hospital')return{clinical:true,wall:0xf5f1e5,roof:0xcbdcda,ground:0xe5e5d6,paving:[0xeeeade,0xe3e1d2],base:0xc3bda6};
  const family={surface:[0x386e6d,0x285453],structure:[0x505b82,0x384362],forming:[0x8b7148,0x695333],process:[0x78556d,0x583d50]},colors=d.type==='tech'?family[d.family]||family.surface:[[0x506c70,0x354e55],[0x5d6d78,0x424f5e],[0x67755b,0x46563e]][(d.model??0)%3];
  return{clinical:false,wall:colors[0],roof:colors[1],ground:d.type==='tech'?0x8c9b94:0x81948f,paving:[0xa6afa2,0x929e94],base:0x627974};
 }
 function currentPalette(){return owner>=0?districtPalette(definitions[owner]):null}
 let owner=-1,seed=731;function rand(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296}
 function p(kind,x,y,z,sx,sy,sz,color,ry=0,rz=0,rx=0){parts.push({kind,pos:[x,y,z],scale:[sx,sy,sz],color,rot:[rx,ry,rz],owner});}
 const box=(x,y,z,w,h,d,c=C.cream,ry=0)=>p('round',x,y,z,w,h,d,c,ry);
 const cyl=(x,y,z,r,h,c=C.white)=>p('cyl',x,y,z,r*2,h,r*2,c);
 const ball=(x,y,z,r,c=C.green,s=[1,1,1])=>p('ball',x,y,z,r*2*s[0],r*2*s[1],r*2*s[2],c);
 function beam(a,b,width,c,kind='cyl'){const A=new T.Vector3(...a),B=new T.Vector3(...b),v=B.clone().sub(A),q=new T.Quaternion().setFromUnitVectors(new T.Vector3(0,1,0),v.clone().normalize()),e=new T.Euler().setFromQuaternion(q);parts.push({kind,pos:A.add(B).multiplyScalar(.5).toArray(),scale:[width,v.length(),width],color:c,rot:[e.x,e.y,e.z],owner})}
 const TOP=.66,R=2.18,SPACE=1.20;
 definitions.forEach((d,i)=>tileCenters.push({i,x:Math.sqrt(3)*R*SPACE*(d.q+d.r/2),z:1.5*R*SPACE*d.r}));
 const cells=new Map(definitions.map((d,i)=>[d.q+','+d.r,i])),edgeSteps=[[0,1],[-1,1],[-1,0],[0,-1],[1,-1],[1,0]];
 function neighbor(i,edge){const d=definitions[i],step=edgeSteps[edge];return cells.get((d.q+step[0])+','+(d.r+step[1]))}
 const mx=0,mz=0;tileCenters.forEach(c=>{c.x-=mx;c.z-=mz});
 function point(cx,cz,r,k){const a=Math.PI/6+k*Math.PI/3;return[cx+Math.cos(a)*r,cz+Math.sin(a)*r]}
 function fence(x1,z1,x2,z2,style=0){const length=Math.hypot(x2-x1,z2-z1),n=Math.ceil(length/.29),h=style===2?.26:.31,post=style===1?C.brown:C.white;for(let j=0;j<=n;j++){const t=j/n,x=x1+(x2-x1)*t,z=z1+(z2-z1)*t;cyl(x,TOP+h/2,z,.018,h,post);ball(x,TOP+h+.014,z,.024,style===2?C.coral:post)}beam([x1,TOP+h*.8,z1],[x2,TOP+h*.8,z2],.025,post);if(style===0)beam([x1,TOP+h*.35,z1],[x2,TOP+h*.35,z2],.016,C.teal)}
 function tree(x,z,s=1,pink=false,y=TOP,wild=false){beam([x,y,z],[x+.03*s,y+.63*s,z],.09*s,C.brown);beam([x,y+.35*s,z],[x-.2*s,y+.72*s,z+.1*s],.045*s,C.brown);const cols=pink?[0xd7b5a3,0xe4c9b1,0xd4b6a4]:[0x9bb77a,0x87a868,0xa8be86,0x91ad72];for(let j=0;j<6;j++){const a=j*2.399,rr=j?.18*s:0;p('leaf',x+Math.cos(a)*rr,y+(.77+(j%3)*.105)*s,z+Math.sin(a)*rr,.53*s,.48*s,.53*s,cols[j%cols.length],a)}if(!wild)box(x,y+.035,z,.38*s,.07,.38*s,0xd6cfb6)}
 function bush(x,z,s=.28){box(x,TOP+.07,z,s*1.8,.14,s*1.1,C.cream);for(let j=0;j<3;j++)p('leaf',x+(j-1)*s*.4,TOP+.19,z,s*.9,s*.8,s*.9,[0x93ad78,0xa7bc86,0x8da86c][j])}
 function palm(x,z,s=1){beam([x,TOP,z],[x+.08*s,TOP+.95*s,z],.075*s,0xb69b6a);for(let j=0;j<7;j++){const a=j/7*Math.PI*2;p('round',x+Math.sin(a)*.22*s,TOP+.99*s,z+Math.cos(a)*.22*s,.13*s,.055*s,.65*s,0x89b778,a,.16)}ball(x,TOP+.96*s,z,.12*s,0x8eaa6c)}
 function bench(x,z,ry=0){for(let j=0;j<4;j++)box(x,TOP+.16,z+(j-1.5)*.045,.42,.035,.035,C.wood,ry);for(const dx of [-.15,.15])box(x+dx,TOP+.08,z,.035,.15,.14,C.ink);box(x,TOP+.28,z+.085,.44,.12,.025,C.wood,ry)}
 function lamp(x,z){cyl(x,TOP+.46,z,.016,.91,C.ink);beam([x,TOP+.90,z],[x+.12,TOP+.92,z],.025,C.ink);box(x+.12,TOP+.91,z,.13,.045,.10,C.cream);lamps.push([x+.12,TOP+.88,z]);}
 function flower(x,z){cyl(x,TOP+.1,z,.045,.2,0x6e956a);for(let j=0;j<4;j++){const a=j*Math.PI/2;ball(x+Math.cos(a)*.045,TOP+.22,z+Math.sin(a)*.045,.04,0xe3b27f)}ball(x,TOP+.23,z,.024,0xf3d18c)}
 function planter(x,z){box(x,TOP+.09,z,.26,.18,.26,0xc18f6f);bush(x,z,.15)}
 function bin(x,z){box(x,TOP+.17,z,.11,.33,.12,0x739a91);box(x,TOP+.34,z,.13,.035,.14,C.ink)}
 function bunting(a,b){beam(a,b,.009,C.ink);const n=12;for(let j=1;j<n;j++){const f=j/n,x=a[0]+(b[0]-a[0])*f,y=a[1]+(b[1]-a[1])*f-Math.sin(f*Math.PI)*.10,z=a[2]+(b[2]-a[2])*f;box(x,y-.055,z,.07,.11,.018,[C.coral,0xe8c46f,C.teal,C.cream][j%4])}}
 function windows(x,z,w,h,d,y=TOP){const clinical=currentPalette()?.clinical,py=clinical?.42:.30,px=clinical?.34:.25,ww=clinical?.23:.16,wh=clinical?.24:.18;for(let floor=0;floor<Math.floor(h/py);floor++)for(let col=0;col<Math.max(1,Math.floor(w/px));col++){const xx=x-w/2+px*.56+col*px,yy=y+.25+floor*py;box(xx,yy,z+d/2+.012,ww,wh,.025,C.glass);windowColors.push(parts.length-1)}for(let floor=0;floor<Math.floor(h/py);floor++)for(let col=0;col<Math.max(1,Math.floor(d/px));col++){box(x+w/2+.012,y+.25+floor*py,z-d/2+px*.56+col*px,.025,wh,ww,C.glass);windowColors.push(parts.length-1)}}
 function building(x,z,w,h,d,roof=C.coral,modern=false,base=TOP){if(owner>=0&&!doors[owner])doors[owner]={x,z:z+d/2+.035,tile:owner};const palette=currentPalette();if(palette?.clinical)h*=definitions[owner].id==='hospital'?2:1.5;if(palette&&!palette.clinical)roof=palette.roof;box(x,base+h/2,z,w,h,d,palette?.wall??C.cream);windows(x,z,w,h-.08,d,base);box(x,base+h+.035,z,w+.10,.10,d+.1,roof);if(modern){box(x,base+h+.10,z,w*.76,.08,d*.68,palette&&!palette.clinical?palette.wall:0xe8e5d9);box(x+.18,base+h+.2,z-.10,.25,.15,.22,0xc5cac5)}else{p('roof',x,base+h+.16,z,w*1.5,.27,d*1.5,roof,Math.PI/4)}if(owner>=0&&(!roofs[owner]||base+h>roofs[owner].y))roofs[owner]={x,z,y:base+h+.34};
 // Architectural trim follows the wall volume rather than every window.
 const trim=0xc6604c,stroke=palette?.clinical?.035:.025;for(const dx of [-w/2,w/2])for(const dz of [-d/2,d/2])p('box',x+dx,base+h/2,z+dz,stroke,h,stroke,trim);
 for(const yy of [base+.05,base+h+.09,...(h>2.5?[base+h*.50]:[])]){p('box',x,yy,z+d/2+.012,w+.035,stroke,.028,trim);p('box',x,yy,z-d/2-.012,w+.035,stroke,.028,trim);p('box',x-w/2-.012,yy,z,.028,stroke,d+.035,trim);p('box',x+w/2+.012,yy,z,.028,stroke,d+.035,trim)}
 box(x,base+.24,z+d/2+.03,.20,.48,.04,C.teal);box(x,base+.04,z+d/2+.19,w*.8,.08,.32,0xd8d5c8)}
 function cross(x,y,z,size=.28){box(x,y,z,size,.07,size*.27,C.coral);box(x,y,z,size*.27,.07,size,C.coral)}
 function canopy(x,z,w=1.3,d=.6){for(const dx of [-w*.43,w*.43])for(const dz of [-d*.4,d*.4])cyl(x+dx,TOP+.33,z+dz,.025,.66,C.teal);box(x,TOP+.68,z,w,.09,d,currentPalette()?.roof??C.coral)}
 function tank(x,z,r=.25,h=.65){cyl(x,TOP+h/2,z,r,h,0xe4e8df);ball(x,TOP+h,z,r,0xe7ebe2,[1,.35,1]);cyl(x,TOP+.10,z,r*1.08,.08,C.teal);beam([x+r,TOP+.30,z],[x+r+.28,TOP+.30,z],.04,C.teal)}
 function solar(x,y,z){box(x,y,z,.36,.04,.27,0x527b82);for(let j=0;j<3;j++)box(x+(j-1)*.11,y+.024,z,.008,.008,.27,0xa5c4c4)}
 function statue(x,z){cyl(x,TOP+.06,z,.28,.12,0xddd7c7);p('ring',x,TOP+.52,z,.50,.50,.50,C.coral,0,Math.PI/6);box(x,TOP+.22,z,.15,.28,.15,C.cream)}
 function person(x,z,ry=0,variant=0,role='sales'){
  if(role==='hospital')role=['doctor','nurse','patient'][variant%3];
  const g=[],skin=[0xe5bf98,0xcda67f,0xb7875d,0xeac7a7][variant%4],clean=role==='factory',coat=role==='doctor'||role==='lab',suit=role==='sales',wheel=role==='patient'&&variant%4===0;
  const shirt=clean?0xeaf3ed:coat?0xfaf8ed:role==='nurse'?0x62a9b0:suit?0x344a61:[0xc0d4d5,0xe6bea5,0x9cb9b9][variant%3],pants=clean?0xe0eee7:suit?0x344354:0x667b80;
  function a(kind,pos,scale,color,rot=[0,0,0]){g.push({kind,pos,scale,color,rot})}
  a('round',[0,.21,0],[.15,coat?.23:.18,.10],shirt);
  a('ball',[0,.365,0],clean?[.205,.21,.195]:[.17,.18,.165],clean?0xf3f6eb:skin);
  a('ball',[0,.408,-.018],clean?[.205,.12,.19]:[.185,.115,.18],clean?0xf3f6eb:variant%3===0?0x6b4b35:0x383633);
  a('cyl',[-.045,.08,0],[.045,.14,.05],pants);a('cyl',[.045,.08,0],[.045,.14,.05],pants);
  a('round',[-.045,.018,.022],[.06,clean?.06:.035,.09],clean?0xe7f2eb:0x343e3c);a('round',[.045,.018,.022],[.06,clean?.06:.035,.09],clean?0xe7f2eb:0x343e3c);
  a('cyl',[-.10,.22,0],[.038,.15,.038],coat||clean?shirt:skin,[0,0,.12]);a('cyl',[.10,.22,0],[.038,.15,.038],coat||clean?shirt:skin,[0,0,-.12]);
  if(clean){a('round',[0,.367,.09],[.105,.095,.027],skin);a('round',[0,.344,.109],[.11,.044,.019],0xa6d1c5);a('ball',[-.025,.381,.108],[.012,.012,.012],0x3b4d45);a('ball',[.025,.381,.108],[.012,.012,.012],0x3b4d45);a('round',[0,.14,.052],[.008,.18,.008],0xbdcfc8)}
  if(suit){a('round',[0,.255,.058],[.055,.11,.017],0xf4efe0);a('round',[0,.238,.071],[.016,.095,.012],0xca754c);a('round',[-.145,.14,.015],[.14,.105,.065],0x986f4d);a('ring',[-.145,.21,.015],[.07,.045,.025],0x4b4940)}
  if(role==='doctor'){a('ring',[0,.263,.059],[.085,.10,.015],0x596e6e);a('ball',[.025,.214,.072],[.031,.031,.015],0x45666b);a('round',[-.045,.25,.057],[.035,.042,.01],0x79a9b2)}
  if(role==='nurse'){a('round',[-.045,.25,.055],[.035,.046,.012],0xf6f0df);a('round',[.04,.27,.055],[.035,.009,.01],0xdbe7df)}
  if(role==='lab'){a('round',[0,.38,.088],[.14,.035,.02],0x8bbfca);a('round',[-.045,.25,.057],[.035,.042,.01],0x79a9b2)}
  if(clean&&variant%3===0)a('round',[0,.21,.125],[.15,.13,.11],0xe0c79d);
  if(wheel){a('round',[0,.115,-.015],[.23,.05,.22],0x4f7b90);a('round',[0,.22,-.105],[.23,.23,.04],0x4f7b90);for(const dx of [-.14,.14])a('ring',[dx,.095,0],[.19,.19,.19],0x3f555b,[0,Math.PI/2,0]);a('round',[0,.04,.16],[.21,.025,.11],0xaabfc0)}
  return {parts:g,x,z,y:TOP+.01,ry,variant,role,wheel};
 }
 function staticPerson(x,z,ry,variant,role){const a=person(x,z,ry,variant,role),m=new T.Matrix4().makeRotationY(ry);for(const g of a.parts){const q=new T.Vector3(...g.pos).applyMatrix4(m);p(g.kind,x+q.x,TOP+q.y,z+q.z,...g.scale,g.color,ry+g.rot[1],g.rot[2],g.rot[0])}}
 function ambulance(x,z,ry=0){box(x,TOP+.17,z,.35,.27,.72,C.white,ry);box(x,TOP+.37,z-.12,.31,.18,.35,C.white,ry);box(x,TOP+.39,z+.075,.32,.15,.025,C.glass,ry);box(x,TOP+.50,z-.13,.16,.045,.07,C.coral,ry);for(const dx of [-.19,.19])for(const dz of [-.22,.22])p('cyl',x+dx,TOP+.075,z+dz,.15,.045,.15,0x49524a,0,Math.PI/2);cross(x,TOP+.315,z+.1,.18)}
 function tables(x,z){cyl(x,TOP+.23,z,.17,.035,0xe2c086);cyl(x,TOP+.12,z,.025,.23,C.ink);for(let j=0;j<3;j++){const a=j*2.094;box(x+Math.cos(a)*.23,TOP+.13,z+Math.sin(a)*.23,.13,.03,.13,C.teal);cyl(x+Math.cos(a)*.23,TOP+.07,z+Math.sin(a)*.23,.012,.13,C.ink)}}

 function clinic(x,z,d){const roof=new T.Color(d.color).lerp(new T.Color(0xf6f1e3),.42).getHex();building(x-.30,z-.35,1.30,1.10,.95,roof,true);building(x+.70,z-.40,.65,.70,.78,roof,true);box(x-.30,TOP+1.12,z+.14,.30,.065,.035,C.coral);box(x-.30,TOP+1.12,z+.14,.065,.30,.035,C.coral);canopy(x-.25,z+.63,1.18,.50);bench(x+.85,z+.65,Math.PI/2);box(x-.98,TOP+.45,z+.52,.33,.42,.045,roof);box(x-.98,TOP+.45,z+.55,.24,.24,.015,C.white)}
 function techLab(x,z,d){const color=districtPalette(d).roof;building(x-.34,z-.40,.98,.92,.82,color,true);box(x-.34,TOP+1.08,z-.40,.80,.09,.60,color);canopy(x+.63,z+.03,.57,.85);box(x+.63,TOP+.22,z+.03,.40,.42,.62,C.white);box(x+.63,TOP+.46,z+.03,.30,.055,.48,color);box(x-.94,TOP+.43,z+.52,.34,.44,.05,color);box(x-.94,TOP+.43,z+.555,.25,.25,.02,C.white);if(d.family==='surface'){for(let j=0;j<3;j++){cyl(x+.5+j*.13,TOP+.53,z+.04,.035,.16,C.glass)}}else if(d.family==='structure'){p('ring',x+.63,TOP+.65,z+.03,.29,.29,.20,color,Math.PI/2)}else if(d.family==='forming'){ball(x+.63,TOP+.62,z+.03,.15,color,[1.2,1,.7])}else{beam([x+.63,TOP+.63,z-.1],[x+.63,TOP+.48,z+.16],.028,color)}}
 function courtyard(t){const {x,z,i}=t,d=definitions[i],palette=districtPalette(d);owner=i;
 p('hex',x,.10,z,R*2.09,.06,R*2.09,0x94c6c8);p('hex',x,.32,z,R*2,.42,R*2,palette.base);p('hex',x,.56,z,R*2.015,.08,R*2.015,palette.clinical?C.cream:0xb5bba9);p('hex',x,.63,z,R*1.98,.065,R*1.98,palette.ground);
 for(let ix=-8;ix<=8;ix++)for(let iz=-9;iz<=9;iz++){const px=ix*.22,pz=iz*.22;if(Math.abs(px)>Math.sqrt(3)*R*.46||Math.abs(pz)>R*.92-Math.abs(px)/Math.sqrt(3))continue;if(Math.hypot(px,pz)<1.25&&i%4!==0)continue;p('box',x+px,TOP-.014,z+pz,.207,.025,.207,palette.paving[(ix+iz+i)%3?0:1])}
 for(let edge=0;edge<6;edge++){const a=point(x,z,R*.93,edge),b=point(x,z,R*.93,edge+1),other=neighbor(i,edge);if(other===undefined){fence(...a,...b,0);continue}const length=Math.hypot(b[0]-a[0],b[1]-a[1]),dx=(b[0]-a[0])/length,dz=(b[1]-a[1])/length,mx=(a[0]+b[0])/2,mz=(a[1]+b[1])/2;fence(a[0],a[1],mx-dx*.39,mz-dz*.39,0);fence(mx+dx*.39,mz+dz*.39,b[0],b[1],0);}
 for(let j=0;j<8;j++){const a=j/8*Math.PI*2+.18,rr=1.78;if(j===3||edgeSteps.some((_,edge)=>{if(neighbor(i,edge)===undefined)return false;const direction=(edge+1)*Math.PI/3;return Math.abs(Math.atan2(Math.sin(a-direction),Math.cos(a-direction)))<.24}))continue;tree(x+Math.cos(a)*rr,z+Math.sin(a)*rr,.52+rand()*.18,i===3&&j%3===0)}
 for(let j=0;j<4;j++){const a=j/4*Math.PI*2+.2;lamp(x+Math.cos(a)*1.85,z+Math.sin(a)*1.85);if(j%2===0)bench(x+Math.cos(a)*1.55,z+Math.sin(a)*1.55,a);else bin(x+Math.cos(a)*1.66,z+Math.sin(a)*1.66)}
 for(let j=0;j<5;j++){const a=j*2.4+i;flower(x+Math.cos(a)*1.70,z+Math.sin(a)*1.70)}
 for(let j=0;j<10;j++){const a=j*.63+i*.27;actors.push({...person(x+Math.cos(a)*1.55,z+Math.sin(a)*1.55,-a,j+i,d.type==='tech'&&j<6?'factory':d.role),tile:i,phase:rand(),speed:.022+rand()*.012,variant:j+i})}
 for(let j=0;j<3;j++)actors.push({...person(x,z,0,i+j,d.role),tile:i,phase:j/3+i*.1,speed:.018+(i%3)*.004});
 const X=x,Z=z;
 switch(d.model??i){
 case 20:clinic(X,Z,d);break;
 case 21:techLab(X,Z,d);break;
 case 0:building(X-.40,Z-.4,1.05,1.05,.8,0xb5c8c3,true);building(X+.64,Z-.40,.68,.64,.72,C.coral);canopy(X,Z+.55,.95,.5);p('ring',X-.4,TOP+1.27,Z-.4,.62,.62,.22,C.teal,Math.PI/2);ambulance(X+.73,Z+.65);bush(X-.75,Z+.85,.32);break;
 case 1:building(X-.47,Z-.38,1.0,.73,.85,C.coral,true);for(let j=0;j<3;j++)tank(X+.65,Z-.7+j*.5,.22,.65);for(let j=0;j<3;j++)p('ring',X-.6+j*.4,TOP+.23,Z+.7,.32,.32,.32,C.teal,Math.PI/2);box(X,TOP+.1,Z+.7,1.4,.14,.22,C.white);break;
 case 2:building(X-.45,Z-.4,.85,.82,.75);tank(X+.65,Z-.4,.27,.55);box(X+.3,TOP+.06,Z+.6,1.2,.12,.65,0x91bbb4);for(let j=0;j<5;j++)box(X-.15+j*.23,TOP+.14,Z+.6,.13,.07,.49,C.white);canopy(X-.65,Z+.65,.5,.55);break;
 case 3:building(X-.6,Z-.55,.75,.8,.7);box(X+.50,TOP+.025,Z+.1,1.02,.05,1.5,0x93bbb7);box(X+.5,TOP+.056,Z+.1,.80,.018,1.3,0x75b0b7);fence(X+.02,Z-.65,X+.02,Z+.85,0);tree(X-.70,Z+.55,.8,true);tables(X-.15,Z+.75);break;
 case 4:building(X-.45,Z-.50,1.05,.8,.75,C.coral,true);canopy(X+.55,Z+.45,.75,1.05);for(let j=0;j<4;j++){cyl(X+.55,TOP+.25,Z+.1+j*.23,.07,.36,[C.teal,C.coral,0xe7c577,C.white][j]);cyl(X+.55,TOP+.46,Z+.1+j*.23,.045,.07,C.cream)}tables(X-.65,Z+.55);break;
 case 5:building(X-.45,Z-.4,.9,1.32,.8,C.coral,true);building(X+.63,Z-.35,.6,.68,.74);canopy(X+.5,Z+.65,.85,.5);for(let j=0;j<3;j++){box(X-.7+j*.3,TOP+.16,Z+.7,.15,.25,.35,C.teal);beam([X-.7+j*.3,TOP+.3,Z+.7],[X-.55+j*.3,TOP+.6,Z+.7],.026,C.gray)}for(let k=0;k<3;k++)cyl(X-.72+k*.25,TOP+1.55,Z-.4,.018,.3,C.gray);break;
 case 6:building(X-.3,Z-.55,1.3,.68,.85,C.coral,true);for(let j=0;j<5;j++)box(X-.85+j*.38,TOP+.24,Z+.6,.25,.36,.35,0xd0d8cd);box(X,TOP+.45,Z+.6,1.9,.055,.11,C.teal);cyl(X+.77,TOP+.65,Z-.48,.15,.20,C.gray);solar(X-.45,TOP+.85,Z-.55);break;
 case 7:building(X-.50,Z-.47,1.0,.78,.9,C.coral,true);box(X+.65,TOP+.29,Z-.4,.5,.58,.7,C.teal);for(let j=0;j<3;j++){box(X-.65+j*.4,TOP+.13,Z+.65,.3,.25,.35,[0xe6be67,C.coral,C.teal][j]);box(X-.65+j*.4,TOP+.28,Z+.65,.17,.05,.21,C.cream)}for(let j=0;j<2;j++)tank(X+.7,Z+.32+j*.43,.16,.55);break;
 case 8:building(X-.45,Z-.45,.95,1.12,.90,C.coral,true);for(let j=0;j<3;j++){tank(X+.65,Z-.65+j*.5,.19,.55);beam([X+.65,TOP+.8,Z-.65+j*.5],[X+.32,TOP+.8,Z-.65+j*.5],.04,C.teal)}box(X-.4,TOP+.15,Z+.73,1.0,.3,.4,C.white);p('ring',X-.40,TOP+.45,Z+.73,.45,.45,.45,C.teal,Math.PI/2);break;
 case 9:building(X-.5,Z-.48,.9,.7,.8);canopy(X+.52,Z-.3,.75,1.0);for(let j=0;j<4;j++){box(X-.8+j*.4,TOP+.13,Z+.67,.24,.25,.4,0xd4d9cd);p('ring',X-.8+j*.4,TOP+.35,Z+.67,.17,.17,.17,C.teal,Math.PI/2)}break;
 case 10:building(X-.5,Z-.5,.85,.9,.9,C.coral,true);building(X+.55,Z-.5,.7,.58,.85,C.white,true);box(X+.15,TOP+.18,Z+.65,1.5,.36,.65,C.cream);box(X+.15,TOP+.38,Z+.65,1.2,.055,.48,C.teal);for(let j=0;j<5;j++)cyl(X-.3+j*.22,TOP+.45,Z+.65,.035,.10,C.cream);solar(X-.5,TOP+1.06,Z-.5);break;
 case 11:building(X-.45,Z-.45,.85,1.1,.8,C.coral,true);p('ring',X+.65,TOP+.50,Z-.35,.64,.64,.30,C.teal);box(X+.65,TOP+.10,Z-.35,.7,.15,.4,C.white);for(let j=0;j<3;j++){box(X-.65+j*.42,TOP+.20,Z+.65,.32,.38,.42,[C.cream,C.teal,C.orange][j]);box(X-.65+j*.42,TOP+.41,Z+.65,.22,.05,.25,C.glass)}break;
 case 12:building(X,Z+.43,2.10,.55,.65,0xb9d3ce,true);building(X-.25,Z-.40,1.65,1.75,1.12,0xcbdcd5,true);building(X-.32,Z-.43,1.15,.35,.78,0xcbdcd5,true,TOP+3.5);building(X+.85,Z-.42,.70,1.05,.87,0xb9d3ce,true);box(X-.25,TOP+2.55,Z+.18,.52,.13,.05,C.coral);box(X-.25,TOP+2.55,Z+.18,.13,.52,.05,C.coral);canopy(X,Z+.96,1.60,.48);ambulance(X+1.03,Z+.90);statue(X-1.12,Z-.98);break;
 case 13:building(X-.45,Z-.55,1.05,1.0,.8,C.coral,true);canopy(X+.65,Z-.35,.6,.7);for(let j=0;j<5;j++)box(X-.85+j*.38,TOP+.16,Z+.65,.30,.31,.57,[C.coral,0xe5bf6d,C.teal,0xd9a879,0xa8bc9c][j]);palm(X+.9,Z+.5,.8);break;
 case 14:building(X-.40,Z-.38,1.0,1.35,.88,0x73989e,true);building(X+.65,Z-.43,.62,.9,.80,0x73989e,true);canopy(X,Z+.58,1.35,.60);tables(X-.55,Z+.62);tables(X+.55,Z+.62);p('ring',X-.40,TOP+1.63,Z-.38,.40,.40,.14,0xc8a258);break;
 }
 if(d.role==='factory'){for(let j=0;j<5;j++){const a=j/5*Math.PI*2,px=X+Math.sin(a)*1.30,pz=Z+Math.cos(a)*1.30;cyl(px,TOP+.13,pz,.035,.26,C.gray);box(px,TOP+.28,pz,.30,.045,.25,C.white);box(px,TOP+.37,pz,.16,.14,.10,C.teal)}}
 if(i%3===0){cyl(X-1.25,TOP+.48,Z-.95,.028,.95,C.wood);cyl(X+1.25,TOP+.48,Z-.95,.028,.95,C.wood);bunting([X-1.25,TOP+.95,Z-.95],[X+1.25,TOP+.95,Z-.95]);}
 }
 // One physical rooftop emblem per district; auxiliary buildings stay uncluttered.
 function roofEmblem(i){const a=roofs[i],d=definitions[i];if(!a)return;owner=i;const x=a.x,z=a.z,y=a.y+.38,red=0xd37452,blue=0x649da6,ivory=0xf4e9d5,gold=0xe6bd68;
  box(x,a.y+.015,z,.80,.055,.50,ivory);for(const dx of [-.22,.22])beam([x+dx,a.y-.18,z],[x+dx,y-.12,z],.026,C.brown);
  const b=(dx,dy,dz,w,h,l,c=blue)=>box(x+dx,y+dy,z+dz,w,h,l,c),v=(A,B,r=.04,c=blue)=>beam([x+A[0],y+A[1],z+A[2]],[x+B[0],y+B[1],z+B[2]],r,c),sphere=(dx,dy,dz,r,c=blue,s=[1,1,1])=>ball(x+dx,y+dy,z+dz,r,c,s),ring=(dx,dy,dz,s,c=blue,ry=0)=>p('ring',x+dx,y+dy,z+dz,s,s,s,c,ry);
  const tube=(color=blue)=>{v([-.48,.10,0],[.45,.23,0],.055,color);sphere(.45,.23,0,.04,color)};
  let label='';
  switch(d.id){
   case'hospital':label='醫療十字';b(0,.14,0,.57,.15,.14,red);b(0,.14,0,.15,.57,.14,red);break;
   case'cardio':label='心臟與血管';p('heart',x,y+.06,z,.75,.75,.75,red);v([.05,.35,0],[.05,.55,0],.065,blue);break;
   case'nephro':label='透析濾器';b(0,.13,0,.38,.55,.20,ivory);for(let k=-2;k<=2;k++)v([k*.055,-.10,.12],[k*.055,.35,.12],.018,blue);v([-.35,-.15,0],[-.35,.40,0],.035,red);v([-.35,.40,0],[0,.44,0],.035,red);break;
   case'icu':label='生理監視器';b(0,.14,0,.66,.45,.16,ivory);b(0,.14,.09,.56,.33,.025,0x365e65);for(const[A,B]of [[[-.24,.12,.11],[-.10,.12,.11]],[[-.10,.12,.11],[-.04,.25,.11]],[[-.04,.25,.11],[.03,.02,.11]],[[.03,.02,.11],[.10,.17,.11]],[[.10,.17,.11],[.25,.17,.11]]])v(A,B,.023,gold);break;
   case'uro':label='泌尿道示意';sphere(-.18,.26,0,.14,red,[.75,1.3,.55]);sphere(.18,.26,0,.14,red,[.75,1.3,.55]);v([-.16,.15,0],[0,-.10,0],.025,blue);v([.16,.15,0],[0,-.10,0],.025,blue);sphere(0,-.10,0,.11,gold);break;
   case'ward':label='輸液袋';v([-.28,-.18,0],[-.28,.55,0],.025,C.ink);v([-.28,.55,0],[.14,.55,0],.025,C.ink);b(.07,.23,0,.29,.42,.13,ivory);b(.07,.15,.08,.22,.16,.025,blue);v([.07,.02,0],[.29,-.18,0],.025,blue);break;
   case'radiology':label='影像掃描環';ring(0,.18,0,.56,ivory);ring(0,.18,.02,.39,blue);b(0,-.12,.22,.23,.08,.65,ivory);break;
   case't-balloon':label='球囊導管';tube(ivory);sphere(.12,.18,0,.17,gold,[1.65,.75,.75]);ring(-.33,.12,0,.15,blue,Math.PI/2);break;
   case't-braid':label='編織管';tube(ivory);for(const side of [-1,1])for(let k=0;k<2;k++)for(let n=0;n<22;n++){const q=n/22,r=(n+1)/22,A=q*Math.PI*5*side+k*Math.PI,B=r*Math.PI*5*side+k*Math.PI;v([-.44+q*.88,.16+Math.cos(A)*.13,Math.sin(A)*.13],[-.44+r*.88,.16+Math.cos(B)*.13,Math.sin(B)*.13],.022,side<0?red:blue)}break;
   case't-coil':label='繞簧管';tube(ivory);for(let n=0;n<65;n++){const q=n/65,r=(n+1)/65,A=q*Math.PI*16,B=r*Math.PI*16;v([-.42+q*.84,.17+Math.cos(A)*.14,Math.sin(A)*.14],[-.42+r*.84,.17+Math.cos(B)*.14,Math.sin(B)*.14],.026,gold)}break;
   case't-extrude':label='變徑管段';v([-.44,.15,0],[-.02,.15,0],.23,blue);v([-.02,.15,0],[.42,.15,0],.10,blue);ring(-.43,.15,0,.24,ivory,Math.PI/2);ring(.42,.15,0,.11,ivory,Math.PI/2);break;
   case't-laser':label='雷射加工頭';b(-.20,.38,0,.25,.31,.22,ivory);v([-.20,.22,0],[.18,-.05,0],.025,red);v([-.25,-.08,0],[.40,-.08,0],.10,blue);sphere(.18,-.05,0,.06,gold);break;
   case't-hydro':label='水滴與導管';tube(ivory);sphere(0,.36,0,.17,blue,[.8,1,.65]);p('cone',x,y+.53,z,.19,.25,.16,blue);break;
   case't-anti-bac':label='細菌阻隔示意';tube(ivory);ring(0,.32,0,.46,blue);v([-.19,.12,.04],[.19,.52,.04],.045,red);sphere(0,.32,0,.065,gold);for(let n=0;n<6;n++){const q=n*Math.PI/3;v([Math.cos(q)*.06,.32+Math.sin(q)*.06,0],[Math.cos(q)*.12,.32+Math.sin(q)*.12,0],.018,gold)}break;
   case't-anti-enc':label='結晶阻隔示意';tube(ivory);for(let k=-1;k<=1;k++)p('leaf',x+k*.19,y+.40+Math.abs(k)*.07,z,.18,.24,.14,gold);v([-.29,.22,.10],[.29,.57,.10],.043,red);break;
   case'materials':label='原料袋與粒子';b(-.13,.14,0,.38,.48,.25,ivory);b(-.13,.38,0,.36,.045,.25,red);for(let k=0;k<5;k++)sphere(.14+(k%2)*.14,.02+Math.floor(k/2)*.10,.05,.065,gold);break;
   case'components':label='接頭零件';v([-.37,.15,0],[.37,.15,0],.18,blue);ring(-.23,.15,0,.26,ivory,Math.PI/2);ring(.23,.15,0,.26,ivory,Math.PI/2);v([0,.15,0],[0,.43,0],.14,gold);break;
   case'equipment':label='加工設備';b(0,.09,0,.65,.38,.30,blue);b(-.15,.36,0,.24,.22,.25,ivory);b(.14,.12,.17,.20,.16,.025,gold);v([-.15,.24,0],[-.15,.02,0],.05,red);break;
   case'packaging':label='醫材包裝袋';b(-.12,.15,0,.40,.54,.09,ivory);b(-.12,.16,.06,.28,.33,.025,blue);b(.24,.06,.10,.28,.32,.27,gold);b(.24,.06,.25,.045,.32,.015,ivory);break;
   case'validation':label='檢測放大鏡';ring(.02,.23,0,.40,blue);v([-.12,.08,0],[-.34,-.17,0],.075,red);v([-.06,.19,.02],[.01,.11,.02],.025,gold);v([.01,.11,.02],[.12,.29,.02],.025,gold);break;
   case'logistics':label='物流貨車';b(0,.10,0,.68,.34,.28,blue);b(.34,.06,0,.24,.27,.28,ivory);b(.36,.16,.15,.15,.09,.025,blue);for(const dx of [-.22,.32])sphere(dx,-.11,.15,.085,C.ink);break;
   case'oem':label='合作拼接模組';b(-.16,.13,0,.35,.36,.24,blue);b(.18,.13,0,.35,.36,.24,gold);sphere(0,.16,.02,.09,ivory);break;
  }
  rooftopSymbols.push({tile:i,label,x,z,y:a.y});
 }

 tileCenters.forEach(courtyard);
 tileCenters.forEach(c=>roofEmblem(c.i));
 // Short canal crossings are walking passages; they do not encode content relationships.
 const routes=[];owner=-1;
 tileCenters.forEach(a=>edgeSteps.forEach((_,edge)=>{const other=neighbor(a.i,edge);if(other===undefined||other<=a.i)return;const b=tileCenters[other],len=Math.hypot(b.x-a.x,b.z-a.z),dx=(b.x-a.x)/len,dz=(b.z-a.z)/len,ry=Math.atan2(dx,dz),start=[a.x+dx*1.68,a.z+dz*1.68],end=[b.x-dx*1.68,b.z-dz*1.68];routes.push({a:a.i,b:other,kind:'walkway'});box((a.x+b.x)/2,TOP-.05,(a.z+b.z)/2,.70,.10,len-3.36,0xe3ddd0,ry);for(const side of [-1,1]){const nx=dz*.34*side,nz=-dx*.34*side;fence(start[0]+nx,start[1]+nz,end[0]+nx,end[1]+nz,0)}}));

 // A continuous faceted lake basin surrounds the navigable districts.
 function lakeBasin(){
  owner=-1;const segments=64,scales=[1,1.045,1.16,1.42,1.85,2.6,4],levels=[.015,.17,.68,3.2,10.2,6.4,4.8],rings=[],triangles=[],groups=new Map(),palette=[0xc1c9a4,0xa5b68e,0x99ad85,0x8fa47e,0xa6b68c,0x93a980],rx=20.2,rz=18.7;
  for(let j=0;j<scales.length;j++){rings[j]=[];for(let k=0;k<segments;k++){const a=k/segments*Math.PI*2,shore=1+.050*Math.sin(a*3+.3)+.030*Math.cos(a*7),ridge=Math.sin(a*5+.2)*.8+Math.cos(a*9)*.45+Math.sin(a*3)*.65,y=levels[j]+(j>1?ridge*(j-1)*.32:Math.sin(a*5)*.025);rings[j].push([Math.cos(a)*rx*scales[j]*shore,y,Math.sin(a)*rz*scales[j]*shore])}}
  function triangle(A,B,C,j,k){if((B[2]-A[2])*(C[0]-A[0])-(B[0]-A[0])*(C[2]-A[2])<0)[B,C]=[C,B];const color=j===0?palette[0]:palette[1+(k+j*3)%5];if(!groups.has(color))groups.set(color,[]);groups.get(color).push(...A,...B,...C);triangles.push({A,B,C,band:j})}
  for(let j=0;j<rings.length-1;j++)for(let k=0;k<segments;k++){const next=(k+1)%segments,A=rings[j][k],B=rings[j+1][k],C=rings[j][next],D=rings[j+1][next];triangle(A,B,C,j,k);triangle(B,D,C,j,k+1)}
  let index=0;for(const[color,positions]of groups){const kind='landscape'+index++,geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(positions,3));geo.computeVertexNormals();G[kind]=geo;p(kind,0,0,0,1,1,1,color)}
  function pine(x,y,z,s){cyl(x,y+.30*s,z,.035*s,.60*s,C.brown);p('cone',x,y+.68*s,z,.56*s,1.05*s,.56*s,0x608767);p('cone',x,y+1.02*s,z,.38*s,.88*s,.38*s,0x7d9c77)}
  let forestCount=0;for(const t of triangles)for(let grove=0;grove<3;grove++){if(t.band<1||t.band>4||rand()>.55)continue;let u=.18+rand()*.48,v=.18+rand()*.35;if(u+v>.88)v=.88-u;const w=1-u-v,x=t.A[0]*u+t.B[0]*v+t.C[0]*w,y=t.A[1]*u+t.B[1]*v+t.C[1]*w,z=t.A[2]*u+t.B[2]*v+t.C[2]*w,s=.65+rand()*.65;if(rand()<.65)pine(x,y,z,s);else tree(x,z,s,false,y,true);forestCount++}
  for(let h=0;h<14;h++){const k=(h*7+11)%segments,A=rings[1][k],B=rings[2][k],x=A[0]*.5+B[0]*.5,z=A[2]*.5+B[2]*.5,y=A[1]*.5+B[1]*.5;box(x,y+.22,z,.44,.44,.38,0xf0e7cf);p('roof',x,y+.53,z,.72,.26,.64,C.coral,Math.PI/4);box(x,y+.26,z+.20,.15,.17,.025,C.glass)}
  let cloudGroups=0;for(let c=0;c<12;c++){const a=c/12*Math.PI*2+.15;if(Math.cos(a)*.47+Math.sin(a)*.65>.05)continue;cloudGroups++;const x=Math.cos(a)*32,z=Math.sin(a)*30,y=11+Math.sin(a*3)*1.4;for(let b=0;b<6;b++){const f=b/5-.5;ball(x+f*3.6,y+Math.sin(b*1.4)*.28,z+Math.cos(b*1.8)*.48,.88+(b%3)*.14,0xf1f0e5,[1.25,.72,.90])}}
  return{shoreline:rings[0],overview:Array.from({length:12},(_,i)=>({x:Math.cos(i/12*Math.PI*2)*18.9,z:Math.sin(i/12*Math.PI*2)*17.5})),forestCount,terrainTriangles:triangles.length,cloudGroups};
 }
 const landscape=lakeBasin();

 G.glass=G.round;const batches=new Map();for(const a of parts){const key=a.color===C.glass?'glass':a.kind;let b=batches.get(key);if(!b)batches.set(key,b=[]);b.push(a)}
 const staticMeshes=[];for(const [kind,items]of batches){const material=new T.MeshStandardMaterial({roughness:kind==='ball'?.66:.82,metalness:0,vertexColors:false});const mesh=new T.InstancedMesh(G[kind],material,items.length);mesh.castShadow=true;mesh.receiveShadow=true;mesh.userData.owners=items.map(p=>p.owner);const dummy=new T.Object3D();items.forEach((a,i)=>{dummy.position.set(...a.pos);dummy.rotation.set(...a.rot);dummy.scale.set(...a.scale);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);mesh.setColorAt(i,new T.Color(a.color))});mesh.instanceMatrix.needsUpdate=true;mesh.instanceColor.needsUpdate=true;mesh.computeBoundingSphere();root.add(mesh);staticMeshes.push({mesh,items,kind})}
 // Cargo and air traffic are scenery; they do not represent actual trade routes.
 const transport=new T.Group(),vehicles=[],vehicleMeshes=[],beacons=[];root.add(transport);
 function vehiclePart(parent,kind,pos,scale,color,rotation=[0,0,0],light=false){const material=new T.MeshStandardMaterial({color,roughness:.72,emissive:light?color:0,emissiveIntensity:light?.3:0}),mesh=new T.Mesh(G[kind],material);mesh.position.set(...pos);mesh.scale.set(...scale);mesh.rotation.set(...rotation);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);vehicleMeshes.push({mesh,color});if(light)beacons.push(mesh);return mesh}
 const ship=new T.Group();ship.name='cargo-vessel';transport.add(ship);vehicles.push({kind:'cargo',group:ship});
 const vp=(kind,pos,scale,color,rotation,light)=>vehiclePart(ship,kind,pos,scale,color,rotation,light);
 vp('round',[0,.13,0],[.94,.40,3.18],0x365b64);vp('ball',[0,.12,1.40],[.92,.39,.78],0x365b64);vp('round',[0,.35,0],[.87,.11,2.80],0xc8bca3);vp('round',[0,.55,-1.05],[.76,.41,.56],0xf4ecdb);vp('round',[0,.81,-1.05],[.79,.14,.58],0xf4ecdb);vp('round',[0,.82,-.74],[.62,.10,.025],0x709d9e);vp('cyl',[.19,1.02,-1.12],[.12,.36,.12],0xc76b45);
 for(let row=0;row<3;row++)for(let col=0;col<2;col++){const x=(col-.5)*.39,z=-.37+row*.58,c=[0xd8744b,0x669692,0xd6b961,0xe2c5a3,0x7f999e,0xc87251][row*2+col];vp('round',[x,.57,z],[.36,.33,.52],c);for(let rib=0;rib<4;rib++)vp('box',[x-.182,.57,z+(rib-1.5)*.11],[.013,.28,.017],0xeee3ce);if(row<2)vp('round',[x,.91,z],[.36,.32,.52],c)}
 vp('ball',[-.43,.76,-.80],[.07,.07,.07],0xe77d64,undefined,true);vp('ball',[.43,.76,-.80],[.07,.07,.07],0x8dc5aa,undefined,true);
 for(const side of [-1,1])vp('round',[side*.55,-.035,-1.85],[.07,.018,1.4],0xa0d0ce,[0,side*.14,0]);
 const plane=new T.Group();plane.name='cargo-aircraft';transport.add(plane);vehicles.push({kind:'aircraft',group:plane});
 const ap=(kind,pos,scale,color,rotation,light)=>vehiclePart(plane,kind,pos,scale,color,rotation,light);
 ap('ball',[0,0,0],[.43,.43,2.7],0xf3eee2);ap('ball',[0,.10,1.02],[.32,.16,.35],0x567d87);ap('round',[0,-.03,-.12],[2.72,.075,.44],0xe5e4db,[0,.10,0]);ap('round',[0,.06,-1.02],[1.08,.065,.34],0xd3764d);ap('round',[0,.35,-1.06],[.085,.63,.48],0xd3764d,[.18,0,0]);
 for(const side of [-1,1]){ap('ball',[side*.68,-.19,.04],[.25,.25,.59],0xe6e7e0);ap('ball',[side*.68,-.19,.30],[.16,.16,.025],0x3d5b62);ap('ball',[side*1.36,-.01,-.24],[.065,.065,.065],side<0?0xd7765c:0x79b49a,undefined,true);for(let w=0;w<5;w++)ap('round',[side*.207,.07,.64-w*.22],[.019,.060,.080],0x739a9d)}
 function updateTransport(time){const a=time*.021+.75;ship.position.set(Math.sin(a)*17.0,-.01,Math.cos(a)*15.7);ship.rotation.y=Math.atan2(Math.cos(a)*17.0,-Math.sin(a)*15.7);ship.rotation.z=Math.sin(time*.8)*.012;
  const u=((time+31)%112)/112;plane.visible=u<.83;const t=u/.83;plane.position.set(-31+t*62,10.4+Math.sin(t*Math.PI)*1.1,-12+t*16);plane.rotation.y=Math.atan2(62,16);plane.rotation.z=-Math.sin(t*Math.PI*2)*.045;
 }
 updateTransport(0);

 // Connect building doors, their forecourts, sidewalks and the adjacent-cell crossings.
 const nodes=[],adj=[],rings=[],doorIds=[],stations=[],pathCache=new Map();
 function node(x,z,tile,building=-1){const id=nodes.length;nodes.push({x,z,tile,building});adj.push([]);return id}
 function link(a,b){const length=Math.hypot(nodes[a].x-nodes[b].x,nodes[a].z-nodes[b].z);adj[a].push([b,length]);adj[b].push([a,length])}
 function nearRing(tile,n){let best=rings[tile][0],dist=Infinity;for(const id of rings[tile]){const d=Math.hypot(nodes[id].x-nodes[n].x,nodes[id].z-nodes[n].z);if(d<dist){dist=d;best=id}}return best}
 tileCenters.forEach((c,i)=>{rings[i]=Array.from({length:6},(_,k)=>{const p=point(c.x,c.z,1.73,k);return node(p[0],p[1],i)});rings[i].forEach((n,k)=>link(n,rings[i][(k+1)%6]));const d=doors[i],inside=node(d.x,d.z-.18,i,i),threshold=node(d.x,d.z+.04,i),outside=node(d.x,d.z+.23,i),lane=node(c.x-1.25,d.z+.23,i),forecourt=node(c.x-1.25,c.z+1.11,i);doorIds[i]=inside;link(inside,threshold);link(threshold,outside);link(outside,lane);link(lane,forecourt);link(forecourt,rings[i][2]);stations[i]=[];
  const count=definitions[i].role==='factory'?5:3;for(let j=0;j<count;j++){const a=j/count*Math.PI*2,r=definitions[i].role==='factory'?1.46:1.48,n=node(c.x+Math.sin(a)*r,c.z+Math.cos(a)*r,i);stations[i].push(n);link(n,nearRing(i,n))}
 });
 routes.forEach(({a,b})=>{const A=tileCenters[a],B=tileCenters[b],len=Math.hypot(B.x-A.x,B.z-A.z),dx=(B.x-A.x)/len,dz=(B.z-A.z)/len,pa=node(A.x+dx*1.84,A.z+dz*1.84,a),pb=node(B.x-dx*1.84,B.z-dz*1.84,b);link(pa,pb);const face=(tile,p)=>rings[tile].slice().sort((x,y)=>Math.hypot(nodes[x].x-nodes[p].x,nodes[x].z-nodes[p].z)-Math.hypot(nodes[y].x-nodes[p].x,nodes[y].z-nodes[p].z)).slice(0,2);face(a,pa).forEach(n=>link(pa,n));face(b,pb).forEach(n=>link(pb,n))});
 function path(from,to,onlyTile=-1){const key=from+':'+to+':'+onlyTile;if(pathCache.has(key))return pathCache.get(key);const dist=Array(nodes.length).fill(Infinity),prev=Array(nodes.length).fill(-1),done=new Set();dist[from]=0;for(let step=0;step<nodes.length;step++){let u=-1;for(let i=0;i<nodes.length;i++)if(!done.has(i)&&(u<0||dist[i]<dist[u]))u=i;if(u<0||!Number.isFinite(dist[u]))break;if(u===to)break;done.add(u);for(const[v,w]of adj[u])if((onlyTile<0||nodes[v].tile===onlyTile)&&dist[u]+w<dist[v]){dist[v]=dist[u]+w;prev[v]=u}}
  if(!Number.isFinite(dist[to]))throw Error('Disconnected walking route');const ids=[];for(let u=to;u!==-1;u=prev[u]){ids.push(u);if(u===from)break}ids.reverse();const result={ids,length:dist[to]};pathCache.set(key,result);return result}
 actors.forEach((a,i)=>{a.id=i;a.taskName='準備工作';a.status='work';a.phase=(a.phase??0)%1;a.walkSpeed=a.role==='sales'?.57:a.role==='patient'?.25:.43;const home=doorIds[a.tile];let goals;
  if(a.role==='sales'){const pool=tileCenters.map(c=>c.i).filter(k=>k!==a.tile),start=i%pool.length;goals=[home,doorIds[pool[start]],doorIds[pool[(start+4)%pool.length]],doorIds[pool[(start+8)%pool.length]],home]}
  else goals=[home,stations[a.tile][i%stations[a.tile].length],home];
  a.legs=[];a.period=0;for(let j=1;j<goals.length;j++){const route=path(goals[j-1],goals[j],a.role==='sales'?-1:a.tile),travel=route.length/a.walkSpeed,stop=nodes[goals[j]].building>=0?(a.role==='sales'?7:4):7;a.legs.push({route,travel,stop,start:a.period,destination:goals[j]});a.period+=travel+stop}a.offset=a.phase*a.period;
 });
 const moving=new T.Group(),movingBatches=new Map();const dummy=new T.Object3D(),basis=new T.Matrix4();actors.forEach((a,ai)=>a.parts.forEach((p,pi)=>{let list=movingBatches.get(p.kind);if(!list)movingBatches.set(p.kind,list=[]);list.push({actor:ai,part:pi})}));const dynamicMeshes=[];for(const[kind,list]of movingBatches){const mesh=new T.InstancedMesh(G[kind],new T.MeshStandardMaterial({roughness:.75}),list.length);mesh.castShadow=true;mesh.receiveShadow=true;mesh.frustumCulled=false;mesh.userData.personIds=list.map(r=>r.actor);mesh.userData.owners=list.map(r=>actors[r.actor].tile);list.forEach((r,i)=>mesh.setColorAt(i,new T.Color(actors[r.actor].parts[r.part].color)));moving.add(mesh);dynamicMeshes.push({mesh,list})}root.add(moving);
 const taskNames={doctor:['巡診中','查看病歷','與護理師討論'],nurse:['前往照護站','整理照護用品','協助病人'],patient:['前往候診區','候診中','接受照護'],factory:['搬運物料','操作設備','檢查產品'],sales:['攜帶樣品拜訪','洽談供應需求','確認樣品與訂單'],lab:['移送測試樣品','操作檢測設備','記錄驗證結果']};
 function updatePeople(time){
  actors.forEach(a=>{const at=(time+a.offset)%a.period,leg=a.legs.find(l=>at<l.start+l.travel+l.stop)||a.legs[a.legs.length-1],elapsed=at-leg.start,walking=elapsed<leg.travel,goal=nodes[leg.destination];let indoors=-1;
   if(walking){let distance=Math.min(leg.route.length,elapsed*a.walkSpeed);const ids=leg.route.ids;for(let j=1;j<ids.length;j++){const A=nodes[ids[j-1]],B=nodes[ids[j]],length=Math.hypot(B.x-A.x,B.z-A.z);if(distance<=length||j===ids.length-1){const f=length?distance/length:0;a.x=A.x+(B.x-A.x)*f;a.z=A.z+(B.z-A.z)*f;a.ry=Math.atan2(B.x-A.x,B.z-A.z);a.currentTile=f<.5?A.tile:B.tile;if(A.building>=0&&f<.5)indoors=A.building;if(B.building>=0&&f>.5)indoors=B.building;break}distance-=length}}
   else{a.x=goal.x;a.z=goal.z;a.currentTile=goal.tile;indoors=goal.building;a.ry=goal.building>=0?0:Math.atan2(tileCenters[goal.tile].x-a.x,tileCenters[goal.tile].z-a.z)}
   a.indoors=indoors>=0;a.indoorTile=indoors;a.destinationTile=goal.tile;a.status=walking?'walk':'work';const name=definitions[goal.tile].name;
   if(a.role==='sales')a.taskName=walking?'前往'+name:'在'+name+'洽談與送樣';
   else if(a.role==='factory')a.taskName=walking?(goal.building>=0?'返回工廠':'前往作業站'):(a.indoors?'室內組裝與作業':a.id%2?'操作設備':'檢查產品');
   else if(a.role==='doctor')a.taskName=walking?(goal.building>=0?'進入醫院巡診':'前往照護區'):(a.indoors?'室內巡診與查看病歷':'討論照護與查看病歷');
   else if(a.role==='nurse')a.taskName=walking?(goal.building>=0?'返回病房':'前往照護站'):(a.indoors?'病房照護':'整理照護用品');
   else if(a.role==='patient')a.taskName=walking?(goal.building>=0?'進入診間':'前往候診區'):(a.indoors?'診間就醫':'候診中');
   else a.taskName=walking?(goal.building>=0?'進入驗證室':'移送測試樣品'):(a.indoors?'室內檢測與記錄':'操作檢測設備');
  });
  for(const b of dynamicMeshes){b.list.forEach((r,i)=>{const a=actors[r.actor],p=a.parts[r.part],s=Math.sin(a.ry),c=Math.cos(a.ry),px=p.pos[0]*c+p.pos[2]*s,pz=-p.pos[0]*s+p.pos[2]*c,walking=a.status==='walk';
   dummy.position.set(a.x+px,a.y+p.pos[1]+(walking?Math.sin(time*7+a.phase)*.008:0),a.z+pz);
   let swing=walking?Math.sin(time*7+a.phase*6)*.40*(a.wheel?0:1)*(r.part===3||r.part===7?1:r.part===4||r.part===8?-1:0):0;
   if(!walking&&(r.part===7||r.part===8))swing=-(a.role==='patient'?.1:.62)+Math.sin(time*4+a.id)*.14;
   dummy.rotation.set(p.rot[0]+swing,p.rot[1]+a.ry,p.rot[2]);const hidden=(api.hiddenActor===a.id||a.indoors)?.001:1;dummy.scale.set(p.scale[0]*hidden,p.scale[1]*hidden,p.scale[2]*hidden);dummy.updateMatrix();b.mesh.setMatrixAt(i,dummy.matrix)
  });b.mesh.instanceMatrix.needsUpdate=true}
 }
 const api={hiddenActor:-1};
 updatePeople(0);
 function setNight(n){for(const b of beacons)b.material.emissiveIntensity=.3+n*2.4;for(const b of staticMeshes){let changed=false;b.items.forEach((a,i)=>{if(a.color===C.glass){const c=new T.Color(C.glass).lerp(new T.Color(0xffd99a),n);b.mesh.setColorAt(i,c);changed=true}});if(changed)b.mesh.instanceColor.needsUpdate=true}}
 function exportRender(){
  const out=staticMeshes.map(b=>({kind:b.kind,positions:Array.from(G[b.kind].attributes.position.array),normals:Array.from(G[b.kind].attributes.normal.array),indices:G[b.kind].index?Array.from(G[b.kind].index.array):null,items:b.items}));
  for(const b of dynamicMeshes){const kind=b.list.length?actors[b.list[0].actor].parts[b.list[0].part].kind:null;if(!kind)continue;const items=b.list.map(r=>{const a=actors[r.actor];if(a.indoors)return null;const p=a.parts[r.part],c=Math.cos(a.ry),s=Math.sin(a.ry);return{kind,pos:[a.x+p.pos[0]*c+p.pos[2]*s,a.y+p.pos[1],a.z-p.pos[0]*s+p.pos[2]*c],scale:p.scale,color:p.color,rot:[p.rot[0],p.rot[1]+a.ry,p.rot[2]]}}).filter(Boolean);out.push({kind,positions:Array.from(G[kind].attributes.position.array),normals:Array.from(G[kind].attributes.normal.array),indices:G[kind].index?Array.from(G[kind].index.array):null,items})}
  root.updateMatrixWorld(true);for(const{mesh,color}of vehicleMeshes){if(!mesh.parent.visible)continue;const pos=new T.Vector3(),q=new T.Quaternion(),scale=new T.Vector3();mesh.matrixWorld.decompose(pos,q,scale);const e=new T.Euler().setFromQuaternion(q),geo=mesh.geometry;out.push({kind:'transport',positions:Array.from(geo.attributes.position.array),indices:geo.index?Array.from(geo.index.array):null,items:[{pos:pos.toArray(),scale:scale.toArray(),rot:[e.x,e.y,e.z],color}]})}
  return {centers:tileCenters,batches:out,landscape};
 }
 return Object.assign(api,{root,tileCenters,rooftopSymbols,roofs,landscape,transport,vehicles,updateTransport,staticMeshes,parts,actors,geometries:G,updatePeople,setNight,lamps,routes,doors,navigation:{nodes,doorIds,stations},constants:{TOP,R},exportRender});
}
