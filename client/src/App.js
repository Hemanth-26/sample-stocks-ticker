import { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

function App() {
  var oneDayBefore = new Date();
  const [stockSym, setStockSym] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [stocksData, setStocksData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setStocksData();
    setErrorMsg();
    if (stockSym && startDate) {
      console.log("On Submit", stockSym, startDate.toLocaleDateString("en-CA"));
      const formatedData = startDate.toLocaleDateString("en-CA");
      try {
        const response = await axios.post(
          `http://localhost:5000/api/fetchStockData?stock=${stockSym}&date=${formatedData}`
        );
        setStocksData(response.data);
      } catch (error) {
        // console.error(error);
        setErrorMsg(error.response.data.message);
      }
    }
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-md-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-10">
            <div className="card bg-light text-white">
              <div className="card-body p-5 text-center">
                <form className="my-md-2 pb-5" onSubmit={onSubmitHandler}>
                  <h2 className="heading mb-5">Stocks Ticker Data</h2>
                  <div className="d-flex flex-column flex-lg-row justify-content-evenly w-100">
                    <div className="form-floating mb-3 w-30">
                      <input
                        type="text"
                        className="form-control"
                        id="stockInput"
                        placeholder="Ex: AAPL"
                        value={stockSym}
                        onChange={(e) => setStockSym(e.target.value)}
                      />
                      <label htmlFor="stockInput">Stock Symbol</label>
                    </div>

                    <div className="date-picker-con form-floating w-30 mb-3">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="form-control"
                        maxDate={oneDayBefore.setDate(
                          oneDayBefore.getDate() - 1
                        )}
                        placeholderText="Select a date"
                      />
                    </div>

                    <div className="submit-btn">
                      <button
                        className="btn btn-outline-dark btn-lg"
                        type="submit"
                      >
                        Get Data
                      </button>
                    </div>
                  </div>

                  {/* <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    
                  </div> */}
                </form>
                {stocksData?.status === "OK" && (
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">Symbol</th>
                          <th scope="col">Open</th>
                          <th scope="col">High</th>
                          <th scope="col">Low</th>
                          <th scope="col">Close</th>
                          <th scope="col">Volume</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">{stocksData?.symbol}</th>
                          <td>{stocksData?.open}</td>
                          <td>{stocksData?.high}</td>
                          <td>{stocksData?.low}</td>
                          <td>{stocksData?.close}</td>
                          <td>{stocksData?.volume}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
                {errorMsg && <div className="err-msg">{errorMsg}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
