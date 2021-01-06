/*****************
      MODELO
*****************/
function load() {
    var busqueda="https://api.atlasacademy.io/export/NA/nice_servant.json";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var servants=JSON.parse(this.response);
        for(var i=0;i<servants.length;i++){
          vControler(servants[i]);
        }
      }
    };
    xhttp.open("GET", busqueda, true);
    xhttp.send();
}
function filtrar(filtro) {
  filtro=filtro.value
  var busqueda="https://api.atlasacademy.io/export/NA/nice_servant.json";
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var servants=JSON.parse(this.response);
      for(var i=0;i<servants.length;i++){
        if(servants[i].name.toUpperCase().includes(filtro.toUpperCase())){
          //vControler(servants[i]);
          if(document.getElementById("all").checked == false && document.getElementById("other").checked == false){
            if(servants[i].className==clase()){
              vControler(servants[i]);
            }
          }else{
            if(document.getElementById("all").checked == true){
              vControler(servants[i]);
            }
            if(document.getElementById("other").checked == true){
              if(servants[i].className!="saber" && servants[i].className!="archer" && servants[i].className!="lancer" && servants[i].className!="rider" && servants[i].className!="caster" && servants[i].className!="assassin"){
                vControler(servants[i]);
              }
            }
          }
        }
      }
    }
  };
  xhttp.open("GET", busqueda, true);
  xhttp.send();
}

function clase(){
  if(document.getElementById("saber").checked == true){
    return "saber";
  }
  if(document.getElementById("lancer").checked == true){
    return "lancer";
  }
  if(document.getElementById("archer").checked == true){
    return "archer";
  }
  if(document.getElementById("caster").checked == true){
    return "caster";
  }
  if(document.getElementById("rider").checked == true){
    return "rider";
  }
  if(document.getElementById("assassin").checked == true){
    return "assassin";
  }
}
/*****************
      VISTA
*****************/
function visualizar(servant){
  var div=document.createElement("div");
  div.style.display="flex";
  div.style.flexDirection="column";
  div.style.margin="40px";
  div.style.borderRadius="30px";
  div.style.border="solid 1px white";
  div.style.height="fit-content";
  div.style.width="15%";
  div.style.boxSizing="border-box";
  
  var image=document.createElement("img");
  if(servant.extraAssets.charaGraph.ascension[3]){
    image.src=servant.extraAssets.charaGraph.ascension[3];
  }else{
    image.src=servant.extraAssets.charaGraph.ascension[0];
  }
  
  image.style.padding="30px";
  image.style.margin="5px";
  image.style.height="300px";
  image.style.paddingBottom="5px";
  var nombre=document.createElement("p");
  nombre.innerText=servant.name;
  nombre.style.textAlign="center";
  nombre.style.color="azure";
  nombre.style.width="70%";
  nombre.style.margin="auto";
  nombre.style.marginBottom="20px";
  nombre.style.marginTop="20px";
  //appends
  div.appendChild(image);
  div.appendChild(nombre);
  div.addEventListener("click",function(){mostrarDatos(servant)});
  document.getElementById("padre").append(div);
}

