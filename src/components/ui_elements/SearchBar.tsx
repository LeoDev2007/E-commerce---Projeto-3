import { Input, InputGroup } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { useState, type KeyboardEvent, type ChangeEvent } from "react";
import styles from "../../styles/ui_css/Inputs.module.css";
import { useProducts } from "../../hooks/useProducts";
import { useNavigate } from "react-router-dom";


const SearchBar = () => {
  const navigate = useNavigate();
  const { data } = useProducts();

  const [search, setSearch] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const results = data?.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  const goToTheResult = (text: string) => {
    navigate(`/products/search?search=${encodeURIComponent(text)}`);
    setSearch('')   
    setSelectedIndex(-1)
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) =>
        prev < results!.length - 1 ? prev + 1 : prev,
      );
    }

    if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }

    if (e.key === "Enter") {
      if (selectedIndex >= 0) {
        goToTheResult(results?.[selectedIndex]?.title ?? "");
      } else {
        goToTheResult(search);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setSelectedIndex(-1);
  };
  return (
    <div style={{ position: "relative" }}>
      <InputGroup
        flex="1"
        endElement={
          <LuSearch size={20} color="#000" style={{ marginRight: "8px" }} />
        }
      >
        <Input
          placeholder="Search"
          className={styles.inputSearch}
          value={search}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </InputGroup>

      {search && (
        <ul className={styles.ul}>
          {results!.length > 0 ? (
            results?.slice(0,10).map((item, index) => (
              <li
                key={item.id}
                onClick={() => goToTheResult(item.title)}
                style={{
                  cursor: 'pointer',
                  padding: "8px 12px",
                  background: index === selectedIndex ? '#eee' : '#fff'
                }}
              >
                {item.title}
              </li>
            ))
          ): (
            <li style={{ padding: "8px 12px" }}>Result not Found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
