export default function Artikel(){
    return(
        <>
        <div className="artikel flex justify-center gap-10">

        <div className="kanan border border-solid p-4">
            <div className="card">
                <h1>Test</h1>
                <p>Bagian kanan</p>
            </div>
        </div>
        <div className="kiri grid-cols-2 grid">
            <div className="card border border-solid p-4">
                <h1>Test</h1>
                <p>Bagian kanan</p>
            </div>
            <div className="card border border-solid p-4">
                <h1>Test</h1>
                <p>Bagian kanan</p>
            </div>
            <div className="card border border-solid p-4">
                <h1>Test</h1>
                <p>Bagian kanan</p>
            </div>
            <div className="card border border-solid p-4">
                <h1>Test</h1>
                <p>Bagian kanan</p>
            </div>
        </div>


        </div>
        </>
    )
}