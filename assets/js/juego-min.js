(()=>{"use strict";const e=["C","D","H","S"],t=["A","J","Q","K"],a=document.querySelectorAll(".divCartas");let r=[],n=document.querySelectorAll("small"),l=document.querySelector("#btnDetener"),s=document.querySelector("#btnNuevo"),o=document.querySelector("#btnPedir"),c=[];const d=()=>{r=[];for(let t=2;t<=10;t++)for(let a of e)r.push(t+a);for(let a of e)for(let e of t)r.push(e+a);return _.shuffle(r)},i=()=>{if(0===r.length)throw"No hay carytas en el deck";return r.pop()},u=(e,t)=>(c[t]=c[t]+(e=>{const t=e.substring(0,e.length-1);return isNaN(t)?"A"===t?11:20:1*t})(e),n[t].innerText=c[t],c[t]),f=(e,t)=>{const r=document.createElement("img");r.src=`assets/cartas/${e}.png`,r.classList.add("carta"),a[t].append(r)},b=e=>{let t=0;do{const a=i();if(t=u(a,c.length-1),f(a,c.length-1),e>21)break;if(21===e)break}while(t<e&&e<=21);setTimeout(()=>{(()=>{const[e,t]=c;setTimeout(()=>{t===e?alert("Nadie gana "):e>21?alert("La computadora gana "):t>21||21===e?alert("Ganaste"):alert("La computadora gana")},20)})()},20)};o.addEventListener("click",()=>{const e=i(),t=u(e,0);f(e,0),t>21?(console.warn("Perdiste"),b(t),o.disabled=!0,l.disabled=!0):21===t&&(console.warn("21, ganaste"),b(t),l.disabled=!0,o.disabled=!0)}),l.addEventListener("click",()=>{o.disabled=!0,l.disabled=!0,b(c[0])}),s.addEventListener("click",()=>{console.clear(),((e=2)=>{c=[],r=[],r=d();for(let t=0;t<e;t++)c.push(0);n.forEach(e=>e.innerText=0),a.forEach(e=>e.innerHTML=""),o.disabled=!1,l.disabled=!1})()})})();