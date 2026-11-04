const PRODUCTS = [
  {id:"reta-10", name:"Retatrutide", mg:"10 mg", cat:"Metabolic", price:34, was:79, purity:"99.4%", batch:"RV-R10-2604", tags:["Triple agonist","Best seller"]},
  {id:"tirz-10", name:"Tirzepatide", mg:"10 mg", cat:"Metabolic", price:39, was:89, purity:"99.6%", batch:"RV-T10-2603", tags:["GIP/GLP-1","High demand"]},
  {id:"sema-5", name:"Semaglutide", mg:"5 mg", cat:"Metabolic", price:29, was:64, purity:"99.5%", batch:"RV-S05-2602", tags:["GLP-1"]},
  {id:"bpc-5", name:"BPC-157", mg:"5 mg", cat:"Recovery", price:24, was:49, purity:"99.7%", batch:"RV-B05-2605", tags:["Repair","Staple"]},
  {id:"tb-5", name:"TB-500", mg:"5 mg", cat:"Recovery", price:26, was:52, purity:"99.3%", batch:"RV-TB5-2604", tags:["Repair"]},
  {id:"wolv", name:"Wolverine Blend", mg:"BPC-157 / TB-500", cat:"Recovery", price:54, was:119, purity:"99.4%", batch:"RV-WB1-2606", tags:["Blend","Popular"]},
  {id:"ghk-50", name:"GHK-Cu", mg:"50 mg", cat:"Skin / Repairs", price:28, was:59, purity:"99.6%", batch:"RV-G50-2601", tags:["Copper peptide"]},
  {id:"glow", name:"Glow Blend", mg:"GHK-Cu / BPC-157 / TB-500", cat:"Cosmetic", price:69, was:149, purity:"99.5%", batch:"RV-GL1-2603", tags:["Blend","New"]},
  {id:"klow", name:"KLOW Blend", mg:"GHK-Cu / KPV / BPC / TB", cat:"Cosmetic", price:89, was:189, purity:"99.2%", batch:"RV-KL1-2602", tags:["Blend","Premium"]},
  {id:"mots-10", name:"MOTS-c", mg:"10 mg", cat:"Metabolic", price:44, was:92, purity:"99.1%", batch:"RV-M10-2604", tags:["Mitochondrial","Rare"]},
  {id:"aod-5", name:"AOD-9604", mg:"5 mg", cat:"Metabolic", price:34, was:69, purity:"99.0%", batch:"RV-A05-2601", tags:["Fat metabolism"]},
  {id:"5a1mq-50", name:"5-Amino-1MQ", mg:"50 mg", cat:"Metabolic", price:49, was:99, purity:"99.3%", batch:"RV-5A5-2602", tags:["Rare","Emerging"]},
  {id:"slu-5", name:"SLU-PP-332", mg:"5 mg", cat:"Metabolic", price:59, was:125, purity:"98.9%", batch:"RV-SL5-2603", tags:["Rare","Emerging"]},
  {id:"epi-10", name:"Epitalon", mg:"10 mg", cat:"Longevity", price:39, was:78, purity:"99.4%", batch:"RV-E10-2604", tags:["Longevity"]},
  {id:"selank-10", name:"Selank", mg:"10 mg", cat:"Cognitive", price:34, was:72, purity:"99.2%", batch:"RV-SE10-2603", tags:["Nootropic"]},
  {id:"semax-10", name:"Semax", mg:"10 mg", cat:"Cognitive", price:36, was:76, purity:"99.3%", batch:"RV-SX10-2602", tags:["Nootropic"]},
  {id:"cjc-ipa", name:"CJC-1295 / Ipamorelin", mg:"Blend", cat:"Growth", price:52, was:108, purity:"99.1%", batch:"RV-CJ1-2605", tags:["Blend"]},
  {id:"tesa-10", name:"Tesamorelin", mg:"10 mg", cat:"Growth", price:58, was:124, purity:"99.3%", batch:"RV-TS10-2601", tags:["Premium"]},
  {id:"bac-10", name:"Bacteriostatic Water", mg:"10 ml", cat:"Supply", price:9, was:19, purity:"USP", batch:"RV-BAC-2606", tags:["Supply"]}
];

const STACKS = [
  {id:"stack-recovery", name:"Recovery Stack", flag:"TOP", desc:"Repair protocol — the two staple repair peptides, bundled.", items:["BPC-157 5mg","TB-500 5mg","Bacteriostatic water"], price:56, was:74, skus:["bpc-5","tb-5","bac-10"]},
  {id:"stack-glp1", name:"GLP-1 Starter", flag:"SAVE $34", desc:"Metabolic intro — Reta plus the essentials to run it.", items:["Retatrutide 10mg","Bacteriostatic water"], price:40, was:58, skus:["reta-10","bac-10"]},
  {id:"stack-glow", name:"Glow Protocol", flag:"COSMETIC", desc:"Skin & repair blend stack for cosmetic research.", items:["Glow Blend","Bacteriostatic water"], price:75, was:108, skus:["glow","bac-10"]}
];

const money = n => "$" + n.toFixed(2);
let cart = JSON.parse(localStorage.getItem("bv_cart") || "[]");

