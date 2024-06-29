import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

import ProductSpecifications from "@/components/productdetails/ProductSpecifications";
import ProductImages from "@/components/productdetails/ProductImages";
import ProductDetails from "@/components/productdetails/ProductDetails";
import ProductReviews from "@/components/productdetails/ProductReviews";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [selectedColor, setSelectedColor] = useState(null);

  return (
    <div>
      <div className="mt-20">
        <div className="mx-auto max-w-screen-2xl px-4">
          <div className="lg:flex gap-6">
            <div className="lg:w-2/5">
              <ProductImages id={id} selectedColor={selectedColor} />
            </div>
            <div className="lg:w-3/5 md:py-8">
              <ProductDetails
                id={id}
                selectedColor={selectedColor}
                selectColor={setSelectedColor}
              />
              <ProductSpecifications id={id} />
              <ProductReviews />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
