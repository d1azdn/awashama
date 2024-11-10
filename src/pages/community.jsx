export function CommunityCard(props){
    return(
        <>
        <div className="card border border-solid rounded-xl p-4 border-neutral-200">
            <img src={props.url} alt="..." className="mb-2"/>
            <div className="contain">
                <h1 className="font-semibold mb-2 text-xl">{props.title}</h1>
                <p className="mb-4">{props.text}</p>
                <button onClick={props.click}>Gabung</button>
            </div>
        </div>
        </>
    )
}

export function CommunityChat(props){
    return(
        <>
        <div className="chat-bubble bg-lime-100 p-4 rounded-xl">
            <div className="info flex flex-row gap-2 mb-1">
                <h1 className="font-semibold">{props.user}</h1>
                <h3 className="text-sm">{props.community}</h3>
                <p className="text-neutral-500 text-sm">{props.time}</p>
            </div>
            <p className="mb-4">{props.text}</p>
            <div className="buttonlist flex flex-row gap-2">
                <button className="bg-neutral-200 py-2 px-4">Chat</button>
                <button className="bg-neutral-200 py-2 px-4">Bagikan</button>
            </div>
        </div>
        </>
    )
}

export function CommunityPoint(props){
    return(
        <>
        <div className="com-point flex flex-row gap-5">
            <img src={props.url} alt="..." />
            <div className="text">
                <h1 className="font-semibold mb-1">{props.title}</h1>
                <p className="mb-4">{props.text}</p>
            </div>
        </div>
        </>
    )
}

export function TrendList(props){
    return(
        <>
        <div className="trend mb-5">
            <h1 className="text-sm">{"Trends in "+props.place}</h1>
            <p className="text-xl font-semibold">{props.title}</p>
            <p>{props.post}</p>
        </div>
        </>
    )
}

export default function Community(){
    return(
        <>
        <section className="topbar my-32 mx-64 bg-lime-100 p-8">
            <div className="welcome mb-8">
                <h1 className="text-xl font-semibold">Selamat datang di komunitas!</h1>
                <p>Komunitas pertanian adalah forum yang dimoderasi tempat petani, agronom, dan para penggiat dapat terhubung, bertukar pengetahuan, dan berbagi wawasan.</p>
            </div>
            <div className="point flex-col">
                <CommunityPoint title="Terhubunglah dengan sesama petani" text="Berinteraksilah dengan orang-orang yang memiliki passion dalam pertanian, keberlanjutan, dan praktik agrikultur."/>
                <CommunityPoint title="Bagikan langsung dengan komunitas" text="Postingan Anda akan menjangkau anggota komunitas lainnya yang fokus pada topik pertanian."/>
                <CommunityPoint title="Dapatkan dukungan saat dibutuhkan" text="Admin dan moderator membantu diskusi serta memastikan percakapan yang produktif dan relevan di dalam komunitas."/>
            </div>
        </section>
        <section className="contain mx-24">
            <div className="title flex gap-10 text-center justify-center text-2xl mb-12">
                <h1>Home</h1>
                <h1>Explore</h1>
            </div>
            <div className="community flex flex-row gap-10 mb-8">
                <CommunityCard url="./src/assets/hidroponik.png" title="Aquaponik dan Hidroponik" text="Selamat datang di komunitas kami yang berdedikasi untuk memajukan praktik aquaponik dan hidroponik! Di sini, para"/>
                <CommunityCard url="./src/assets/blockmanagement.png" title="Aquaponik dan Hidroponik" text="Selamat datang di komunitas kami yang berdedikasi untuk memajukan praktik aquaponik dan hidroponik! Di sini, para"/>
                <CommunityCard url="./src/assets/petani.png" title="Aquaponik dan Hidroponik" text="Selamat datang di komunitas kami yang berdedikasi untuk memajukan praktik aquaponik dan hidroponik! Di sini, para"/>
            </div>
            <div className="chatcommunity flex flex-row gap-5">
                <div className="chat flex flex-col w-2/3 gap-4">
                    <CommunityChat user="UsernameABC" community="Petani Indonesia" time="19 Seconds ago" text="Curious about sustainable farming practices 🌱 — what are some innovative ways to improve soil health and reduce water usage in agriculture?"/>
                    <CommunityChat user="UsernameABC" community="Petani Indonesia" time="19 Seconds ago" text="Curious about sustainable farming practices 🌱 — what are some innovative ways to improve soil health and reduce water usage in agriculture?"/>
                    <CommunityChat user="UsernameABC" community="Petani Indonesia" time="19 Seconds ago" text="Curious about sustainable farming practices 🌱 — what are some innovative ways to improve soil health and reduce water usage in agriculture?"/>
                    <CommunityChat user="UsernameABC" community="Petani Indonesia" time="19 Seconds ago" text="Curious about sustainable farming practices 🌱 — what are some innovative ways to improve soil health and reduce water usage in agriculture?"/>
                </div>
                <div className="trends w-1/3 bg-lime-100 rounded-xl p-4">
                    <h1 className="font-semibold text-2xl mb-4">Trends for you</h1>
                    <div className="trend-list">
                        <TrendList place="Solok" title="Beras Solok" post="16 Posts"/>
                        <TrendList place="Solok" title="Beras Solok" post="16 Posts"/>
                        <TrendList place="Solok" title="Beras Solok" post="16 Posts"/>
                        <TrendList place="Solok" title="Beras Solok" post="16 Posts"/>
                        <TrendList place="Solok" title="Beras Solok" post="16 Posts"/>
                        <TrendList place="Solok" title="Beras Solok" post="16 Posts"/>
                    </div>
                </div>
            </div>

        </section>
        </>
    )
}