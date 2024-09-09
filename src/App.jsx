import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react"

function App() {
  const[currencyData, setCurrencyData] = useState([]);
    const[filteredData, setFiliteredData] = useState([]);
    const currency = ['CAD', 'IDR', 'JPY', 'CHF', 'EUR', 'GBP'];
    const disc = 0.05;

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        filterData();
    }, [currencyData]);

    const getData = async () => {
        try{
            const dataApi = await fetch("https://api.currencyfreaks.com/v2.0/rates/latest?apikey=81454bd0bddc47d1b3a67cf740672d6f")
            const result = await dataApi.json();

            setCurrencyData(result);
        } catch (err) {
            console.log(err);
        }
    }

    const filterData = () => {
        let tempData = currency.map(function (data) {
            if(currencyData.length != 0){
                return currencyData.rates[data];
            } else {
                console.log("data not avail");
            }
        });
        setFiliteredData(tempData);
    }

    const handledWeBuy = (rate) => {
        return parseFloat(rate) + (parseFloat(rate) * disc);
    }

    const handleWeSell = (rate) => {
        return parseFloat(rate) - (parseFloat(rate) * disc);
    }

    return(
    <>
    <h1 class="text-center text-light mt-4">Currency Exchange</h1>
    <div class='container mt-4'>
        <table class="table table-borderless text-center border-0 text-light">
            <thead>
            <tr>
                <th></th>
                <th>We Buy</th>
                <th>Exchange Rate</th>
                <th>We Sell</th>
            </tr>
            </thead>
            <tbody>
            {currency.map(function(data, key) {
                return (<>
                <tr>
                    <th>
                        {data}
                    </th>
                    <td>
                        {filteredData.length === 0 ? '-' : handledWeBuy(filteredData[key])}
                    </td>
                    <td>
                        {filteredData.length === 0 ? '-' : filteredData[key]}
                    </td>
                    <td>
                        {filteredData.length === 0 ? '-' : handleWeSell(filteredData[key])}
                    </td>
                </tr>
                </>
                );
            })}
            </tbody>
        </table>
    </div>
    </>
    )
}

export default App;
