import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

import "./App.css";

function App() {
  const [input, setInputs] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [data, setData] = useState();

  const handleChange = (e) => {
    setInputs(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!input) {
      return;
    }
    const dataSend = {
      query: input,
      option: false,
    };
    setIsSearch(true);
    try {
      const res = await axios.post(
        "http://10.13.85.138:8080/cluster",
        dataSend,
        {
          headers: {
            "Content-Type": "application/json", // Set the content type if needed
            "Access-Control-Allow-Origin": "*", // Your CORS header
            "Access-Control-Allow-Headers": "X-Requested-With", // Your CORS header
          },
        }
      );
      setData(res.data);
      setIsSearch(false);
    } catch (error) {
      setData();
      setIsSearch(false);
      console.log(error);
    }
  };
  console.log(data);
  const handleKeyDown = async (e) => {
    if (!input) {
      return;
    }
    console.log(input);
    if (e.key == "Enter") {
      const dataSend = {
        query: input,
        option: false,
      };
      setIsSearch(true);
      try {
        const res = await axios.post(
          "http://10.13.85.138:8080/cluster",
          dataSend,
          {
            headers: {
              "Content-Type": "application/json", // Set the content type if needed
              "Access-Control-Allow-Origin": "*", // Your CORS header
              "Access-Control-Allow-Headers": "X-Requested-With", // Your CORS header
            },
          }
        );
        setData(res.data);
        setIsSearch(false);
      } catch (error) {
        setData();
        setIsSearch(false);
        console.log(error);
      }
    }
  };

  return (
    <div className={data ? "container1" : "container"}>
      <h1 className="title">SEARCH</h1>
      <div className="searchContainer">
        <input
          type="text"
          className="inputContainer"
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
        <button className="btnContainer" onClick={handleClick}>
          {isSearch ? (
            <TailSpin
              height="3rem"
              width="3rem"
              color="#4fa94d"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            <BsSearch className="icon" />
          )}
        </button>
      </div>
      {data &&
        data.map((item, index) => (
          <div className="answerContainer" key={index}>
            <h3 className="answerContainer_title">Question : {item.title}</h3>
            {/* <div>
              {item.body.replace("\n","")}
            </div> */}
            <div
              dangerouslySetInnerHTML={{ __html: item.body.replace("\n", "") }}
              className="answers"
            />
            <h3 className="answerContainer_distance">
              Distance : {item.distance}
            </h3>
          </div>
        ))}
    </div>
  );
}

export default App;
