"use client";
import HeaderDesktop from "@/components/HeaderDesktop";
import HeaderMobile from "@/components/HeaderMobile";
import { useContext, useEffect, useState } from "react";
import { getNewFilms } from "@/services/filmsService";
import { ThemeContext } from "@/contexts/ThemeContext";
import CardFilm from "@/UI/CardFilm";
import { useSearchParams } from "next/navigation";
import { PaginationDemo } from "@/components/Panination";
import Trend from "@/components/Article";
export default function Home() {
    const [newFilm, setNewFilm] = useState([]);
    const [loading, setLoading] = useState(true);
    const { theme } = useContext(ThemeContext);
    const [totalPages, setTotalPages] = useState(0);
    const searchParams = useSearchParams()
    const page = searchParams.get("page") || "1";
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { films, totalPages } = await getNewFilms(page);
            setNewFilm(films);
            setTotalPages(totalPages);
            setNewFilm(films);
            setLoading(false);
        };
        fetchData();
    }, [page]);
    return (
        <>
            <HeaderMobile />
            <HeaderDesktop />
            <div className={`p-5 md:min-h-[100vh] md:flex md:justify-between ${theme === "dark" ? "bg-[#28282D]" : "bg-white"}`}>
                <section>
                    <div className={`mb-10 md:w-[900px] py-4 ${theme === "dark" ? "border-0 border-b-2 border-white" : " border-2"}`}>
                        <span className={`uppercase flex items-center font-bold w-[180px] h-[45px] ${theme === "dark" ? "text-white pentagon pl-3" : "text-black border-b-3 ml-3 border-black"}`}>
                            Mới cập nhật
                        </span>
                        <div className="p-5">
                            {loading ? (
                                <div className="text-center text-lg font-semibold">
                                    ⏳ Đang tải dữ liệu phim...
                                </div>
                            ) : (
                                <ul className="flex flex-wrap gap-5 justify-evenly items-center">
                                    {newFilm.map((item, index) => (
                                        <li className="border-2 border-black overflow-hidden md:w-[150px] h-[220px]" key={index}>
                                            <CardFilm film={item} />
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <PaginationDemo className={`${loading ? "hidden" : "flex"}`} curenpage={Number(page)} totalpage={totalPages} />
                    </div>
                </section>
                <Trend></Trend>
            </div>
        </>
    );
}
