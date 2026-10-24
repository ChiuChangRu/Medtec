(function(){'use strict';
const C={
products: [

  { id:'angio-cath', dept:'cardio', alsoIn:[], name:'血管攝影導管', status:'上市',
    use:'經皮進入血管，把顯影劑送到目標血管進行攝影；有多種前端彎型可選。',
    material:'', techs:['t-hydro','t-braid','t-laser','t-extrude'], journeys:['angio'] },
  { id:'sheath', dept:'cardio', alsoIn:['radiology'], name:'血管鞘（Sheath）', status:'上市',
    use:'建立並維持血管通道，讓導管、導絲反覆進出時減少血管損傷。',
    material:'ETFE、Pebax（親水披膜對象）', techs:['t-hydro','t-laser'], journeys:['angio'] },
  { id:'long-sheath', dept:'cardio', alsoIn:[], name:'長血管鞘（長 Sheath）', status:'開發中',
    use:'較長的鞘管，用於需要到達較遠位置的介入。', material:'', techs:['t-coil'], journeys:[] },
  { id:'micro-cath', dept:'cardio', alsoIn:['radiology'], name:'微導管', status:'開發中',
    use:'小口徑導管，用於進入遠端細小血管。', material:'ETFE、Pebax（親水披膜對象）', techs:['t-hydro'], journeys:[] },
  { id:'hp-syringe', dept:'cardio', alsoIn:['radiology'], name:'高壓注射筒套組', status:'上市',
    use:'搭配高壓注射器，在血管攝影或電腦斷層時注射顯影劑。', material:'', techs:[], journeys:['angio'] },
  { id:'manifold', dept:'cardio', alsoIn:[], name:'多歧管／高壓連接管', status:'上市',
    use:'連接注射筒與導管，切換顯影劑、生理食鹽水與壓力監測等多路流體。', material:'', techs:[], journeys:['angio'] },

  { id:'blood-line', dept:'nephro', alsoIn:[], name:'血液迴路管', status:'上市',
    use:'血液透析時，把血液從病人引到透析器，再送回體內的體外循環管路。', material:'', techs:[], journeys:['hd'] },
  { id:'fistula-needle', dept:'nephro', alsoIn:[], name:'透析穿刺針', status:'上市',
    use:'穿刺動靜脈瘻管，建立每次透析的血液通路。', material:'', techs:[], journeys:['hd'] },
  { id:'hd-cath', dept:'nephro', alsoIn:['icu'], name:'血液透析導管（HD 導管）', status:'上市',
    use:'無法使用瘻管時，經中心靜脈建立透析通路；開發抗菌披膜。', material:'TPU', techs:['t-anti-bac'], journeys:['hd'] },

  { id:'cvc', dept:'icu', alsoIn:['ward'], name:'中心靜脈導管（CVC）', status:'開發中',
    use:'置於中心靜脈，用於輸液、給藥與監測；開發抗菌披膜。', material:'TPU', techs:['t-anti-bac'], journeys:[] },
  { id:'suction', dept:'icu', alsoIn:['ward'], name:'抽痰管', status:'上市',
    use:'清除呼吸道分泌物，維持呼吸道通暢。', material:'', techs:[], journeys:[] },

  { id:'dj', dept:'uro', alsoIn:[], name:'DJ 管', status:'上市',
    use:'置於輸尿管，維持腎臟到膀胱的尿液引流；開發抗結痂披膜。', material:'TPU', techs:['t-anti-enc'], journeys:[] },
  { id:'foley', dept:'uro', alsoIn:['ward'], name:'導尿管', status:'上市',
    use:'經尿道引流膀胱內的尿液。', material:'', techs:[], journeys:[] },
  { id:'pigtail', dept:'uro', alsoIn:['radiology'], name:'Pigtail 腎引流導管', status:'上市',
    use:'經皮置入腎臟，前端捲曲成豬尾狀固定在腎盂內，引流尿液；以編織管技術強化管體。',
    material:'', techs:['t-braid'], journeys:[], note:'＊置放科別依醫院而定' },
  { id:'balloon', dept:'uro', alsoIn:['radiology'], name:'TPU 擴張球囊', status:'開發中',
    use:'以球囊撐開需要擴張的管腔，應用部位在子宮頸、前列腺、呼吸道三者中擇一。',
    material:'TPU', techs:['t-balloon','t-extrude'], journeys:[],
    note:'＊應用部位未定；子宮頸選項屬婦產科，本站未設此科別' },

  { id:'iv-bag', dept:'ward', alsoIn:[], name:'藥用軟袋', status:'上市',
    use:'盛裝輸液或藥液的軟性袋體。', material:'', techs:[], journeys:[] },
  { id:'ext-line', dept:'ward', alsoIn:['icu'], name:'連接管', status:'上市',
    use:'連接輸液容器與病人端的管路。', material:'', techs:[], journeys:[] },

  { id:'biopsy', dept:'radiology', alsoIn:['uro'], name:'檢體針', status:'開發中',
    use:'在影像導引下穿刺，取得組織檢體供病理檢查。', material:'', techs:[], journeys:[],
    note:'＊主科別待確認（放射科、泌尿科或外科）' }
],
techs: [
 { id:'t-hydro', name:'親水性披膜', family:'surface', material:'ETFE、Pebax',
   products:['sheath','micro-cath','angio-cath'],
   goal:'建立可量產之親水性低摩擦披膜，完成材料、前處理、塗佈、測試、生物安全風險與量產導入。',
   items:['塗層材料認知','表面前處理','塗佈製程','性能測試','失效分析','生物安全風險','量產導入'] },
 { id:'t-anti-enc', name:'抗結痂披膜', family:'surface', material:'TPU', products:['dj'],
   goal:'建立可降低結晶沉積與生物膜附著之抗結痂披膜，完成材料機制、表面處理、塗佈、性能測試、失效分析、生物安全與量產導入。',
   items:['塗層材料認知','抗結痂機制／候選配方','表面前處理','塗佈製程','性能測試方法建立','性能測試','失效分析','生物安全風險','量產導入'] },
 { id:'t-braid', name:'編織管', family:'structure', material:'', products:['angio-cath','pigtail'],
   goal:'建立編織管之結構設計、線材與材料選擇、編織製程、層間結合、熱焊接合、性能測試、失效分析與量產導入能力。',
   items:['編織結構認知','線材與材料','編織製程','層間結合','多變因實驗規劃與判讀','挑選收縮薄膜','操作熱焊接合','性能測試','失效分析','量產導入'] },
 { id:'t-anti-bac', name:'抗菌披膜', family:'surface', material:'TPU', products:['hd-cath','cvc'],
   goal:'建立可降低細菌附著與生物膜形成之抗菌披膜，完成抗菌機制、材料/藥劑選擇、表面處理、塗佈、抗菌性能測試、生物安全與量產導入。',
   items:['塗層材料認知','抗菌機制／候選藥劑','表面前處理','塗佈製程','抗菌性能測試建立','性能測試','失效分析','生物安全風險','量產導入','設計移轉／試量產確認'] },
 { id:'t-laser', name:'雷射加工（打孔／印刷）', family:'process', material:'', products:['angio-cath','sheath'],
   goal:'建立醫療器材用管材雷射打孔與印刷之材料表面認知、雷射孔徑/孔位參數、油墨/標線附著性、打孔與印刷對位整合、製程驗證與量產導入能力。',
   items:['材料與表面特性認知','雷射打孔參數開發','印刷油墨／標線附著性開發','打孔與印刷對位整合','製程驗證','量產導入'] },
 { id:'t-coil', name:'薄壁繞簧管', family:'structure', material:'', products:['long-sheath'],
   goal:'建立薄壁繞簧管之繞簧結構、線材與材料、繞簧製程、薄壁層間結合、熱焊接接合、性能測試、失效分析與量產導入能力。',
   items:['繞簧結構認知','線材與材料','繞簧製程','薄壁層間結合','多變因實驗判讀','挑選收縮薄膜','操作熱焊接接合','性能測試','失效分析','量產導入','設計移轉／試量產確認'] },
 { id:'t-extrude', name:'變徑及異型管押出', family:'forming', material:'', products:['angio-cath','balloon'],
   goal:'建立醫療器材用變徑及異型管押出之結構設計、材料流變、模具流道、變徑製程、異型截面、過渡區控制、性能驗證、失效分析與量產管制能力。',
   items:['變徑／異型管結構認知','材料與樹脂流變特性','押出模具與流道設計','變徑押出製程建立','異型截面尺寸控制','多段尺寸轉換與過渡區控制','多變因實驗判讀','性能測試與規格驗證','失效分析與製程修正','量產導入與製程管制'] },
 { id:'t-balloon', name:'TPU 球囊暨導管', family:'forming', material:'TPU', products:['balloon'],
   goal:'建立 TPU 球囊暨導管之材料、料管、模具、成型、爆壓統計、瑕疵判定、摺疊包覆、接合與臨床風險連結能力。',
   items:['氣球材料認知','設計氣球料管','判斷材料強度','設計氣球模具','氣球成型製程','多變因實驗判讀','統計估算氣球爆壓','判定氣球瑕疵','尺寸與壁厚控制','性能測試','氣球摺疊與包覆','挑選收縮薄膜','接合技術','操作熱焊接接合','臨床風險連結','技術整合確認'] }
],
capabilities: [
 { id:'coat',  name:'塗層・前處理・塗佈', re:'塗層材料|前處理|塗佈' },
 { id:'bio',   name:'生物安全風險',       re:'生物安全' },
 { id:'wire',  name:'線材與材料',         re:'線材' },
 { id:'layer', name:'層間結合',           re:'層間結合' },
 { id:'doe',   name:'多變因實驗',         re:'多變因' },
 { id:'film',  name:'挑選收縮薄膜',       re:'收縮薄膜' },
 { id:'weld',  name:'熱焊接合',           re:'熱焊' },
 { id:'mold',  name:'模具設計',           re:'模具' },
 { id:'test',  name:'性能測試',           re:'性能測試' },
 { id:'fa',    name:'失效分析',           re:'失效分析' },
 { id:'mp',    name:'量產導入',           re:'量產導入' },
 { id:'dt',    name:'設計移轉／試量產',   re:'設計移轉' }
],
journeys: [
 { id:'hd', name:'一次血液透析', steps:[
   { t:'建立通路', d:'以穿刺針穿刺瘻管；沒有瘻管時改用透析導管。', products:['fistula-needle','hd-cath'] },
   { t:'體外循環', d:'血液經迴路管送到透析器，淨化後送回體內。', products:['blood-line'] },
   { t:'結束與照護', d:'拔針止血；留置的導管需要維持通暢並預防感染。', products:['hd-cath'] } ]},
 { id:'angio', name:'一次血管攝影', steps:[
   { t:'穿刺與置鞘', d:'穿刺血管後放入血管鞘，建立反覆進出的通道。', products:['sheath'] },
   { t:'導管到位', d:'沿導絲把血管攝影導管送到目標血管。', products:['angio-cath'] },
   { t:'注射顯影劑', d:'高壓注射器經注射筒與連接管注入顯影劑，同時攝影。', products:['hp-syringe','manifold'] },
   { t:'移除與止血', d:'撤出導管與血管鞘，壓迫止血。', products:['sheath'] } ]}
],
supplies: [
 { tile:'materials',  item:'TPU、Pebax、ETFE 管材原料', techs:['t-hydro','t-anti-enc','t-anti-bac','t-balloon'] },
 { tile:'materials',  item:'親水／抗結痂／抗菌塗層原料', techs:['t-hydro','t-anti-enc','t-anti-bac'] },
 { tile:'materials',  item:'印刷油墨', techs:['t-laser'] },
 { tile:'components', item:'編織與繞簧用線材', techs:['t-braid','t-coil'] },
 { tile:'components', item:'收縮薄膜', techs:['t-braid','t-coil','t-balloon'] },
 { tile:'equipment',  item:'雷射打孔與印刷設備', techs:['t-laser'] },
 { tile:'equipment',  item:'編織機、繞簧機', techs:['t-braid','t-coil'] },
 { tile:'equipment',  item:'押出機與模具', techs:['t-extrude','t-balloon'] },
 { tile:'equipment',  item:'球囊成型設備', techs:['t-balloon'] },
 { tile:'equipment',  item:'熱焊接合設備', techs:['t-braid','t-coil','t-balloon'] },
 { tile:'validation', item:'性能測試', techs:['t-hydro','t-anti-enc','t-braid','t-anti-bac','t-coil','t-extrude','t-balloon'] },
 { tile:'validation', item:'失效分析', techs:['t-hydro','t-anti-enc','t-braid','t-anti-bac','t-coil','t-extrude'] },
 { tile:'validation', item:'生物安全評估', techs:['t-hydro','t-anti-enc','t-anti-bac'] },
 { tile:'oem',        item:'設計移轉／試量產確認後的代工合作', techs:['t-anti-bac','t-coil'] }
],
kmLinks: {
  't-hydro':    { keywords:['親水','hydrophilic','lubricious'], folders:[36,16,65,46] },
  't-anti-enc': { keywords:['抗結痂','encrustation','人工尿液'], folders:[101,112,113,114] },
  't-braid':    { keywords:['編織','braid'], folders:[] },
  't-anti-bac': { keywords:['抗菌','antimicrobial','biofilm'], folders:[] },
  't-laser':    { keywords:['雷射','laser','打孔','印刷'], folders:[] },
  't-coil':     { keywords:['繞簧','coil','長鞘'], folders:[] },
  't-extrude':  { keywords:['變徑','異型','押出','extrusion'], folders:[] },
  't-balloon':  { keywords:['球囊','balloon'], folders:[76] }
},
productKm: {
  'hp-syringe': { folders:[98,57] },
  'hd-cath':    { folders:[25,29,30] },
  'cvc':        { folders:[99] },
  'biopsy':     { folders:[19,106,115] },
  'pigtail':    { folders:[36] }
}
};
C.families={surface:{name:'表面工程＊',color:'#3f8f8a'},structure:{name:'管體結構＊',color:'#5a67b8'},forming:{name:'成型＊',color:'#c98a2e'},process:{name:'加工＊',color:'#b2577f'}};
C.products.forEach(p=>{p.note=p.note||'';p.alsoIn=p.alsoIn||[]});
C.techs.forEach(t=>{
 t.depts=[...new Set(t.products.flatMap(id=>{const p=C.products.find(p=>p.id===id);return p?[p.dept,...p.alsoIn]:[]}))];
 t.inferred=['t-laser','t-extrude'].includes(t.id);
});
C.capabilities=C.capabilities.map(c=>({...c,techs:C.techs.filter(t=>t.items.some(i=>new RegExp(c.re).test(i))).map(t=>t.id)})).filter(c=>c.techs.length>=2);
C.shared=(a,b)=>C.capabilities.filter(c=>c.techs.includes(a)&&c.techs.includes(b));
window.MEDTECH_CONTENT=C;
})();

