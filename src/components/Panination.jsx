import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname } from "next/navigation";

export function PaginationDemo({ curenpage, totalpage, className }) {
    const pages = [];
    pages.push(1);
    const pathname = usePathname()
    if (curenpage >= 4) {
        pages.push("left-ellipsis");
    }

    if (curenpage <= 3) {
        for (let i = 2; i <= Math.min(4, totalpage - 1); i++) {
            pages.push(i);
        }
    } else {
        const start = Math.max(2, curenpage - 1);
        const end = Math.min(totalpage - 1, curenpage + 1);
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
    }

    if (curenpage < totalpage - 3) {
        pages.push("right-ellipsis");
    }

    if (totalpage > 1) {
        pages.push(totalpage);
    }

    return (
        <Pagination className={className}>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={curenpage === 1 ? "#" : `${pathname}?page=${curenpage - 1}`}
                    />
                </PaginationItem>

                {pages.map((page, idx) => {
                    if (page === "left-ellipsis" || page === "right-ellipsis") {
                        return (
                            <PaginationItem key={page + idx}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }
                    return (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href={`${pathname}?page=${page}`}
                                isActive={page === curenpage}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}

                <PaginationItem>
                    <PaginationNext
                        href={curenpage === totalpage ? "#" : `phim-moi-cap-nhat?page=${curenpage + 1}`}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
