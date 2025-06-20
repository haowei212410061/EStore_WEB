import ProductCard from "./Card";

export default function ProductList({ productData }) {
  return (
    <div className="ProductList grid items-center mt-2 m-auto justify-center gap-2 gap-y-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-0 w-[85%]">
      {productData.length > 0 ? (
        productData.map((product) => {
          return (
            <ProductCard
              key={product.productid}
              id={product.productid}
              imageUrl={product.image}
              ProductTitle={product.title}
              ProductPrice={product.price}
            />
          );
        })
      ) : (
        <h1 className="w-full ml-125 text-4xl text-gray-600">本分類目前無商品</h1>
      )}
    </div>
  );
}
