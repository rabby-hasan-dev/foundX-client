'use client'

import { Input } from "@nextui-org/input";
import { SearchIcon } from "../../icons";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useSearchItems } from "@/src/hooks/search.hook";
import useDebounce from "@/src/hooks/debounce.hooks";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ISearchResult } from "@/src/types";

const Landing = () => {
  const { handleSubmit, register, watch } = useForm();
  const { mutate: handleSearch, data,isPending,isSuccess } = useSearchItems();
  const searchTerm = useDebounce(watch('search'));
  const [searchResults, setSearchResults] = useState<ISearchResult[] | []>([]);
  const router = useRouter();
  console.log(data);

  useEffect(() => {

    if (searchTerm) {
      handleSearch(searchTerm)
    }
  }, [searchTerm])

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleSeeAll(data.search)

  }
  const handleSeeAll = (query: string) => {
    const queryString = query.trim().split(" ").join("+");

    router.push(`/found-items?query=${queryString}`);
  };


  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
    }
    if (!isPending && isSuccess && data && searchTerm) {
      setSearchResults(data?.data?.hits ?? []);
    }
  }, [isPending, isSuccess, data, searchTerm]);

  return (
    <div className=" h-[calc(100vh-64px)]  bg-[url('/glass.jpg')] ">

      <div className=" pt-32 flex-1 max-w-xl mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1" >
          <Input
            {...register('search')}
            aria-label="Search"
            placeholder="Search..."
            size="lg"
            classNames={{
              inputWrapper: "bg-default-100",
              input: "text-sm"
            }}
            startContent={
              <SearchIcon className="flex-shrink-0 pointer-events-none text-base "></SearchIcon>
            }
            type="text"
          ></Input>
        </form>
      </div>
      {searchResults.length > 0 && (
        <div className="mt-2 max-w-xl mx-auto rounded-xl bg-default-100 p-3">
          <div className="space-y-3">
            {searchResults.map((item, index) => (
              <Link
                key={index}
                className="text-default-900 block rounded-md from-default-200 p-2 transition-all hover:bg-gradient-to-l"
                href={`/found-items/${item.id}`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <img
                      alt="item"
                      className="h-20 w-20 rounded-md"
                      src={item.thumbnail}
                    />
                    <div>
                      <p className="text-lg font-semibold">{item.title}</p>
                      <p className="mt-1 line-clamp-2 h-12 w-full text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-3 flex justify-center border-t-1 border-default-50 pt-3">
            <button
              className="flex items-center justify-center gap-1"
              
              onClick={() => 
                handleSeeAll(searchTerm)}
            >
              <span>See All</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;