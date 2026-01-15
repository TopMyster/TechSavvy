import { Input } from "@/components/ui/input"

export default function Searchbar() {
    return (
        <div className="searchbar">
            <Input type="text" placeholder="Search" className="md:text-md p-4 rounded-lg border-1 border-gray-200" />
        </div>
    )
}