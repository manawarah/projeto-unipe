import { useState, useEffect, useRef } from "react";
import { Search as SearchIcon } from "lucide-react";
import { userApi } from "../../api/users/userApi";
import type { User } from "../../types/User";
import "./Search.scss";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const handler = setTimeout(async () => {
      try {
        setLoading(true);
        const users = await userApi.getByName(query);
        setResults(users?.data);
        setShowDropdown(true);
      } catch (error) {
        setResults([]);
        setShowDropdown(false);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (user: User) => {
    navigate(`/profile/${user._id}`);
  };

  return (
    <div className="search-bar" ref={wrapperRef}>
      <div className="search-bar__input-wrapper">
        <SearchIcon size={18} />
        <input
          type="text"
          placeholder="Pesquise por alguém..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setShowDropdown(true)}
        />

        {showDropdown && results.length > 0 && (
          <ul className="search-bar__results">
            {results.map((user) => (
              <li key={user._id} onClick={() => handleSelect(user)}>
                {user.nome}
              </li>
            ))}
          </ul>
        )}

        {loading && <div className="search-bar__loading">Carregando...</div>}
      </div>
    </div>
  );
}
