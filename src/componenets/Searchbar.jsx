import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function Searchbar() {
    return (
        <div className="searchbar">
            <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                    type="text"
                    placeholder="Search"
                    className="md:text-md p-4 pl-9 rounded-lg border border-gray-200"
                />
            </div>
        </div>
    )
}
