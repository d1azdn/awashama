export default function Sidebar(){
    return(
        <>
        <nav className="p-8 grid grid-cols-1">
            <section className="admin-info">
                <h1 className="font-semibold text-xl">Admin</h1>
                <h1 className="text-xl">Saldo Rp.3000</h1>
            </section>
            <div className="splitter border border-solid my-6"></div>
            <section className="product-manage grid grid-cols-1 gap-1 mb-8">
                <a href="/dashboard/produk" className="p-2 hover:bg-awashama-toolightgray rounded-xl">Produk</a>
            </section>
            <section className="checkout-manage grid grid-cols-1 gap-1 mb-8">
                <a href="/dashboard/checkout" className="p-2 hover:bg-awashama-toolightgray rounded-xl">Barang Checkout</a>
            </section>
            <section className="article-manage grid grid-cols-1 gap-1 mb-8">
                <a href="/dashboard/artikel" className="p-2 hover:bg-awashama-toolightgray rounded-xl">Artikel</a>
            </section>
        </nav>
        </>
    )
}