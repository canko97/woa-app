import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import { Store } from "react-notifications-component";

const StocksComponent = ({ socket }) => {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:9480/getStockData")
            .then((result) => {
                setStocks(result.data);
            })
            .catch((err) => {
                console.log(err);
            });
        console.log("initial render");
    }, []);

    useEffect(() => {
        socket.on("updatedStock", (data) => {
            updateStock(data);
            console.log("rendered");
        });
        return () => {
            socket.off("updatedStock");
        };
    }, [stocks]);

    const updateStock = (updatedStock) => {
        const findStockIndex = stocks.findIndex(
            (o) => o.name === updatedStock.name
        );
        const stocksArray = [...stocks];
        stocksArray[findStockIndex] = updatedStock;
        setStocks(stocksArray);
        showNotification(
            JSON.stringify(updatedStock.name),
            JSON.stringify(updatedStock.value)
        );
    };

    const showNotification = (stockName, stockPrice) => {
        Store.addNotification({
            title: `${stockName} new price: $${stockPrice}`,
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 3000,
                onScreen: true,
            },
        });
    };

    return (
        <div className="row">
            <ReactNotifications />
            <Table striped bordered hover /*variant="dark"*/>
                <thead>
                    <tr>
                        {/* <th>#</th> */}
                        <th>Name</th>
                        <th>Value</th>
                        <th>Percentage</th>
                        <th>Change</th>
                    </tr>
                </thead>
                <tbody>
                    {stocks &&
                        stocks.map((stock) => (
                            <tr>
                                {/* <td>{JSON.stringify(stock.index)}</td> */}
                                <td>{JSON.stringify(stock.name)}</td>
                                <td>${JSON.stringify(stock.value)}</td>
                                <td>{JSON.stringify(stock.percentage)} %</td>
                                <td>
                                    {stock.change > 0 ? (
                                        <div>
                                            <BsFillArrowUpSquareFill
                                                color="green"
                                                fontSize={30}
                                            />{" "}
                                            {JSON.stringify(stock.change)}
                                        </div>
                                    ) : (
                                        <div>
                                            <BsFillArrowDownSquareFill
                                                color="red"
                                                fontSize={30}
                                            />{" "}
                                            {JSON.stringify(stock.change)}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>

            <ul></ul>
        </div>
    );
};

export default StocksComponent;
