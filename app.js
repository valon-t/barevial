const PRODUCTS = [
  {id:"reta-10", name:"Retatrutide", mg:"10 mg", cat:"Metabolic", price:34, was:79, purity:"99.4%", batch:"RV-R10-2604", flag:"Best seller"},
  {id:"tirz-10", name:"Tirzepatide", mg:"10 mg", cat:"Metabolic", price:39, was:89, purity:"99.6%", batch:"RV-T10-2603", flag:"High demand"},
  {id:"sema-5", name:"Semaglutide", mg:"5 mg", cat:"Metabolic", price:29, was:64, purity:"99.5%", batch:"RV-S05-2602"},
  {id:"bpc-5", name:"BPC-157", mg:"5 mg", cat:"Recovery", price:24, was:49, purity:"99.7%", batch:"RV-B05-2605", flag:"Staple"},
  {id:"tb-5", name:"TB-500", mg:"5 mg", cat:"Recovery", price:26, was:52, purity:"99.3%", batch:"RV-TB5-2604"},
  {id:"wolv", name:"Wolverine Blend", mg:"BPC-157 / TB-500", cat:"Recovery", price:54, was:119, purity:"99.4%", batch:"RV-WB1-2606", flag:"Popular"},
  {id:"ghk-50", name:"GHK-Cu", mg:"50 mg", cat:"Skin / Repairs", price:28, was:59, purity:"99.6%", batch:"RV-G50-2601"},
  {id:"glow", name:"Glow Blend", mg:"GHK-Cu / BPC-157 / TB-500", cat:"Cosmetic", price:69, was:149, purity:"99.5%", batch:"RV-GL1-2603", flag:"New"},
  {id:"klow", name:"KLOW Blend", mg:"GHK-Cu / KPV / BPC / TB", cat:"Cosmetic", price:89, was:189, purity:"99.2%", batch:"RV-KL1-2602"},
  {id:"mots-10", name:"MOTS-c", mg:"10 mg", cat:"Metabolic", price:44, was:92, purity:"99.1%", batch:"RV-M10-2604", flag:"Rare"},
  {id:"aod-5", name:"AOD-9604", mg:"5 mg", cat:"Metabolic", price:34, was:69, purity:"99.0%", batch:"RV-A05-2601"},
  {id:"5a1mq-50", name:"5-Amino-1MQ", mg:"50 mg", cat:"Metabolic", price:49, was:99, purity:"99.3%", batch:"RV-5A5-2602", flag:"Rare"},
  {id:"slu-5", name:"SLU-PP-332", mg:"5 mg", cat:"Metabolic", price:59, was:125, purity:"98.9%", batch:"RV-SL5-2603", flag:"Rare"},
  {id:"epi-10", name:"Epitalon", mg:"10 mg", cat:"Longevity", price:39, was:78, purity:"99.4%", batch:"RV-E10-2604"},
  {id:"selank-10", name:"Selank", mg:"10 mg", cat:"Cognitive", price:34, was:72, purity:"99.2%", batch:"RV-SE10-2603"},
  {id:"semax-10", name:"Semax", mg:"10 mg", cat:"Cognitive", price:36, was:76, purity:"99.3%", batch:"RV-SX10-2602"},
  {id:"cjc-ipa", name:"CJC-1295 / Ipamorelin", mg:"Blend", cat:"Growth", price:52, was:108, purity:"99.1%", batch:"RV-CJ1-2605"},
  {id:"tesa-10", name:"Tesamorelin", mg:"10 mg", cat:"Growth", price:58, was:124, purity:"99.3%", batch:"RV-TS10-2601"},
  {id:"bac-10", name:"Bacteriostatic Water", mg:"10 ml", cat:"Supply", price:9, was:19, purity:"USP", batch:"RV-BAC-2606"}
];

