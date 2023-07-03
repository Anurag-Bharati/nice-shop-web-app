import Products from "@/components/product/Products";
import { getProducts } from "@/services/product.service";

export default async function Home() {
    const products = (await getProducts()) ?? [];
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Products products={products} />
        </main>
    );
}
