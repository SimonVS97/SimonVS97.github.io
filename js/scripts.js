const pokemonRepository=function(){let e=[],t='https://pokeapi.co/api/v2/pokemon/?limit=150';function n(t){t.name&&t.detailsUrl?e.push(t):console.log('Pokemon is not correct!')}function o(e){let t=document.querySelector('ul'),n=document.createElement('li');n.classList.add('col-lg-2','col-md-4','col-12');let o=document.createElement('button');o.innerText=e.name,o.addEventListener('click',t=>{!function(e){l(e).then(()=>{!function(e){let t=document.querySelector('.modal-body'),n=document.querySelector('.modal-title');t.innerHTML='',n.innerHTML='';let o=document.createElement('h1');o.innerText=e.name;let l=document.createElement('img');l.classList.add('modal-img,mx-auto'),l.setAttribute('src',e.svgUrl);let a=document.createElement('p');a.classList.add('ml-4,mt-3,mb-0'),a.innerText='Height: '+e.height;let r=document.createElement('p');r.classList.add('ml-4,mb-0'),r.innerText='Weight: '+e.weight,n.append(o),t.append(l),t.append(a),t.append(r)}(e)})}(e),t.target.blur()}),o.classList.add('buttonStyle'),o.setAttribute('data-toggle','modal'),o.setAttribute('data-target','.modal'),n.appendChild(o),t.appendChild(n)}function l(e){let t=e.detailsUrl;return fetch(t).then(e=>e.json()).then(t=>{e.weight=t.weight,e.imageUrl=t.sprites.front_default,e.svgUrl=t.sprites.other.dream_world.front_default,e.height=t.height;let n=[];t.types.forEach(e=>n.push(e.type.name)),e.types=n}).catch(e=>console.log(e))}return document.querySelector('input').addEventListener('input',function(t){let n=t.target.value;console.log(''+t.target.value),console.log(typeof t.target.value),console.log(e);let l=e.filter(e=>String(e.name).includes(n));console.log(l),document.querySelector('ul').innerHTML='',l.forEach(function(e){o(e)})}),{getAll:function(){return e},add:n,loadList:function(){return fetch(t).then(e=>e.json()).then(e=>{e.results.forEach(e=>{n({name:e.name,detailsUrl:e.url})})}).catch(e=>console.log(e))},loadDetails:l,addListItem:o}}();pokemonRepository.loadList().then(()=>{pokemonRepository.getAll().forEach(e=>{pokemonRepository.addListItem(e)})});