function mostrarDatos(servant){
  if(document.getElementById("datos"))document.getElementById("datos").remove();
  let div=document.createElement("div");
  div.style.backgroundColor="#FFFFD0";
  div.style.borderRadius="20px";
  div.style.zIndex=1;
  div.tabIndex=0;
  div.style.alignSelf="center";
  div.style.width="40%";
  div.style.marginLeft="20%";
  div.style.marginRight="20%";
  div.setAttribute("id","datos");
  div.addEventListener("focusout",function(){if(document.getElementById("datos"))document.getElementById("datos").remove();});
  //table
  let corpo=document.createElement("div");
  let header=document.createElement("header");
  let footer=document.createElement("footer");
  let pId=document.createElement("p");
  let pClass=document.createElement("p");
  let pCards=document.createElement("p");
  let divMagenes=document.createElement("div");
  divMagenes.style.display="flex";
  divMagenes.style.justifyContent="center";
  
  for (var img=0;img<=4;img++){
    let ig=document.createElement("img");
    ig.style.width="100px";
    ig.style.border="solid 1px";
    ig.style.margin="5px";
    ig.src=servant.extraAssets.charaGraph.ascension[img];
    if(servant.extraAssets.charaGraph.ascension[img])divMagenes.append(ig); 
  }
  let pNp=document.createElement("p");
  pNp.innerText="----- Noble Phantasm -----";
  pNp.style.fontWeight="bold";
  let np=document.createElement("div");
  np.style.display="flex";
  np.style.justifyContent="center";
  np.style.marginBottom="15px";
  let npCard=document.createElement("img");
  if(servant.name!="Tiamat"){
    switch(servant.noblePhantasms[servant.noblePhantasms.length-1].card){
      case "buster": npCard.src="./images/busterB.png";break;
      case "quick":npCard.src="./images/quickB.png";break;
      case "arts":npCard.src="./images/artsB.png";
    }
  }

  let imgNp=document.createElement("img");
  npCard.style.width="130px";
  imgNp.style.width="100px";
  imgNp.style.position="absolute";
  imgNp.style.zIndex="4";
  let pGender=document.createElement("p");
  header.innerText=servant.name;
  pId.innerText="Id: "+servant.id;
  pClass.innerText="Class: "+servant.className;
  pGender.innerText="Gender: "+servant.gender;
  if(servant.name!="Tiamat" && servant.name!="Goetia"&&servant.name!="Solomon"&&servant.name!="Beast III/R" )imgNp.src=imgNp.src=servant.noblePhantasms[servant.noblePhantasms.length-1].icon;
  //el NP de los servants eliminados en la linea de arriba no tiene la imagen en la api
  for (var card=0;card<=4;card++){
    var cartaimg=document.createElement("img");
    if(servant.cards[card]=="quick"){
      cartaimg.src="./images/Quick.png";
    }
    if(servant.cards[card]=="arts"){
      cartaimg.src="./images/Arts.png";
    }
    if(servant.cards[card]=="buster"){
      cartaimg.src="./images/Buster.png";
    }
    pCards.append(cartaimg); 
  }
  np.append(npCard);
  np.append(imgNp);
  let skills=document.createElement("div");
  skills.style.display="grid";
  skills.style.gridTemplateColumns="0.40fr 0.25fr 1fr";
  skills.style.gap="5px";
  let pSkills=document.createElement("p");
  pSkills.innerText="---------- Skills ----------";
  pSkills.style.fontWeight="bold";
  for(var skil=0;skil<=servant.skills.length;skil++){
    if(servant.skills[skil]){
      let sK=document.createElement("p");
      sK.innerText=servant.skills[skil].name;
      sK.style.textAlign="right";
      sK.style.marginTop="auto";
      sK.style.marginBottom="auto";
      sK.style.fontWeight="bold";
      let detail=document.createElement("p");
      detail.innerText=servant.skills[skil].detail;
      detail.style.textAlign="left";
      detail.style.marginTop="auto";
      detail.style.marginBottom="auto";
      let skImg=document.createElement("img");
      skImg.src=servant.skills[skil].icon;
      skImg.style.width="20px";
      skImg.style.marginLeft="20px";
      skImg.style.marginTop="auto";
      skImg.style.marginBottom="auto";
      skills.append(sK);skills.append(skImg);skills.append(detail);
    }
    
  }
  
  //appends
  corpo.append(pId);
  corpo.append(divMagenes);
  corpo.append(pClass);
  corpo.append(pCards);
  corpo.append(pGender);
  corpo.append(pSkills);
  corpo.append(skills);
  corpo.append(pNp);
  corpo.append(np);
  div.append(header);
  div.append(corpo);
  div.append(footer);
  document.getElementById("padre").appendChild(div);
  div.focus();
}
/*****************
   CONTROLADOR
*****************/
function vControler(servant){
  visualizar(servant);
}
function initialize(){
  document.getElementById("lupa").addEventListener("click",function(){document.getElementById("padre").innerHTML="";filtrar(document.getElementById("busqueda"))});
  document.getElementById("all").checked=true;
  document.addEventListener("keydown",function(event){if (event.key === "Enter")document.getElementById("lupa").click();})
  load();
}
/*---------------------------------------------------------------------------------------------*/
initialize();