"use client";

import { getData } from "@/app/api/api-utils";
import { endpoints } from "@/app/api/config";
import { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import ReleasesOverview from "@/app/components/ReleasesOverview/ReleasesOverview";
import { useSearchParams } from "next/navigation";

function saveSearches(search) {
  localStorage.setItem("searches", search);
}
function getSearches() {
  return localStorage.getItem("searches");
}

export default function SearchPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [releases, setReleases] = useState();
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [isNextPage, setIsNextPage] = useState(true);

  const [searches, setSearches] = useState(JSON.parse(getSearches()));

  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  async function fetchData(query, page = 0) {
    const url = `${endpoints.search}?query=${query}&page=${page}`;
    const data = await getData(url);

    if (data.content.length < 25) {
      setIsNextPage(false);
    } else {
      setIsNextPage(true);
    }

    // Handle initial load (page 0) or subsequent pagination
    if (page === 0) {
      setReleases(data.content);
    } else {
      setReleases([...releases, ...data.content]);
    }
  }

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      setQuery(query);
      fetchData(query, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (releases) {
      fetchData(query, page); // Use fetchData for pagination
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query != "") {
      router.push(pathname + "?" + createQueryString("query", query));
      setReleases(null);
      setPage(0);
      fetchData(query);

      // save searches and update search history
      if (!searches) {
        setSearches([query]);
        saveSearches(JSON.stringify([query]));
      } else {
        console.log(searches);
        if (!searches.find((element) => element == query)) {
          setSearches([query, ...searches.slice(0, 5)]);
          saveSearches(JSON.stringify([query, ...searches.slice(0, 5)]));
        }
      }
    }
  };

  return (
    <>
      <div>
        <form className="field large prefix round fill" onSubmit={handleSubmit}>
          <i className="front">search</i>
          <input name="query" onInput={handleInput} value={query} />
          <menu className="min" style={{ marginTop: "64px" }}>
            {searches
              ? searches.map((item) => {
                  return (
                    <a
                      key={item}
                      onClick={() => {
                        setQuery(item);
                      }}
                      className="row"
                    >
                      <i>history</i>
                      <div>{item}</div>
                    </a>
                  );
                })
              : ""}
          </menu>
        </form>
      </div>

      {releases ? (
        releases.length > 0 ? (
          <ReleasesOverview
            page={page}
            setPage={setPage}
            releases={releases}
            isNextPage={isNextPage}
          />
        ) : (
          <div className="absolute padding primary center middle small-round">
            <i className="extra">search</i>
            <h5>Попробуй ещё раз ૮₍´˶• . • ⑅ ₎ა</h5>
            <p>Введите другой поисковой запрос.</p>
          </div>
        )
      ) : (
        <div className="absolute padding primary center middle small-round">
          <i className="extra">search</i>
          <h5>Здесь пока ничего нет ૮₍´˶• . • ⑅ ₎ა</h5>
          <p>Введите поисковой запрос для начала поиска.</p>
        </div>
      )}
    </>
  );
}
