import { ThemeContext } from "@/contexts/ThemeContext";
import { SearchFilm } from "@/services/filmsService";
import { useRouter } from "next/navigation";
import { useContext, useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBar() {
    const router = useRouter()
    const { theme } = useContext(ThemeContext)
    const [listFilmSearch, setListFilmSearch] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [isClicked, setIsClicked] = useState(false);
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (keyword.trim()) {
                Search(keyword);
            } else {
                setListFilmSearch([]);
            }
        }, 200);

        return () => clearTimeout(delayDebounce);
    }, [keyword]);

    async function Search(keyword) {
        try {
            const list = await SearchFilm(keyword, 5);
            console.log(list);
            setListFilmSearch(list);

        } catch (err) {
            console.error("Lỗi khi tìm phim:", err);
            setListFilmSearch([]);
        }
    }

    return (
        <>
            <div className={`relative ${theme == "dark" ? "border-white text-white" : " border-black text-black"} text-gray-900 flex border-2 items-center p-1 text-sm justify-between`}>
                <input
                    className={`${theme === "dark" ? "placeholder-white" : ""} w-full outline-0`} type="text"
                    placeholder="Nhập để tìm kiếm" name="" id=""
                    onChange={(e) => setKeyword(e.target.value)}
                    onClick={() => setIsClicked(true)}
                    onBlur={() => setIsClicked(false)} />
                <AiOutlineSearch className="text-xl"></AiOutlineSearch>
                {isClicked && listFilmSearch.length > 0 && (
                    <ul
                        className={`absolute top-12 left-0 w-full max-h-80 overflow-y-auto ${theme === "light" ? "bg-white" : "bg-black"} border shadow-md rounded-md z-50`}
                    >
                        {listFilmSearch.map((film) => (
                            <li
                                onMouseDown={() => {
                                    setIsClicked(true)
                                    router.push("/" + film.slug)
                                }}
                                key={film._id}
                                className={` hover:bg-gray-600 flex items-center gap-3 border-b cursor-pointer px-3 py-2`}
                            >
                                <img
                                    src={`https://phimimg.com/${film.poster_url}`}
                                    alt={film.name}
                                    className="md:w-12 md:h-16 w-8 h-12  object-cover rounded-md"
                                />
                                <span className="text-base font-medium truncate">{film.name}</span>
                            </li>
                        ))}
                    </ul>
                )}

            </div>

        </>
    )
}