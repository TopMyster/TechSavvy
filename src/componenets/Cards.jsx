import { Star, ThumbsUp } from "lucide-react"
import { useState, useEffect } from "react"
import supabase from "../supabaseClient"

export default function Card({
    headline,
    rating,
    stars,
    createdTime,
    product,
    onClick,
    id,
}) {
    const [currentStars, setCurrentStars] = useState(stars)
    const [hasLiked, setHasLiked] = useState(false)

    useEffect(() => {
        const isStared = localStorage.getItem(`stared-${id}`)
        if (isStared) {
            setHasLiked(true)
        }
    }, [id])

    const handleLike = async (e) => {
        e.stopPropagation()

        if (hasLiked) return

        const newStars = currentStars + 1
        setCurrentStars(newStars)
        setHasLiked(true)
        localStorage.setItem(`stared-${id}`, 'true')

        const { error } = await supabase
            .from("reviews")
            .update({ stars: newStars })
            .eq("id", id)

        if (error) {
            setCurrentStars(currentStars)
            setHasLiked(false)
            localStorage.removeItem(`stared-${id}`)
            console.error("Error updating stars:", error)
        }
    }

    return (
        <div className="card">
            <article
                className="group cursor-pointer rounded-xl border bg-card p-4 shadow-sm transition hover:border-[#1DA1F2] hover:shadow-md"
                onClick={onClick}
            >
                <header className="flex items-start justify-between gap-3">
                    <div>
                        <h2 className="text-base font-semibold leading-snug">
                            {headline}
                        </h2>
                        <p className="mt-1 text-xs text-muted-foreground">
                            {product} • {new Date(createdTime).toLocaleDateString()}
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                        <div className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                            <span>{rating}/10</span>
                        </div>
                        <div className={`flex items-center gap-1 text-xs ${hasLiked ? "text-yellow-500 font-bold" : "text-yellow-500"}`}>
                            <Star className={`h-3 w-3 ${hasLiked ? "fill-yellow-500" : "fill-transparent"}`} />
                            <span>{currentStars}</span>
                        </div>
                    </div>
                </header>

                <footer className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <button
                        onClick={handleLike}
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 transition-colors ${hasLiked ? "bg-[#1DA1F2] text-secondary" : "text-[#1DA1F2] hover:bg-muted"}`}
                    >
                        <ThumbsUp className="h-3 w-3" />
                        <span>{hasLiked ? "Liked" : "Like"}</span>
                    </button>
                    <button className="inline-flex items-center gap-1 rounded-full px-2 py-1 hover:bg-muted" onClick={() => {
                        navigator.share({
                            title: headline,
                            text: `Check out this TechSavvy review: ${headline}`,
                            url: `/page/${id}`,
                        })
                    }}>
                        ⤴ <span>Share</span>
                    </button>
                </footer>
            </article>
        </div>
    )
}
