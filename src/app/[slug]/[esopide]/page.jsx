"use client";
import { useEffect, useState, useRef, useContext } from "react";
import { DetailFilm } from "@/services/filmsService";
import { useParams, useRouter } from "next/navigation";
import Hls from "hls.js";
import HeaderDesktop from "@/components/HeaderDesktop";
import HeaderMobile from "@/components/HeaderMobile";
import { ThemeContext } from "@/contexts/ThemeContext";
import { FaSpinner } from "react-icons/fa";
import Trend from "@/components/Article";
import 'plyr/dist/plyr.css';
import Plyr from 'plyr';

export default function Player() {
    const params = useParams();
    const { slug, esopide } = params;
    const [film, setFilm] = useState(null);
    const [episodeData, setEpisodeData] = useState("");
    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const videoRef = useRef(null);
    const { theme } = useContext(ThemeContext);
    const router = useRouter();

    const getDataVideo = (film) => {
        return film.episodes?.[0]?.server_data?.find(
            (element) => element.slug === esopide
        );
    };

    const handleClick = (epSlug) => {
        router.push(`/${slug}/${epSlug}`);
    };

    useEffect(() => {
        const fetchFilm = async () => {
            try {
                setLoading(true);
                const filmData = await DetailFilm(slug);
                setFilm(filmData);
                setEpisodes(filmData.episodes[0]?.server_data || []);
            } catch (error) {
                console.error("Error fetching film data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFilm();
    }, [slug]);

    useEffect(() => {
        if (film && esopide) {
            const datafilm = getDataVideo(film);
            if (datafilm && datafilm.link_embed) {
                setEpisodeData(datafilm.filename);

                const video = videoRef.current;

                if (Hls.isSupported()) {
                    const hls = new Hls();
                    hls.loadSource(datafilm.link_m3u8);
                    hls.attachMedia(video);

                    hls.on(Hls.Events.MANIFEST_PARSED, () => {
                        const player = new Plyr(video, {
                            controls: [
                                'play', 'rewind', 'fast-forward', 'progress', 'current-time', 'duration',
                                'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'
                            ],
                        });
                    });

                    return () => {
                        hls.destroy();
                    };
                } else if (video?.canPlayType("application/vnd.apple.mpegurl")) {
                    video.src = datafilm.link_m3u8;
                    new Plyr(video, {
                        controls: [
                            'play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'
                        ],
                        autoplay: true,
                        ratio: '16:9',
                        speed: { selected: 1, options: [0.5, 1, 1.5, 2] },
                    });
                }
            } else {
                console.error("No valid video data found.");
            }
        }
    }, [film, esopide]);

    return (
        <>
            <HeaderDesktop />
            <HeaderMobile />
            <div className={`flex flex-col md:flex-row min-h-[300px] p-[20px] gap-[65px] ${theme === "dark" ? "bg-[#28282D]" : ""}`}>
                <section className="flex-1 border-2 p-5">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center min-h-[100vh]">
                            <FaSpinner className="animate-spin text-4xl mb-3 text-blue-500" />
                            <p className="text-lg font-medium">⏳ Đang tải dữ liệu phim...</p>
                        </div>
                    ) : (
                        <div className="w-full">
                            <div>
                                <h1
                                    className={`text-sm mb-4 p-2 rounded font-medium ${theme === "dark" ? "bg-[#181818] text-white" : "bg-gray-200 text-black"}`}
                                >
                                    {episodeData}
                                </h1>

                                <video
                                    ref={videoRef}
                                    controls
                                    className="w-full overflow-hidden"
                                >
                                    <p>Your browser does not support HTML5 video.</p>
                                </video>

                                <div className={`mt-8 md:p-10 p-5 ${theme === "dark" ? "bg-[#181818] text-white" : "bg-gray-200"}`}>
                                    <h2 className="text-lg font-semibold mb-4">Chọn tập phim:</h2>
                                    <div className="flex flex-wrap gap-2 text-xs">
                                        {episodes.map((ep) => {
                                            const isActive = ep.slug === esopide;
                                            return (
                                                <button
                                                    key={ep.slug}
                                                    onClick={() => handleClick(ep.slug)}
                                                    className={`min-w-[60px] h-[30px] cursor-pointer px-2 py-1 rounded text-sm font-medium ${isActive ? theme === "dark" ? "bg-amber-400 text-white " : "bg-cyan-400 text-white" : theme === "dark" ? "bg-[#2a2a2a] text-white hover:bg-amber-700" : "bg-gray-100 text-black hover:bg-cyan-500"}`}
                                                >
                                                    {ep.name}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
                <div><Trend></Trend></div>
            </div>
        </>
    );
}