const STACKS = [
  {id:"stack-recovery", name:"Recovery Stack", desc:"The two staple repair peptides, bundled with bac water.", price:56, was:74, save:"24%", skus:["bpc-5","tb-5","bac-10"]},
  {id:"stack-glp1", name:"GLP-1 Starter", desc:"Metabolic intro — retatrutide plus the essentials to run it.", price:40, was:58, save:"31%", skus:["reta-10","bac-10"]},
  {id:"stack-glow", name:"Glow Protocol", desc:"Cosmetic research stack, bundled with bac water.", price:75, was:108, save:"31%", skus:["glow","bac-10"]}
];

const money = n => "$" + (Number.isInteger(n) ? n : n.toFixed(2));
let cart = JSON.parse(localStorage.getItem("bv_cart") || "[]");

function card(p) {
  const save = Math.round((1 - p.price / p.was) * 100);
  return `<article class="card">
    <div class="chead"><span class="cat">${p.cat}</span><span class="save">−${save}%</span></div>
    <h3><a href="peptide.html?p=${p.id}">${p.name}</a></h3>
    <div class="mg">${p.mg} vial · lyophilized powder</div>
    <div class="spec">${p.purity} pure · batch ${p.batch} <span class="coa" onclick="openCoa('${p.id}')">verify</span></div>
    <div class="cfoot">
      <span class="price"><s>${money(p.was)}</s><b>${money(p.price)}</b></span>
      <button class="add" onclick="add('${p.id}')">Add</button>
    </div>
  </article>`;
}

function stackRow(s, i) {
  const first = STACKS.indexOf(s) + 1;
  return `<div class="stack-row">
    <span class="n">0${first}</span>
    <div><h3>${s.name}</h3><div class="it">${s.desc}</div></div>
    <div class="pr"><span class="save">Save ${s.save}</span><b>${money(s.price)}</b><s>${money(s.was)}</s></div>
    <button class="btn btn-line" onclick="addStack('${s.id}')">Add</button>
  </div>`;
}

const gridEl = document.getElementById("productGrid"); if (gridEl) gridEl.innerHTML = PRODUCTS.map(card).join("");
const stackEl = document.getElementById("stackList"); if (stackEl) stackEl.innerHTML = STACKS.map(stackRow).join("");

function toast(m){ const t = document.getElementById("toast"); t.textContent = m; t.classList.add("show"); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove("show"), 1600); }

function add(id){ const it = cart.find(c => c.id === id); if (it) it.q++; else cart.push({id, q:1}); persist(); render(); openDrawer(); toast("Added to cart"); }
function addStack(id){ const s = STACKS.find(x => x.id === id); s.skus.forEach(sk => { const it = cart.find(c => c.id === sk); if (it) it.q++; else cart.push({id: sk, q:1}); }); persist(); render(); openDrawer(); toast(s.name + " added"); }
function persist(){ localStorage.setItem("bv_cart", JSON.stringify(cart)); }
function changeQty(id, d){ const it = cart.find(c => c.id === id); if (!it) return; it.q += d; if (it.q <= 0) cart = cart.filter(c => c.id !== id); persist(); render(); }
function removeItem(id){ cart = cart.filter(c => c.id !== id); persist(); render(); }

function render(){
  const items = document.getElementById("cartItems");
  const count = cart.reduce((s, c) => s + c.q, 0);
  const badge = document.getElementById("badge"); badge.textContent = count; badge.hidden = count === 0;
  if (!cart.length) items.innerHTML = `<div class="empty">Your cart is empty.<br>Every vial ships with a COA.</div>`;
  else items.innerHTML = cart.map(c => {
    const p = PRODUCTS.find(x => x.id === c.id);
    return `<div class="ci"><div class="t"><b>${p.name}</b><small>${p.mg} · ${money(p.price)}</small><div class="qty"><button onclick="changeQty('${p.id}',-1)">−</button><span>${c.q}</span><button onclick="changeQty('${p.id}',1)">+</button></div></div><button class="rm" onclick="removeItem('${p.id}')">remove</button></div>`;
  }).join("");
  const sub = cart.reduce((s, c) => { const p = PRODUCTS.find(x => x.id === c.id); return s + p.price * c.q; }, 0);
  document.getElementById("subtotal").textContent = money(sub);
}

