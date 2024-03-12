import "./App.css";
import Search from "./Table";
import { useCallback, useState } from "react";
import { Button } from "antd";

function App() {
  const [fdata, setFdata] = useState({
    rno: "",
    fname: "",
    school: "",
    course: "",
  });
  const [mainData, setMainData] = useState(
    JSON.parse(localStorage.getItem("Data")) || [],
  );
  // const [index, setIndex] = useState();
  const [filter, setFilter] = useState("");
  console.log(filter);
  const handleChange = (e) => {
    setFdata({ ...fdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setMainData([...mainData, { ...fdata }]);
    localStorage.setItem("Data", JSON.stringify([...mainData, fdata]));
  };

  const [searchBy, setSearchBy] = useState();
  console.log(searchBy);
  const filteredData = useCallback(() => {
    if (filter)
      switch (searchBy) {
        case "id":
          return mainData.filter((row) => row?.rno?.includes(parseInt(filter)));
        case "name":
          return mainData.filter((row) =>
            row?.fname
              ?.toLocaleLowerCase()
              .includes(filter?.toLocaleLowerCase()),
          );
        case "school":
          return mainData.filter((row) =>
            row?.school
              ?.toLocaleLowerCase()
              .includes(filter?.toLocaleLowerCase()),
          );

        case "course":
          return mainData.filter((row) =>
            row?.course
              ?.toLocaleLowerCase()
              .includes(filter?.toLocaleLowerCase()),
          );
        default:
          // No sorting
          return mainData;
      }
    return mainData;
  }, [mainData, filter, searchBy]);

  return (
    <>
      <div className=" flex flex-col justify-center items-center m-4 gap-6">
        <h1>SEARCH DATA</h1>
        <div>
          {" "}
          Enter id:{" "}
          <input
            type="number"
            id="rno"
            name="rno"
            value={fdata.rno}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          {" "}
          Enter name:{" "}
          <input
            type="text"
            name="fname"
            id="fname"
            value={fdata.fname}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          {" "}
          Enter school:{" "}
          <input
            type="text"
            id="school"
            name="school"
            value={fdata.school}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <select
          name="course"
          id="course"
          value={fdata.course}
          onChange={(e) => handleChange(e)}
        >
          <option name="ba" value="BA">
            BA
          </option>
          <option name="bca" value="BCA">
            BCA
          </option>
          <option name="b.tech" value="B.TECH">
            B.TECH
          </option>
        </select>

        <Button type="primary" onClick={(e) => handleSubmit(e)}>
          Submit
        </Button>
        <div>
          <label htmlFor="search">Choose a below:</label>
          <select
            id="search"
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
          >
            <option value="id">id</option>
            <option value="name">name</option>
            <option value="school">school</option>
            <option value="course">courses</option>
          </select>
        </div>
        <input
          type="search"
          placeholder="search"
          className="search"
          style={{ position: "sticky", top: "0", left: "0" }}
          onChange={(e) => setFilter(e.target.value)}
        />

        <Search demo={filteredData()} />
      </div>
    </>
  );
}

export default App;
