import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabaseClient";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function Post() {
    const [headline, setHeadline] = useState("");
    const [rating, setRating] = useState("");
    const [product, setProduct] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!headline || !rating || !product || !content) {
            setError("All fields are required");
            return;
        }

        const { data, error: insertError } = await supabase
            .from("reviews")
            .insert([{
                headline,
                rating: parseInt(rating),
                stars: 0,
                product,
                content,
                created_time: new Date().toISOString()
            }])
            .select();

        if (insertError) {
            console.error(insertError);
            setError(insertError.message);
            return;
        }

        if (data) {
            navigate("/");
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle>Post a New Review</CardTitle>
                    <CardDescription>
                        Share your thoughts on a product
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="post-form" onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="headline">Headline</Label>
                                <Input
                                    id="headline"
                                    placeholder="Enter a headline"
                                    value={headline}
                                    onChange={(e) => setHeadline(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="rating">Rating (1-10)</Label>
                                <Input
                                    id="rating"
                                    type="number"
                                    placeholder="Rate from 1 to 10"
                                    min="1"
                                    max="10"
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="product">Product Name</Label>
                                <Input
                                    id="product"
                                    placeholder="Name of the product"
                                    value={product}
                                    onChange={(e) => setProduct(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="content">Review Content</Label>
                                <Textarea
                                    id="content"
                                    placeholder="Write your review here..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    rows={5}
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button type="submit" form="post-form" className="w-full">
                        Post Review
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}