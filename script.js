// =====================================================
// CONFIGURAÇÃO DO WHATSAPP
// Troque SOMENTE o número abaixo pelo seu número.
// Formato: código do país + DDD + número, sem +, espaços ou símbolos.
// Exemplo Brasil: 5519999999999
// =====================================================
const WHATSAPP_NUMBER = "SEU_NUMERO_AQUI";

const products = window.PRODUCTS || [];
let cart = JSON.parse(localStorage.getItem("cartPerfumes") || "[]");

const money = v => v.toLocaleString("pt-BR", {style:"currency", currency:"BRL"});

function save(){ localStorage.setItem("cartPerfumes", JSON.stringify(cart)); updateCount(); }
function updateCount(){
  document.getElementById("cartCount").textContent = cart.reduce((s,i)=>s+i.qty,0);
}
function add(id){
  const p = products.find(x=>x.id===id);
  const item = cart.find(x=>x.id===id);
  if(item) item.qty++;
  else cart.push({id:p.id, qty:1});
  save();
  renderCart();
}
function change(id,delta){
  const item=cart.find(x=>x.id===id);
  if(!item)return;
  item.qty += delta;
  if(item.qty<=0) cart=cart.filter(x=>x.id!==id);
  save(); renderCart();
}
function removeItem(id){cart=cart.filter(x=>x.id!==id);save();renderCart()}

function renderProducts(filter="Todos"){
  const list=document.getElementById("products");
  const filtered=filter==="Todos"?products:products.filter(p=>p.category===filter);
  list.innerHTML=filtered.map(p=>`
    <article class="product">
      <div class="product-image"><img class="product-photo" src="${p.image}" alt="${p.name} — ${p.brand}" loading="lazy"></div>
      <div class="product-body">
        <div class="brand">${p.brand} • ${p.category}</div>
        <h3>${p.name}</h3>
        <div class="profile">${p.profile}</div>
        <div class="price">${money(p.price)}</div>
        <button class="btn add" onclick="add(${p.id})">Adicionar à compra</button>
      </div>
    </article>`).join("");
}
function renderCart(){
  const box=document.getElementById("cartItems");
  if(!cart.length){
    box.innerHTML='<p style="color:#999;padding:25px 0">Sua compra está vazia. Escolha uma fragrância para começar.</p>';
  }else{
    box.innerHTML=cart.map(i=>{
      const p=products.find(x=>x.id===i.id);
      return `<div class="cart-row">
        <div><h4>${p.name}</h4><small>${p.brand} • ${money(p.price)}</small></div>
        <div class="qty"><button onclick="change(${p.id},-1)">−</button><b>${i.qty}</b><button onclick="change(${p.id},1)">+</button></div>
        <button class="remove" onclick="removeItem(${p.id})">Excluir</button>
      </div>`;
    }).join("");
  }
  const total=cart.reduce((s,i)=>s+(products.find(p=>p.id===i.id).price*i.qty),0);
  document.getElementById("cartTotal").textContent=money(total);
}
function openCart(){document.getElementById("cartModal").classList.add("open")}
function closeCart(){document.getElementById("cartModal").classList.remove("open")}

document.getElementById("filters").addEventListener("click",e=>{
  if(e.target.tagName!=="BUTTON")return;
  document.querySelectorAll("#filters button").forEach(b=>b.classList.remove("active"));
  e.target.classList.add("active"); renderProducts(e.target.dataset.filter);
});
document.getElementById("openCart").onclick=openCart;
document.getElementById("closeCart").onclick=closeCart;
document.getElementById("cartModal").addEventListener("click",e=>{if(e.target.id==="cartModal")closeCart()});

document.getElementById("whatsappBtn").onclick=()=>{
  if(!cart.length){alert("Adicione pelo menos um perfume à compra.");return;}
  if(WHATSAPP_NUMBER==="SEU_NUMERO_AQUI"){alert("Configure o número do WhatsApp no arquivo script.js antes de publicar.");return;}
  const name=document.getElementById("customerName").value.trim();
  const note=document.getElementById("customerNote").value.trim();
  const lines=cart.map(i=>{const p=products.find(x=>x.id===i.id);return `• ${p.name} (${p.brand}) — ${i.qty}x — ${money(p.price*i.qty)}`});
  const total=cart.reduce((s,i)=>s+products.find(p=>p.id===i.id).price*i.qty,0);
  let msg=`Olá! Quero fazer um pedido de perfumes.%0A%0A${lines.join("%0A")}%0A%0ATotal: ${money(total)}`;
  if(name)msg+=`%0ANome: ${encodeURIComponent(name)}`;
  if(note)msg+=`%0AObservação: ${encodeURIComponent(note)}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`,"_blank");
};

renderProducts(); renderCart(); updateCount();
