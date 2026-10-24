/* Universidad William Osler - corregir visualización de audiovisuales Clase 01 */
(() => {
  const holder = document.getElementById('resourceList');
  if (!holder) return;
  const types = ['video', 'audio', 'infografia', 'tarjetas'];
  const labels = {video:'Video académico',audio:'Audio académico',infografia:'Infografía',tarjetas:'Tarjetas didácticas'};
  const status = document.createElement('p');
  status.id='mediaLoadStatus';status.setAttribute('role','status');
  holder.before(status);
  function element(tag,text){const e=document.createElement(tag); if(text)e.textContent=text;return e;}
  function player(url,type){
    try {
      const u=new URL(url,location.href);
      if(!['https:','http:'].includes(u.protocol))return null;
      const host=u.hostname.toLowerCase();
      if(host==='drive.google.com'){
        const id=u.pathname.match(/\/file\/d\/([\w-]+)/)?.[1]||u.searchParams.get('id');
        if(id){const f=element('iframe');f.src=`https://drive.google.com/file/d/${encodeURIComponent(id)}/preview`;f.title=labels[type];f.loading='lazy';f.referrerPolicy='strict-origin-when-cross-origin';f.allow='autoplay; fullscreen';f.style.cssText='width:100%;min-height:340px;border:0;border-radius:12px;margin-top:12px';return f;}
      }
      if(type==='audio' && /\.mp3$|\.m4a$|\.ogg$/i.test(u.pathname)){const a=element('audio');a.controls=true;a.preload='none';a.src=url;a.style.width='100%';return a;}
      if(type==='infografia' && /\.(png|jpe?g|webp|gif)$/i.test(u.pathname)){const img=element('img');img.src=url;img.alt=labels[type];img.loading='lazy';img.style.cssText='max-width:100%;height:auto;border-radius:10px;margin-top:12px';return img;}
      if(host==='youtu.be'||host==='youtube.com'||host==='www.youtube.com'){
        const id=host==='youtu.be'?u.pathname.slice(1):u.searchParams.get('v');
        if(id&&/^[\w-]{11}$/.test(id)){const f=element('iframe');f.src=`https://www.youtube-nocookie.com/embed/${id}`;f.title=labels[type];f.allowFullscreen=true;f.loading='lazy';f.style.cssText='width:100%;aspect-ratio:16/9;border:0;border-radius:12px;margin-top:12px';return f;}
      }
    }catch(e){console.warn('URL multimedia no válida',e);}
    return null;
  }
  async function load(){
    status.textContent='Cargando audiovisuales…';
    try{
      const src=new URL('../recursos.json',location.href);src.searchParams.set('v','medios20261023');
      const response=await fetch(src.href,{cache:'no-store'});
      if(!response.ok)throw Error('HTTP '+response.status);
      const json=await response.json(); const resources=json.clase_01;
      if(!resources || typeof resources!=='object')throw Error('No existe el objeto clase_01');
      holder.replaceChildren();
      for(const type of types){
        const item=resources[type]||{};const card=element('article');card.className='resource';
        card.append(element('h3',item.titulo||labels[type]));
        if(item.nota)card.append(element('p',item.nota));
        const url=(item.url||'').trim();
        if(url){
          const a=element('a','Abrir '+labels[type]+' ↗');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.style.cssText='display:inline-block;padding:10px 14px;margin:6px 0 10px;border-radius:9px;background:#133c5c;color:white;font-weight:600;text-decoration:none';card.append(a);
          const embedded=player(url,type);if(embedded)card.append(embedded);
          else card.append(element('p','Este recurso se abre en una pestaña nueva. NotebookLM no ofrece incrustación pública universal.'));
        }else card.append(element('p','Recurso pendiente de configurar en recursos.json'));
        holder.append(card);
      }
      status.textContent='Recursos audiovisuales cargados: '+types.filter(t=>resources[t]?.url).length+' de '+types.length+'.';
    }catch(e){
      holder.replaceChildren();status.textContent='No se pudieron cargar los audiovisuales: '+e.message+'. Verifique que recursos.json exista en la raíz del repositorio y sea JSON válido.';
      console.error('Error recursos audiovisuales',e);
    }
  }
  load();
})();
