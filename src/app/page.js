// pages/index.js
import Image from 'next/image';
import styles from './page.module.css';
import { fetchHTMLContent } from './utils/utils';
 

export default async function  Home() {
  const headerUrl= `https://qa-www.sunbeltrentals.com/content/experience-fragments/sunbeltrentals/us/en_US/header/master/_jcr_content.nocloudconfigs.sharedcontent.html`
  const footerUrl=`https://qa-www.sunbeltrentals.com/content/experience-fragments/sunbeltrentals/us/en_US/footer/master/_jcr_content.nocloudconfigs.sharedcontent.html`
  const htmlContent= await fetchHTMLContent(headerUrl);
  const footerContent= await fetchHTMLContent(footerUrl)
  const products = [
    { id: 1, name: 'Product 1', price: '$50', image: '/images/product1.jpg' },
    { id: 2, name: 'Product 2', price: '$30', image: '/images/product2.jpg' },
    { id: 3, name: 'Product 3', price: '$70', image: '/images/product3.jpg' },
    { id: 4, name: 'Product 4', price: '$20', image: '/images/product4.jpg' },
    { id: 5, name: 'Product 5', price: '$90', image: '/images/product5.jpg' },
  ];
  return (
    <div className={styles.page}>
      {/* Inject the fetched HTML content */}
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    
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
              <div key={product.id} className={styles.productTile}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  className={styles.productImage}
                />
                <p>{product.name}</p>
                <p>{product.price}</p>
                <button className={styles.addToCart}>Add to Cart</button>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className={styles.footer} dangerouslySetInnerHTML={{__html:footerContent}}>
  
      </footer>
    </div>
  );
}

// Fetch HTML content server-side using getServerSideProps

