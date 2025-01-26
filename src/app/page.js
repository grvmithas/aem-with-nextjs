// pages/index.js
import Image from 'next/image';
import styles from './page.module.css';
import { fetchHTMLContent } from './utils/utils';
 

export default async function  Home() {
  const headerUrl= `https://qa-www.sunbeltrentals.com/content/experience-fragments/sunbeltrentals/us/en_US/header/master/_jcr_content.nocloudconfigs.sharedcontent.html`
  const footerUrl=`https://qa-www.sunbeltrentals.com/content/experience-fragments/sunbeltrentals/us/en_US/footer/master/_jcr_content.nocloudconfigs.sharedcontent.html`
  const htmlContent= await fetchHTMLContent(headerUrl);
  const footerContent= await fetchHTMLContent(footerUrl);
  
  const products = await fetchProducts();

  return (
    <div className={styles.page}>
      {/* Inject the fetched HTML content */}
      <div dangerouslySetInnerHTML={{ __html: htmlContent }}   style={{ width: '100%', margin: '0', padding: '0' }} />
    
      <main className={styles.main}>
        <div className={styles.sidebar}>
          <h5>Categories</h5>
          <ul>
            <li>Electronics</li>
            <li>Fashion</li>
            <li>Home & Kitchen</li>
            <li>Beauty</li>
            <li>Sports</li>
          </ul>
        </div>

        <div className={styles.content}>
          <h5>Featured Products</h5>
          <div className={styles.productGrid}>
            {products.map((product) => (
              <div key={product.id} className={styles.productTile}  
			    data-aue-type="reference"
				data-aue-filter="cf"
				data-aue-resource={`urn:aemconnection:/content/dam/wknd/en/site/products/product-${product.id}/jcr:content/data/master`}
				data-aue-label={`Content Fragment ${product.id}`}
			  >
                <Image
                  src={product.image || `https://wknd.site${product.imagePath._path}`}
                  alt={product.name}
                  width={200}
                  height={200}
                  className={styles.productImage}
                />
                <p data-aue-prop="name" data-aue-type="text" data-aue-label="Name" >{product.name}</p>
                <p data-aue-prop="price" data-aue-type="text" data-aue-label="Price">{product.price}</p>
                <button className={styles.addToCart}>Add to Cart</button>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className={styles.footer} dangerouslySetInnerHTML={{__html:footerContent}} >
  
      </footer>
    </div>
  );
}

const getBasicAuthHeader = (username, password) => {
  const credentials = `${username}:${password}`;
  return `Basic ${Buffer.from(credentials).toString('base64')}`;
};

async function fetchProducts() {
  const fallbackProducts = [
    { id: 1, name: 'Product 1', price: '$50', image: '/images/product1.jpg' },
    { id: 2, name: 'Product 2', price: '$30', image: '/images/product2.jpg' },
    { id: 3, name: 'Product 3', price: '$70', image: '/images/product3.jpg' },
    { id: 4, name: 'Product 4', price: '$20', image: '/images/product4.jpg' },
    { id: 5, name: 'Product 5', price: '$90', image: '/images/product5.jpg' },
  ];

  try {
    const response = await fetch('http://localhost:4502/graphql/execute.json/wknd-shared/productlist', {
      method: 'GET', // HTTP method
      headers: {
        'Content-Type': 'application/json', // Content type header
        'Authorization': getBasicAuthHeader('admin', 'admin'), // Add Basic Auth header
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
	
	const productlist = await response.json();
    return productlist.data.productModelList.items;
  } catch (error) {
    console.error(error);
    return fallbackProducts;
  }
}

// Fetch HTML content server-side using getServerSideProps

