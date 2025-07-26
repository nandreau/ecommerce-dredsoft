import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * ProductCard Component
 */
const ProductCard = ({ product, onAddToCart }) => {
  const { id, name, image, price, variants = [], inStock = true } = product;
  const [selectedVariant, setSelectedVariant] = useState(
    variants.length > 0 ? variants[0] : null
  );

   const handleAddClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart({ ...product, selectedVariant });
  };

  const [intPart, decPart] = price.toFixed(2).split('.');

  return (
    <Link to={`/product/${id}`} className="text-decoration-none text-reset">
      <div className="card h-100 shadow-sm" style={{ cursor: "pointer" }}>
        <img
          src={image}
          alt={name}
          className="card-img-top p-3 pb-0"
          style={{ objectFit: "contain", height: "250px" }}
        />
        <div className="card-body d-flex flex-column">
          <h2
            className="card-title mb-2"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: '1rem',
              lineHeight: '1.2em',
            }}
            title={name}
          >
            {name}
          </h2>

          <div className="mb-3">
            <span style={{ fontSize: '0.75rem', fontWeight: 600, position:'relative', top:'-0.6rem' }}>$</span>
            <span style={{ fontSize: '1.75rem', fontWeight: 600 }}>{intPart}</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, position:'relative', top:'-0.6rem' }}>{decPart}</span>
          </div>

          {variants.length > 0 && (
            <select
              className="form-select mb-3"
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            >
              {variants.map((variant) => (
                <option key={variant} value={variant}>
                  {variant}
                </option>
              ))}
            </select>
          )}

          <button
            className={`btn ${inStock ? "btn-dark" : "btn-secondary"} mt-auto`}
            onClick={handleAddClick}
            disabled={!inStock}
          >
            {inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </Link>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    variants: PropTypes.arrayOf(PropTypes.string),
    inStock: PropTypes.bool,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;