function openDrawer(){ document.getElementById("drawer").classList.add("open"); }
function closeDrawer(){ document.getElementById("drawer").classList.remove("open"); }
document.getElementById("cartOpen").onclick = openDrawer;
document.querySelectorAll("[data-close]").forEach(el => el.onclick = () => { closeDrawer(); closeModal(); });

document.getElementById("checkout").onclick = () => {
  if (!cart.length) return toast("Cart is empty");
  openModal(`<h3>Checkout, soon.</h3><p>The storefront is live and cart-ready. Connect Stripe or a high-risk gateway to take payment — every order ships with its matching batch COA.</p><button class="btn btn-ink btn-block" onclick="closeModal()">Got it</button>`);
};

function openCoa(id){
  const p = PRODUCTS.find(x => x.id === id);
  const g = !p;
  const box = document.getElementById("modalBox");
  box.innerHTML = `<h3>Certificate of Analysis</h3><p>${g ? "Sample batch" : p.name + " " + p.mg} · independent third-party lab</p>
    <div class="coa-row"><span>Batch</span><span>${g ? "RV-SAMPLE-0001" : p.batch}</span></div>
    <div class="coa-row"><span>Method</span><span>HPLC + LC-MS</span></div>
    <div class="coa-row"><span>Identity</span><span class="ok">Confirmed</span></div>
    <div class="coa-row"><span>Purity</span><span class="ok">${g ? "99.4%" : p.purity}</span></div>
    <div class="bar"><i style="width:${parseFloat(g ? "99.4" : p.purity)}%"></i></div>
    <div class="coa-row"><span>Appearance</span><span>White lyophilized powder</span></div>
    <div class="coa-row"><span>Storage</span><span>−20°C, dry</span></div>
    <div class="coa-row"><span>Released</span><span>${g ? "2026-05" : "2026-06"}</span></div>
    <button class="btn btn-ink btn-block" style="margin-top:18px" onclick="closeModal()">Close</button>`;
  document.getElementById("modal").classList.add("open");
}
function openModal(html){ document.getElementById("modalBox").innerHTML = html; document.getElementById("modal").classList.add("open"); }
function closeModal(){ document.getElementById("modal").classList.remove("open"); }

render();

