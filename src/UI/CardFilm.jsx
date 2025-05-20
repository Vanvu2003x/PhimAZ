import { getSotap } from '@/services/filmsService';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';

export default function CardFilm({ film }) {
    const router = useRouter();
    const [sotap, setSotap] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSoTap = async () => {
            try {
                const result = await getSotap(film.slug);
                setSotap(result);
            } catch (err) {
                console.error("Lỗi khi lấy số tập:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSoTap();
    }, [film.slug]);

    const Redirect = () => {
        router.push("/" + film.slug);
    };

    if (loading) {
        return (
            <div className="relative group w-[300px] h-[400px] overflow-hidden bg-gray-300 animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-pulse-light"></div>
            </div>
        );
    }

    return (
        <div className="relative group w-[150px] h-[220px] overflow-hidden">
            <i
                className="cursor-pointer absolute z-50 hidden group-hover:flex top-[40%] left-[33.33%] text-2xl text-white justify-center items-center border-2 border-white rounded-full w-1/3 h-12"
                onClick={Redirect}
            >
                <FaPlay />
            </i>

            <img
                src={
                    film.poster_url?.startsWith("http")
                        ? film.poster_url
                        : `https://phimimg.com/${film.poster_url}`
                }
                alt={film.name}
            />



            <div className="absolute top-1 left-1 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                {sotap.taphientai.startsWith("Hoàn") ? sotap.taphientai : `${sotap.taphientai}/${sotap.tongsotap}`}
            </div>

            <div className="overflow-hidden h-12 w-full absolute text-center bottom-0 text-white font-semibold bg-black opacity-65 transition-all duration-150">
                <h1>{film.name}</h1>
                <h1>{film.origin_name}</h1>
            </div>
        </div>
    );
}
