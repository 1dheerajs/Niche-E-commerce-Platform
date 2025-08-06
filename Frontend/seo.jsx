import React from 'react';
import { Helmet } from 'react-helmet';

function ProductPage({ product }) {
  return (
    <div>
      <Helmet>
        <title>{product.name} | Desi Etsy</title>
        <meta name="description" content={product.description} />
      </Helmet>
      {/* Product details */}
    </div>
  );
}
