let inventory = [
  ['LA-LG-STICKER', 300, 'Large Sticker', 'images/la-large-sticker-256px.png', 'Show your Launch pride by plastering your laptop with these beautiful die-cut stickers.'],
  ['LA-SM-STICKER', 200, 'Small Sticker', 'images/la-small-sticker-128px.png', 'It\'s a tiny Launch sticker. How cute!'],
  ['LA-T-SHRIT', 50, 'T-Shirt', 'images/la-t-shirt-200px.png', '100% Cotton. Makes a great gift.']
]

// your code, here

  class Product {

    constructor(product_id, quantity, product_name, product_image, desc){
      this.product_id = product_id;
      this.quantity = quantity;
      this.product_name = product_name;
      this.product_image = product_image;
      this.desc = desc;
    }

     sell(){
       this.quantity = this.quantity - 1;
    }

    toHTML(){
      let divider = document.getElementById('all-products');
      divider.className =  'product';

      let productHeader = document.createElement('h1');
      productHeader.innerHTML = this.product_name;

      let productQuantityHeader = document.createElement('h5');
      productQuantityHeader.innerHTML = this.quantity + ' in stock';

      let productImage = document.createElement('img');
      productImage.setAttribute('src', this.product_image);

      let productDescription = document.createElement('h3');
      productDescription.innerHTML = 'DESCRIPTION';
      let paragraph = document.createElement('p');
      let text = document.createTextNode(this.desc);
      paragraph.appendChild(text);

      divider.appendChild(productHeader);
      divider.appendChild(productQuantityHeader);
      divider.appendChild(productImage);
      divider.appendChild(productDescription);
      divider.appendChild(paragraph);


    }

  }

  let products = inventory.map((item) => {
    return new Product(...item);
  });

  element = document.getElementById('all-products');

  products.forEach((product) => {
     product.toHTML();
  })
