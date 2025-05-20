'use client';

import HeaderDesktop from "@/components/HeaderDesktop";
import HeaderMobile from "@/components/HeaderMobile";
import { ThemeContext } from "@/contexts/ThemeContext";
import { DetailFilm } from "@/services/filmsService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FaPlay } from 'react-icons/fa';

export default function Detail() {
    const params = useParams();
    const slug = params.slug;
    const router = useRouter();
    const [film, setFilm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState("Thông tin phim");
    const { theme } = useContext(ThemeContext);
    useEffect(() => {
        const fetchData = async () => {
            const fetchedFilm = await DetailFilm(slug);
            setFilm(fetchedFilm);
            setLoading(false);
        };
        fetchData();
    }, [slug]);

    return (
        <>
            <HeaderMobile />
            <HeaderDesktop />

            <section className={`${theme === "dark" ? "bg-[#02080F]" : "bg-white"} min-h-[100vh] p-6 md:p-10`}>
                {loading ? (
                    <div className="text-center text-lg">Đang tải dữ liệu...</div>
                ) : (
                    <>
                        <div className={`${theme === "dark" ? "bg-[#0f172a]" : "bg-gray-200"} text-sm text-gray-500 mb-4 space-x-1 p-2`}>
                            <Link href="/" className={`hover:underline ${theme === "dark" ? "hover:text-yellow-600" : "hover:text-blue-600"} transition-colors`}>
                                Trang chủ
                            </Link>
                            <span>/</span>
                            <Link href={""} className={`hover:underline ${theme === "dark" ? "hover:text-yellow-600" : "hover:text-blue-600"} transition-colors capitalize`}>
                                {film.movie.type}
                            </Link>
                            <span>/</span>
                            <span className={`${theme === "dark" ? "text-gray-200" : "text-gray-800"} font-medium`}>
                                {film.movie.name}
                            </span>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full md:w-3/5 h-auto relative group">
                                <img
                                    src={film.movie.thumb_url}
                                    alt={film.movie.name}
                                    className="w-full h-full md:h-[480px] object-cover rounded-lg"
                                />

                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />

                                <button
                                    onClick={() => { router.push('/' + slug + '/' + film.episodes[0].server_data[0].slug) }}
                                    className="absolute inset-0 flex items-center justify-center text-white cursor-pointer"
                                >
                                    <div className="flex justify-center items-center bg-white/20 hover:bg-white/30 backdrop-blur-md p-4 rounded-full transition duration-300">
                                        <FaPlay className="h-12 w-12 text-white translate-x-1" />
                                    </div>
                                </button>
                            </div>

                            <div className="w-full md:w-2/5 space-y-4">
                                <ul className={`p-4 rounded-lg shadow 
                                ${theme === 'dark'
                                        ? 'bg-[#181818] text-white border border-gray-700'
                                        : 'bg-gray-100 text-gray-800 border border-gray-200'}`}>
                                    <li className="text-center text-2xl font-bold uppercase">
                                        {film.movie.name}
                                    </li>
                                    <li className="text-center mt-1 text-sm text-gray-400">
                                        {film.movie.quality} - {film.movie.lang}
                                    </li>
                                    <li className="text-center mt-1 text-sm">
                                        {film.movie.origin_name}
                                    </li>
                                </ul>

                                <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                                    <TabsList className={`flex w-full  
                                    ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
                                        {["Thông tin phim", "Diễn viên"].map((tab) => (
                                            <TabsTrigger
                                                key={tab}
                                                value={tab}
                                                className={`w-1/2 py-3 text-center text-sm font-medium transition-all duration-200
                                                data-[state=active]:font-bold data-[state=active]:border-b-4
                                                ${theme === 'dark'
                                                        ? 'text-white hover:bg-[#1e293b] data-[state=active]:border-white'
                                                        : 'text-gray-800 hover:bg-gray-200 data-[state=active]:border-black'}`}
                                            >
                                                {tab}
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>

                                    <TabsContent value="Thông tin phim" className="mt-4">
                                        <ul className={`rounded-lg p-4 shadow 
                                        ${theme === 'dark'
                                                ? 'bg-[#0f172a] text-white border border-gray-700'
                                                : 'bg-white text-gray-800 border border-gray-200'}`}>
                                            <li className="flex justify-between py-2 border-b border-gray-400/30">
                                                <span className="font-semibold">Tập</span>
                                                <span>{film.movie.episode_total}</span>
                                            </li>
                                            <li className="flex justify-between py-2 border-b border-gray-400/30">
                                                <span className="font-semibold">Thời lượng</span>
                                                <span>{film.movie.time}</span>
                                            </li>
                                            <li className="flex justify-between py-2 border-b border-gray-400/30">
                                                <span className="font-semibold">Trạng thái</span>
                                                <span>{film.movie.status === "completed" ? "Hoàn tất" : "Đang cập nhật"}</span>
                                            </li>
                                            <li className="flex justify-between py-2 border-b border-gray-400/30">
                                                <span className="font-semibold">Thể loại</span>
                                                <span>{film.movie.category.map(c => c.name).join(', ')}</span>
                                            </li>
                                            <li className="flex justify-between py-2 border-b border-gray-400/30">
                                                <span className="font-semibold">Quốc gia</span>
                                                <span>{film.movie.country.map(c => c.name).join(', ')}</span>
                                            </li>
                                            <li className="flex justify-between py-2">
                                                <span className="font-semibold">Năm phát hành</span>
                                                <span>{film.movie.year}</span>
                                            </li>
                                        </ul>
                                    </TabsContent>

                                    <TabsContent value="Diễn viên" className="mt-4">
                                        <div className={`p-4 rounded-lg shadow 
                                        ${theme === 'dark'
                                                ? 'bg-[#0f172a] text-white border border-gray-700'
                                                : 'bg-white text-gray-800 border border-gray-200'}`}>
                                            {film.movie.actor || 'Chưa có thông tin diễn viên.'}
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </div>

                        <div className={`p-4 my-5 ${theme === "dark" ? "bg-[#181818] text-white" : "bg-gray-200"}`}>
                            <div className={`font-bold mb-2`}>Nội dung phim</div>
                            <div
                                className="text-sm text-justify"
                                dangerouslySetInnerHTML={{
                                    __html: film.movie.content
                                }}
                            ></div>
                        </div>


                    </>)
                }
            </section >

        </>
    );
}
