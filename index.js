import{a as l,S as d,i as c}from"./assets/vendor-DXaqCXe3.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();const p="https://pixabay.com/api/",u="49405379-236235770e28cb9bd374c0ae0",m=async r=>{var t,a;const s={key:u,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0};try{return(await l.get(p,{params:s})).data}catch(e){throw new Error(((a=(t=e.response)==null?void 0:t.data)==null?void 0:a.message)||"Failed to fetch images")}},f=({largeImageURL:r,webformatURL:s,tags:t,likes:a,views:e,comments:o,downloads:i})=>`
    <li class="gallery-item">
      <a href="${r}">
        <img src="${s}" alt="${t}">
        <div class="info">
          <div><p>Likes:</p> ${a}</div>
          <div><p>Views:</p> ${e}</div>
          <div><p>Comments:</p> ${o}</div>
          <div><p>Downloads:</p> ${i}</div>
        </div>
      </a>
    </li>
  `,g=(r,s)=>{const t=r.map(e=>f(e)).join("");s.innerHTML=t,new d(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}).refresh()},h=r=>{r.classList.remove("hidden")},y=r=>{r.classList.add("hidden")},v=r=>{r.innerHTML=""},n={form:document.querySelector(".form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader")};n.form.addEventListener("submit",L);async function L(r){r.preventDefault();const s=r.target.elements["search-text"].value.trim();if(!s){c.error({title:"Error",message:"Input cannot be empty!",color:"#ef4040",position:"topRight"});return}h(n.loader),v(n.gallery);try{const t=await m(s);if(t.hits.length===0){c.warning({title:"Caution",message:"Sorry, there are no images matching your search query. Please try again!",color:"#ffa000",position:"topRight"});return}g(t.hits,n.gallery)}catch(t){c.error({message:t.message,color:"#ef4040",position:"topRight"})}finally{y(n.loader)}}
//# sourceMappingURL=index.js.map
