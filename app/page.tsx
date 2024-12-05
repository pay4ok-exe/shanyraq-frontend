import Filter from "@/components/filter";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useState } from "react";

export default function Home() {
  // const [query, setQuery] = useState(null);

  return (
    <div className="min-h-full min-w-full space-y-[40px]">
      <Header isFilterResults={true} />
      <div className="flex-grow w-[1300px] mx-auto">
        <div className="flex justify-between gap-[45px]">
          <Filter />
        </div>
      </div>
      <Footer />
    </div>
  );
}
