import React from "react";
import { Container, InputGroup, FormControl } from "react-bootstrap";
import axios from "axios";
import Coin from "./Coin";
import "./App.css";
import refresh from "./refresh.png";
export default function App() {
  const [coins, setCoins] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [refreshBtn, setRefreshBtn] = React.useState(false);
  function getApi() {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => setCoins(res.data));
  }
  function handleClick() {
    setRefreshBtn(!refreshBtn);
  }
  React.useEffect(() => {
    getApi();
  }, [refreshBtn]);
  function handleChange(e) {
    setSearch(e.target.value);
  }
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <Container className="header">
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "45px", color: "white" }}>
            Get prices of famous cryptocurrency
          </h1>
        </div>
        <InputGroup
          style={{ width: "50%", margin: "30px auto 30px auto" }}
          className="search"
        >
          <FormControl
            aria-label="Dollar amount (with dot and two decimal places)"
            placeholder="Search a currency"
            style={{
              width: "50%",
              borderRadius: "20px",
              backgroundColor: "#1F1C2C",
              color: "#FFFFFF",
            }}
            onChange={handleChange}
          />
          <button onClick={handleClick}>
            <img src={refresh} alt="refresh" className="image" />
          </button>
        </InputGroup>
        {filteredCoins.map((coin) => {
          return (
            <Coin
              key={coin.id}
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              marketCap={coin.market_cap}
              price={coin.current_price}
              priceChange={coin.price_change_percentage_24h}
              volume={coin.total_volume}
            />
          );
        })}
      </Container>
    </div>
  );
}
