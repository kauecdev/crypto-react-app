import { useEffect, useState } from "react";
import axios from "axios";

import logo from "./assets/logo-crypto.png";
import searchIcon from "./assets/search.svg";

import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [crypto, setCrypto] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.coinstats.app/public/v1/coins?skip=0&limit=100¤cy=INR`)
      .then((res) => {
        console.log(res.data.coins);
        setCrypto(res.data.coins);
      });
  }, []);

  return (
    <div className="crypto-search">
      <h1>
        <img src={logo} alt="Crypto Search" />
      </h1>
      <div className="input-group">
        <input
          type="text"
          className="input-group__input"
          placeholder="Buscar por uma moeda..."
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <img
          src={searchIcon}
          alt="Pesquisar"
          title="Pesquisar"
          className="input-group__icon"
        />
      </div>
      <table>
        <thead>
          <tr>
            <td>Rank</td>
            <td>Nome</td>
            <td>Símbolo</td>
            <td>Valor de Mercado</td>
            <td>Preço</td>
            <td>Fornecimento Disponível</td>
            <td>Volume(24hrs)</td>
          </tr>
        </thead>
        <tbody>
          {crypto
            .filter((val) => {
              return val.name.toLowerCase().includes(search.toLowerCase());
            })
            .map((val, id) => {
              return (
                <>
                  <tr id={id}>
                    <td className="rank">{val.rank}</td>
                    <td className="logo">
                      <a href={val.websiteUrl}>
                        <img src={val.icon} alt="logo" width="30px" />
                      </a>

                      <p>{val.name}</p>
                    </td>
                    <td className="symbol">{val.symbol}</td>
                    <td>R$ {val.marketCap}</td>
                    <td>R$ {val.price?.toFixed(2)}</td>
                    <td>{val.availableSupply}</td>
                    <td>{val.volume?.toFixed(0)}</td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
