import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [items, setItem] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          `https://reqres.in/api/users?page=${page}`
        );
        setItem(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployees();
  }, [page]);
  const handlePage = (cPage) => {
    setPage(cPage);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const filterEmployees = items.filter((employee) =>
    employee.first_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="search first_name"
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div className="App">
        {filterEmployees.map((employee) => (
          <div key={employee.id}>
            <img src={employee.avatar} alt={employee.first_name} />
            <p>{employee.first_name}</p>
          </div>
        ))}
        <div className="pagination">
          <button onClick={() => handlePage(1)}>1</button>
          <button onClick={() => handlePage(2)}>2</button>
          <button onClick={() => handlePage(3)}>3</button>
        </div>
      </div>
    </>
  );
}

export default App;
