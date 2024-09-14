const products = [
  {
    "ref": "P001",
    "libelle": "Smartphone X",
    "qte": 50,
    "prix": 699.99,
    "reduction": 10,
    "img": "img/smartphone.jpeg",
    "description": "A high-end smartphone with a 6.5-inch OLED display, 128GB storage, and a powerful camera."
  },
  {
    "ref": "P002",
    "libelle": "Laptop Pro",
    "qte": 30,
    "prix": 1299.99,
    "reduction": 0,
    "img": "img/laptop.jpeg",
    "description": "A sleek laptop with 16GB RAM, 512GB SSD, and a 15-inch Retina display, perfect for professionals."
  },
  {
    "ref": "P003",
    "libelle": "Wireless Headphones",
    "qte": 100,
    "prix": 199.99,
    "reduction": 15,
    "img": "img/wirlessHeadphones.jpeg",
    "description": "Noise-canceling wireless headphones with 30-hour battery life and excellent sound quality."
  },
  {
    "ref": "P004",
    "libelle": "Smartwatch Z",
    "qte": 75,
    "prix": 249.99,
    "reduction": 0,
    "img": "img/smartwatch.jpeg",
    "description": "A stylish smartwatch with heart rate monitoring, GPS tracking, and a 1.4-inch AMOLED screen."
  },
  {
    "ref": "P005",
    "libelle": "Tablet A",
    "qte": 40,
    "prix": 499.99,
    "reduction": 8,
    "img": "img/tablet.jpeg",
    "description": "A lightweight tablet with a 10-inch HD display, 64GB storage, and long battery life."
  },
  {
    "ref": "P006",
    "libelle": "Gaming Console Y",
    "qte": 25,
    "prix": 399.99,
    "reduction": 12,
    "img": "img/gamingConsole.jpeg",
    "description": "A next-gen gaming console with ultra-fast processing and support for 4K gaming."
  }
];
function loadData(productTable)
{
  productTable.forEach((product)=>{
    const container = document.createElement('div') ;
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'buttonContainer' ;
    var details = document.createElement('button') ;
    var buy = document.createElement('button') ;
    buy.id ='buy' ;
    buy.title = 'Add to cart'
    buy.innerHTML = '<i class="fa fa-shopping-cart" style="font-size:24px"></i>'
    details.textContent = 'Details' ;
    details.id = 'details' ;
    buttonContainer.appendChild(details) ;

    buttonContainer.appendChild(buy) ;
    container.id='card'
    var Image = document.createElement('img') ;
    var title = document.createElement('h3') ; 
    var qte = document.createElement('p') ;
    var prix = document.createElement('p') ;
    const qtePrix = document.createElement('div');
    const hr = document.createElement('hr') ;
    hr.id = 'hr'
    hr.height = 15
    qtePrix.id = 'qtePrix' 
    qtePrix.appendChild(qte) ;qtePrix.appendChild(hr) ; qtePrix.appendChild(prix) ;
    var description = document.createElement('p') ; 
    Image.src = product.img ;
    Image.width=200 ;
    Image.height =200
    title.innerHTML = product.libelle.length>12?product.libelle.slice(0,12)+'...'+'<hr>':product.libelle+'<hr>' ;   ; 
    qte.innerHTML = `<b>Quantite</b> :${product.qte}` ;
    prix.innerHTML =`<b>Prix</b> : ${product.reduction!=0?(product.prix - (product.prix*product.reduction/100).toFixed(2))+`<del>${product.prix}</del>`: product.prix}   `;
    description.innerHTML =  `<b>Description</b> : <br> ${product.description.length>75?product.description.slice(0,75)+'...':product.description}` ; 
    const htmlObjects = [Image,title,qtePrix,description,buttonContainer] ;
    for(let elt of htmlObjects)
    {
      container.appendChild(elt);
    }
    document.getElementById('productContainer').appendChild(container)
    
  })
}
document.body.onload=loadData(products) ;

const productContainer = document.getElementById('productContainer') ; 
var check = true ; 

const orderByPrice = ()=>{
  var orderByPrice = products.sort((a,b)=>b.prix-a.prix);
  if(check){
    productContainer.textContent=  '' ; 
    check = false
    loadData(orderByPrice) ;
  }else if(check==false){
    orderByPrice = products.sort((a,b)=>a.prix-b.prix);
    productContainer.textContent=  '' ; 
    check = true ;
    loadData(orderByPrice) ;

  }
}
const orderByLibelle = ()=>{
  var orderByLibelle = products.sort((a,b)=>b.libelle.localeCompare(a.libelle));
  if(check){
    productContainer.textContent=  '' ; 
    check = false
    loadData(orderByLibelle) ;
  }else if(check==false){
    orderByLibelle = products.sort((a,b)=>a.libelle.localeCompare(b.libelle));
    productContainer.textContent=  '' ; 
    check = true ;
    loadData(orderByLibelle) ;

  }
}
function filter(){
  var libelle = document.getElementById('libelle').value ; 
  var description = document.getElementById('description').value ; 
  var prixDe = document.getElementById('De').value; 
  var prixA = document.getElementById('A').value; 
  if(libelle=='' && description=='' && prix==''){
    document.getElementById('err').style.display = 'block' ;
    setTimeout(() => {
      document.getElementById('err').style.display = 'none' ;
    }, 3000);
  }else{
    const filtredProducts = products.filter((e) => {
      const libelleFiltre = libelle ? e.libelle.toLowerCase().includes(libelle.toLowerCase().trim()) : true;
      const descrFiltre = description ? e.description.toLowerCase().includes(description.toLowerCase().trim()) : true;
      const prixFiltre = prixDe && prixA ? (e.prix >= prixDe && e.prix <= prixA) : true;

      return libelleFiltre && descrFiltre && prixFiltre;
    })
    if(filtredProducts.length>0){
      productContainer.textContent = '' ; 
      loadData(filtredProducts);
    }else{
      const button = document.createElement('button') ; 
      button.textContent = 'Return' ;
      button.id = 'return' ;
      button.addEventListener('click',()=>{
        productContainer.textContent = '',
        document.getElementById('libelle').value = '' 
        document.getElementById('description').value = '';
        document.getElementById('De').value ='';
        document.getElementById('A').value = '';
        loadData(products) 
      })
      productContainer.innerHTML = `Searched Product not found !` ;
      productContainer.appendChild(button)
    }
  }
}
