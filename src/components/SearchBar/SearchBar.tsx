import React from "react";
import { ChangeEvent, FormEvent, useState } from "react";
// import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";
// import styles from "./SearchBar.module.css";
import style from "../SearchBar/SearchBar.module.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [input, setInput] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input.trim() === "") {
      toast.error("Please enter a search term");
      return;
    }

    onSubmit(input);
    setInput("");
  };

  return (
    <header className={style.searchBar}>
      <form onSubmit={handleSubmit}>
        <div className={style.inputWrapper}>
          <input
            type="text"
            id="searchInput"
            value={input}
            onChange={handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />

          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </form>
    </header>
  );
};

export default SearchBar;
