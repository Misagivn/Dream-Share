"use client";

import React from 'react';

interface ProductCardProps {
    collection: string;
    title: string;
    image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ collection, title, image }) => {
    return (
        <div className="product-card">
            <div className="collection">{collection}</div>
            <div className="title">{title}</div>
            <img src={image} alt={title} className="image" />
        </div>
    );
};

export default ProductCard;