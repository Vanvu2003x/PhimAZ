import axios from "axios";

export const getNewFilms = async (page = 1) => {
    const res = await axios.get(`https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=${page}`);
    return {
        films: res.data.items,
        totalPages: res.data.pagination.totalPages,
    };
};

export const SearchFilm = async (keyword, limit = 5) => {
    const res = await axios.get(`https://phimapi.com/v1/api/tim-kiem?keyword=${keyword}&limit=${limit}`);
    return res.data.data.items;
}


export const DetailFilm = async (slug) => {
    const res = await axios.get(`https://phimapi.com/phim/${slug}`);
    return res.data
}

export const getSotap = async (slug) => {
    const res = await axios.get(`https://phimapi.com/phim/${slug}`);
    return {
        taphientai: res.data.movie.episode_current,
        tongsotap: res.data.movie.episode_total

    }
}

export const getTheloai = async (slug) => {
    const res = await axios.get(`https://phimapi.com/the-loai`);
    return res.data;
}

export const getQuocgia = async (slug) => {
    const res = await axios.get(`https://phimapi.com/quoc-gia`);
    return res.data;
}

export const getPhimbyTheloai = async (theloai, page = 1) => {
    const res = await axios.get(`https://phimapi.com/v1/api/danh-sach/${theloai}?page=${page}}`)
    return {
        title: res.data.data.titlePage,
        films: res.data.data.items,
        totalPages: res.data.data.params.pagination.totalPages,
    };
}