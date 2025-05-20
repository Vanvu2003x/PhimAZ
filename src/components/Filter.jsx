'use client'

import { useState } from 'react'

const genres = ['Hành động', 'Hài', 'Kinh dị', 'Tình cảm', 'Hoạt hình']
const countries = ['Việt Nam', 'Mỹ', 'Hàn Quốc', 'Nhật Bản', 'Trung Quốc']
const years = Array.from({ length: 20 }, (_, i) => `${2025 - i}`)

export default function MovieFilter({ onFilterChange }: { onFilterChange: (filters: any) => void }) {
    const [genre, setGenre] = useState('')
    const [country, setCountry] = useState('')
    const [year, setYear] = useState('')

    const handleFilterChange = () => {
        onFilterChange({ genre, country, year })
    }

    return (
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <select value={genre} onChange={(e) => setGenre(e.target.value)}>
                <option value="">-- Thể loại --</option>
                {genres.map((g) => (
                    <option key={g} value={g}>{g}</option>
                ))}
            </select>

            <select value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="">-- Quốc gia --</option>
                {countries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>

            <select value={year} onChange={(e) => setYear(e.target.value)}>
                <option value="">-- Năm --</option>
                {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                ))}
            </select>

            <button onClick={handleFilterChange}>Lọc</button>
        </div>
    )
}
