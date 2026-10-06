
document.addEventListener("DOMContentLoaded", () => {
  const path = location.pathname.replaceAll("\\","/");
  document.querySelectorAll(".nav-links a").forEach(a=>{
    const href=a.getAttribute("href")||"";
    const full=new URL(href,location.href).pathname;
    if(full===path || (path.endsWith("/")&&full.endsWith("/index.html"))) a.classList.add("active");
  });

  const menu=document.querySelector("[data-menu]"), links=document.querySelector(".nav-links");
  if(menu&&links){menu.addEventListener("click",()=>links.classList.toggle("open"));links.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>links.classList.remove("open")))}

  const typing=document.querySelector("[data-typing]");
  if(typing){
    const words=["Full Stack Developer","Backend Developer","Web Developer","JavaScript Developer"];
    let wi=0,ci=0,deleting=false;
    const tick=()=>{
      const word=words[wi];
      typing.textContent=word.slice(0,deleting?ci-1:ci);
      ci+=deleting?-1:1;
      if(!deleting&&ci===word.length){deleting=true;setTimeout(tick,1200);return}
      if(deleting&&ci===0){deleting=false;wi=(wi+1)%words.length;setTimeout(tick,350);return}
      setTimeout(tick,deleting?45:75);
    };tick();
  }

  const glow=document.getElementById("cursor-glow");
  if(glow) window.addEventListener("pointermove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"},{passive:true});

  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");io.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

  document.querySelectorAll("[data-tilt]").forEach(card=>{
    const inner=card.querySelector(".project-inner"); if(!inner)return;
    card.addEventListener("pointermove",e=>{
      if(inner.clientWidth<800)return;
      const r=card.getBoundingClientRect(),x=((e.clientX-r.left)/r.width-.5)*12,y=((e.clientY-r.top)/r.height-.5)*-10;
      inner.style.transform=`rotateY(${x}deg) rotateX(${y}deg) translateY(-2px)`;
    });
    card.addEventListener("pointerleave",()=>inner.style.transform="");
  });

  const top=document.querySelector(".scroll-top");
  if(top){const onScroll=()=>top.classList.toggle("show",window.scrollY>500);onScroll();window.addEventListener("scroll",onScroll,{passive:true});top.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}))}

  const form=document.querySelector("[data-contact-form]"),toast=document.querySelector(".toast");
  const showToast=m=>{if(!toast)return;toast.textContent=m;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2600)};
  if(form)form.addEventListener("submit",e=>{
    e.preventDefault();
    const name=(form.querySelector('[name="name"]')?.value||"").trim();
    const email=(form.querySelector('[name="email"]')?.value||"").trim();
    const topic=(form.querySelector('[name="topic"]')?.value||"Portfolio inquiry").trim();
    const message=(form.querySelector('[name="message"]')?.value||"").trim();
    const subject=encodeURIComponent(`[Portfolio] ${topic} - ${name}`);
    const body=encodeURIComponent(
      `Hello Abhishek Kumar Rana,\n\n${message}\n\nSender: ${name}\nEmail: ${email}\n\nSent from your portfolio contact form.`
    );
    const gmail=`https://mail.google.com/mail/?view=cm&fs=1&to=abhishek.krrana810200@gmail.com&su=${subject}&body=${body}`;
    window.open(gmail,"_blank","noopener");
    showToast("Gmail Compose opened — review and send your message.");
  });
  // Copy contact email
  document.querySelectorAll("[data-copy]").forEach(btn=>{
    btn.addEventListener("click",async()=>{
      const value=btn.getAttribute("data-copy")||"";
      try{await navigator.clipboard.writeText(value);btn.textContent="Copied!";}
      catch{btn.textContent="Copy manually";}
      setTimeout(()=>btn.textContent="Copy",1600);
    });
  });

});