/* ---------- peptide library content ---------- */
const INFO = {
  "reta-10": {
    plain:"Three metabolic pathways in one molecule — the most-watched research compound in the category.",
    what:"Retatrutide is a single 39-amino-acid peptide that acts as a triple agonist at the GIP, GLP-1 and glucagon receptors. In published human trials it produced the largest average weight changes of any incretin studied to date, and it remains investigational — no regulatory approval anywhere.",
    human:"Think of it as the successor to Ozempic-era compounds: it engages three appetite-and-energy pathways instead of one or two. Researchers study it for appetite regulation, energy expenditure and blood-sugar markers. Because it is not approved yet, supply is entirely grey-market — which is exactly why prices vary wildly between vendors.",
    may:["Appetite-regulation research","Energy-expenditure studies","Fasting-glucose and A1c marker work","Body-composition protocols"],
    dose:"Studied with slow escalation, typically starting at 1–2 mg weekly.",
    stacks:["bac-10","tirz-10"]},
  "tirz-10": {
    plain:"The dual agonist your doctor already knows — approved in humans, studied relentlessly.",
    what:"Tirzepatide is a 39-amino-acid dual GIP and GLP-1 receptor agonist, approved as a medicine (Mounjaro/Zepbound) and backed by the SURPASS and SURMOUNT trial programs.",
    human:"It hits two incretin pathways at once, which is why its trial results outperformed single-pathway compounds. Most buyers know it by brand name; the research-grade vial is simply the same molecule without the pharmacy markup.",
    may:["Weight-management research","Glycemic-control studies","Lipid-marker work","Appetite signaling"],
    dose:"Studied from 2.5 mg weekly with slow titration.",
    stacks:["bac-10","reta-10"]},
  "sema-5": {
    plain:"The original GLP-1 headline-maker — one pathway, decades of data.",
    what:"Semaglutide is a long-acting GLP-1 receptor agonist (Ozempic/Wegovy) with an extensive published record in glycemic control and weight management.",
    human:"The compound that made GLP-1s a household phrase. One pathway, very well characterized — often the reference point researchers compare newer agonists against.",
    may:["Appetite regulation","Glycemic markers","Cardiometabolic research","Gastric-emptying studies"],
    dose:"Studied from 0.25 mg weekly with gradual titration.",
    stacks:["bac-10"]},
  "bpc-5": {
    plain:"The classic repair peptide — tendons, gut lining, and everything connective.",
    what:"BPC-157 is a synthetic 15-amino-acid fragment of a gastric protein. Animal literature documents accelerated tendon-to-bone healing, fibroblast migration and angiogenesis, plus protective effects on gut lining.",
    human:"If there is a household name in repair research, this is it. The running theory: it promotes new blood-vessel growth and cell migration to injured tissue, which is why it shows up in almost every recovery protocol — joints, gut, soft tissue.",
    may:["Tendon and ligament-repair studies","Gut-lining protection research","Angiogenesis models","Post-injury recovery protocols"],
    dose:"Commonly studied at 200–500 mcg/day, local or systemic.",
    stacks:["tb-5","bac-10"]},
  "tb-5": {
    plain:"The cell-migration peptide — pairs with BPC-157 in nearly every repair stack.",
    what:"TB-500 is a synthetic fragment of Thymosin Beta-4, an actin-binding protein central to cell migration and tissue remodeling. Animal models show improved wound healing and reduced inflammation.",
    human:"Where BPC-157 recruits repair machinery to tissue, TB-500 helps cells actually move and rebuild. They complement each other so well that the combination got its own nickname.",
    may:["Wound-healing studies","Tissue-remodeling research","Inflammation-marker work","Hair and skin-repair models"],
    dose:"Commonly studied at 2–5 mg twice weekly.",
    stacks:["bpc-5","bac-10"]},
  "wolv": {
    plain:"BPC-157 + TB-500 — the combination the community named for itself.",
    what:"A pre-blended ratio of BPC-157 and TB-500, the two most-researched repair peptides, in one vial.",
    human:"The classic repair pairing in a single vial: one recruits repair cells, the other helps them rebuild. Blends exist because researchers kept mixing the same two anyway — we just saved them a step.",
    may:["Full-body repair protocols","Joint and soft-tissue studies","Recovery-window research"],
    dose:"Commonly studied at 0.5–1 ml daily from a reconstituted blend.",
    stacks:["ghk-50","bac-10"]},
  "ghk-50": {
    plain:"The copper peptide — skin, collagen, and gene-expression research staple.",
    what:"GHK-Cu is a natural copper-binding tripeptide. Human studies show it modulates the expression of a large fraction of human genes in fibroblasts, with documented effects on collagen, elastin and wound repair.",
    human:"The skincare-industry darling that earned it: GHK-Cu is one of very few compounds shown in human fibroblast studies to shift hundreds of genes toward a younger expression pattern. Studied topically and systemically.",
    may:["Collagen and elastin research","Wound-repair studies","Skin-remodeling protocols","Hair-follicle models"],
    dose:"Commonly studied at 1–2 mg/day systemic; topical at 0.5–2%.",
    stacks:["glow","bpc-5"]},
  "glow": {
    plain:"GHK-Cu, BPC-157 and TB-500 — the cosmetic-research trifecta.",
    what:"A blend combining the copper peptide GHK-Cu with the repair pair BPC-157/TB-500.",
    human:"Skin quality, repair and recovery addressed from three angles in one vial — the blend behind most 'glow' protocols in the community.",
    may:["Skin-quality research","Collagen-remodeling studies","Recovery protocols"],
    dose:"Commonly studied at 0.5–1 ml daily, reconstituted.",
    stacks:["ghk-50","bac-10"]},
  "klow": {
    plain:"GHK-Cu, KPV, BPC-157, TB-500 — the full cosmetic-plus-repair stack.",
    what:"A four-compound blend: GHK-Cu (copper peptide), KPV (an anti-inflammatory tripeptide fragment of alpha-MSH), plus BPC-157 and TB-500.",
    human:"The everything blend: GHK-Cu for skin remodeling, KPV for calming inflammatory signaling, and the repair pair underneath. The one vial people reach for when they want the whole protocol at once.",
    may:["Inflammatory-skin research","Repair and recovery studies","Cosmetic-remodeling protocols"],
    dose:"Commonly studied at 0.5–1 ml daily, reconstituted.",
    stacks:["glow","bpc-5"]},
  "mots-10": {
    plain:"The mitochondrial peptide — studied as an 'exercise in a vial' signal.",
    what:"MOTS-c is a mitochondrial-derived peptide of 16 amino acids that activates AMPK pathways and regulates metabolic homeostasis. Animal studies show exercise-mimetic effects on muscle and glucose handling.",
    human:"Encoded not in the nucleus but in the mitochondria itself — a genuine oddity. Research focuses on whether it can reproduce some of exercise's metabolic signaling, which is why endurance and longevity researchers watch it closely.",
    may:["Mitochondrial-function research","Glucose-metabolism studies","Endurance-model protocols","Longevity research"],
    dose:"Commonly studied at 5–10 mg, 2–3x weekly.",
    stacks:["slu-5","epi-10"]},
  "aod-5": {
    plain:"The fat-metabolism fragment — growth hormone's lipolytic slice, nothing else.",
    what:"AOD-9604 is a fragment of human growth hormone (hGH 177–191) that retains lipolytic and anti-lipogenic activity without the growth or insulin-like effects of full GH.",
    human:"Researchers isolated the one part of growth hormone that signals fat cells to release stores — and nothing else. Studied for body composition without the GH side-effect profile.",
    may:["Lipolysis research","Body-composition studies","Metabolic-rate protocols"],
    dose:"Commonly studied at 250–500 mcg daily.",
    stacks:["5a1mq-50","bac-10"]},
  "5a1mq-50": {
    plain:"The NNMT inhibitor — studied for fat-cell metabolism at the enzyme level.",
    what:"5-Amino-1MQ is a small-molecule inhibitor of nicotinamide N-methyltransferase (NNMT), an enzyme highly active in white fat tissue. Inhibiting it raises intracellular NAD+ and SAM in adipocytes, which animal studies link to reduced fat-cell size.",
    human:"It works on the enzyme that keeps white fat cells storing rather than burning. Not a peptide in the strict sense, but a fixture of metabolic-research stacks for exactly that reason.",
    may:["Adipocyte-metabolism research","NAD+ pathway studies","Body-composition protocols"],
    dose:"Commonly studied at 50–100 mg daily, oral or injectable routes.",
    stacks:["aod-5","slu-5"]},
  "slu-5": {
    plain:"The newest exercise-mimetic — ERR agonist research, barely out of the lab.",
    what:"SLU-PP-332 is a small-molecule agonist of estrogen-related receptors (ERRα/β/γ) that mimics the transcriptional effects of endurance exercise. Early animal data shows increased energy expenditure and improved fitness markers.",
    human:"The 'we just discovered this one' compound — it flips on the gene programs endurance exercise turns on. Very new, very scarce, and the reason it keeps selling out in research circles.",
    may:["Exercise-mimetic studies","Mitochondrial-biogenesis research","Metabolic-rate protocols"],
    dose:"Emerging research; early protocols at low daily doses.",
    stacks:["mots-10","5a1mq-50"]},
  "epi-10": {
    plain:"The pineal tetrapeptide — telomere and longevity research's quiet icon.",
    what:"Epitalon (Ala-Glu-Asp-Gly) is a synthetic tetrapeptide modeled on epithalamin, a pineal-gland extract. Studies in cell cultures and animals report telomerase activation in somatic cells and melatonin-regulation effects.",
    human:"The longevity compound people cite when they talk about telomeres — the caps on DNA that shorten with age. Research claims are early-stage, but its place in longevity protocols is firmly established.",
    may:["Telomerase-activation research","Melatonin-regulation studies","Longevity protocols","Pineal-function research"],
    dose:"Commonly studied at 5–10 mg/day for 10–20 day courses.",
    stacks:["mots-10","epi-10"]},
  "selank-10": {
    plain:"The calm-focus peptide — anxiolytic research without sedation.",
    what:"Selank is a heptapeptide analog of the human immunoglobulin tuftsin fragment, developed in Russia. Research documents anxiolytic effects alongside BDNF and serotonin-system modulation, without sedation or dependence findings.",
    human:"Studied for steadying mood and sharpening attention at the same time — the combination that made it a nootropic-community staple. Russian clinical use is extensive; Western research is catching up.",
    may:["Anxiety-model research","Attention and focus studies","BDNF-expression work","Immune-modulation research"],
    dose:"Commonly studied at 200–900 mcg intranasally, daily or as needed.",
    stacks:["semax-10"]},
  "semax-10": {
    plain:"Selank's sharper sibling — studied for focus and cognitive drive.",
    what:"Semax is a heptapeptide analog of ACTH(4–10). Russian research documents nootropic and neuroprotective effects, including BDNF upregulation and dopaminergic/serotonergic modulation.",
    human:"Where Selank calms, Semax drives — studied for concentration, mental stamina and cognitive resilience. The two are often researched side by side.",
    may:["Focus and attention research","BDNF-expression studies","Neuroprotection models","Stroke-recovery research (RU)"],
    dose:"Commonly studied at 0.1–1 mg intranasally, daily.",
    stacks:["selank-10"]},
  "cjc-ipa": {
    plain:"The GH-pulse pair — signal, don't replace.",
    what:"A blend of CJC-1295 (a GHRH analog) and Ipamorelin (a selective ghrelin mimetic), studied together for pulsatile growth-hormone release without cortisol or prolactin elevation.",
    human:"Two peptides, one goal: prompt the pituitary to release growth hormone in natural pulses rather than flooding the system. The classic 'heal and recover' pairing for body-composition and recovery research.",
    may:["Growth-hormone-pulse research","Body-composition studies","Recovery and sleep-quality research"],
    dose:"Commonly studied at 100–200 mcg each, 1–2x daily.",
    stacks:["tesa-10","bac-10"]},
  "tesa-10": {
    plain:"The visceral-fat GHRH analog — human-approved for a niche, studied widely beyond it.",
    what:"Tesamorelin is a stabilized GHRH analog approved (as Egrifta) for HIV-associated lipodystrophy. Research documents reductions in visceral adipose tissue via growth-hormone signaling.",
    human:"The most human-data-backed compound in the GH category. Studied primarily for visceral (deep abdominal) fat, which is the metabolically active kind.",
    may:["Visceral-fat research","Body-composition studies","GH-axis research"],
    dose:"Commonly studied at 1–2 mg daily.",
    stacks:["cjc-ipa","bac-10"]},
  "bac-10": {
    plain:"Bacteriostatic water — the solvent every vial needs.",
    what:"Sterile water with 0.9% benzyl alcohol, which inhibits bacterial growth after the vial is punctured, allowing multi-use draws.",
    human:"Not exciting, strictly necessary. Lyophilized peptides are powder; this is what turns them into a researchable solution. One 10 ml vial handles a full research cycle.",
    may:["Reconstitution for all injectable research"],
    dose:"Use per protocol; discard 28 days after first puncture.",
    stacks:[]}
};

/* ---------- detail + library rendering ---------- */
function findProduct(id){ return PRODUCTS.find(p => p.id === id); }
const CATEGORY_ORDER = ["Metabolic","Recovery","Skin / Repairs","Cosmetic","Cognitive","Longevity","Growth","Supply"];