function card(p) {
  const save = Math.round((1 - p.price / p.was) * 100);
  return `<article class="card">
    <span class="cat">${p.cat}</span>
    <h3>${p.name}</h3>
    <div class="mg">${p.mg}</div>
    <div class="pills">${p.tags.map(t => `<span class="pill${t === "Rare" || t === "Emerging" ? " cool" : ""}">${t}</span>`).join("")}<span class="pill">${p.purity} pure</span></div>
    <div class="price-row"><span class="price">${money(p.price)}</span><span class="was">${money(p.was)}</span><span class="save">-${save}%</span></div>
    <div class="actions">
      <button class="btn btn-accent" onclick="add('${p.id}')">Add</button>
      <button class="btn btn-ghost" onclick="openCoa('${p.id}')">COA</button>
    </div>
    <span class="coa-link" onclick="openCoa('${p.id}')">Verify batch ${p.batch}</span>
  </article>`;
}

function stackCard(s) {
  return `<article class="stack-card">
    <span class="flag">${s.flag}</span>
    <h3>${s.name}</h3>
    <div class="desc">${s.desc}</div>
    <ul>${s.items.map(i => `<li>${i}</li>`).join("")}</ul>
    <div class="price-row"><span class="price">${money(s.price)}</span><span class="was">${money(s.was)}</span></div>
    <button class="btn btn-accent btn-block" onclick="addStack('${s.id}')">Add stack</button>
  </article>`;
}

document.getElementById("productGrid").innerHTML = PRODUCTS.map(card).join("");
document.getElementById("stackGrid").innerHTML = STACKS.map(stackCard).join("");

function toast(msg){ const t = document.getElementById("toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove("show"), 1600); }

function add(id){
  const item = cart.find(c => c.id === id);
  if (item) item.q++; else cart.push({id, q:1});
  persist(); render(); openDrawer(); toast("Added to cart");
}

function addStack(id){
  const s = STACKS.find(x => x.id === id);
  s.skus.forEach(sku => { const item = cart.find(c => c.id === sku); if (item) item.q++; else cart.push({id: sku, q:1}); });
  persist(); render(); openDrawer(); toast(s.name + " added");
}

function persist(){ localStorage.setItem("bv_cart", JSON.stringify(cart)); }

function changeQty(id, d){
  const item = cart.find(c => c.id === id); if (!item) return;
  item.q += d; if (item.q <= 0) cart = cart.filter(c => c.id !== id);
  persist(); render();
}

function removeItem(id){ cart = cart.filter(c => c.id !== id); persist(); render(); }

function render(){
  const items = document.getElementById("cartItems");
  const count = cart.reduce((s, c) => s + c.q, 0);
  const badge = document.getElementById("badge");
  badge.textContent = count; badge.hidden = count === 0;
  if (!cart.length){ items.innerHTML = `<div class="empty">Your cart is empty.<br>Every vial ships with a COA.</div>`; }
  else {
    items.innerHTML = cart.map(c => {
      const p = PRODUCTS.find(x => x.id === c.id);
      return `<div class="ci"><div class="t"><b>${p.name}</b><small>${p.mg} · ${money(p.price)}</small><div class="qty"><button onclick="changeQty('${p.id}',-1)">−</button><span>${c.q}</span><button onclick="changeQty('${p.id}',1)">+</button></div></div><button class="rm" onclick="removeItem('${p.id}')">remove</button></div>`;
    }).join("");
  }
  const sub = cart.reduce((s, c) => { const p = PRODUCTS.find(x => x.id === c.id); return s + p.price * c.q; }, 0);
  document.getElementById("subtotal").textContent = money(sub);
}

function openDrawer(){ document.getElementById("drawer").classList.add("open"); }
function closeDrawer(){ document.getElementById("drawer").classList.remove("open"); }
document.getElementById("cartOpen").onclick = openDrawer;
document.querySelectorAll("[data-close]").forEach(el => el.onclick = () => { closeDrawer(); closeModal(); });

document.getElementById("checkout").onclick = () => {
  if (!cart.length) return toast("Cart is empty");
  openModal(`<h3>Checkout coming online</h3><p>This storefront is live and cart-ready. Connect Stripe / high-risk gateway to take payment — every order ships with its matching batch COA.</p><button class="btn btn-accent btn-block" onclick="closeModal()">Got it</button>`);
};

function openCoa(id){
  const p = PRODUCTS.find(x => x.id === id);
  const generic = !p;
  const name = generic ? "Sample batch" : `${p.name} ${p.mg}`;
  const batch = generic ? "RV-SAMPLE-0001" : p.batch;
  const purity = generic ? "99.4%" : p.purity;
  const box = document.getElementById("modalBox");
  box.innerHTML = `<h3>Certificate of Analysis</h3><p>${name} · independent third-party lab</p>
    <div class="coa-row"><span>Batch</span><span>${batch}</span></div>
    <div class="coa-row"><span>Method</span><span>HPLC + LC-MS</span></div>
    <div class="coa-row"><span>Identity</span><span class="ok">Confirmed</span></div>
    <div class="coa-row"><span>Purity</span><span class="ok">${purity}</span></div>
    <div class="bar"><i style="width:${parseFloat(purity)}%"></i></div>
    <div class="coa-row"><span>Appearance</span><span>White lyophilized powder</span></div>
    <div class="coa-row"><span>Storage</span><span>−20°C, dry</span></div>
    <div class="coa-row"><span>Released</span><span>${generic ? "2026-05" : "2026-06"}</span></div>
    <button class="btn btn-accent btn-block" style="margin-top:16px" onclick="closeModal()">Close</button>`;
  document.getElementById("modal").classList.add("open");
}
function openModal(html){ document.getElementById("modalBox").innerHTML = html; document.getElementById("modal").classList.add("open"); }
function closeModal(){ document.getElementById("modal").classList.remove("open"); }

render();
