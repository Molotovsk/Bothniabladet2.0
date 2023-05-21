
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import {basketPrice, clearBasket, getBasket} from "@/pages/[id]";
import Image from "next/image";
import Link from "next/link";

function checkFocus() {
    if (document.activeElement.id === "card2") {
        if (document.getElementById("card2").value.length === 4) {
            document.getElementById("card3").focus();
        }
    }
    if (document.activeElement.id === "card3") {
        if (document.getElementById("card3").value.length === 4) {
            document.getElementById("card4").focus();
        }
    }
}

function getMonth() {
    // Ta bort ?
}

function App() {
    const router = useRouter();

    const [formValid, setFormValid] = useState({
        kort: false,
        faktura: false,
    });
    const [showPopup, setShowPopup] = useState(false);

    const handleInputChange = () => {
        const inputs = document.querySelectorAll('.checkout-input');
        let kortIsValid = true;
        let fakturaIsValid = true;

        inputs.forEach(input => {
            if (!input.value) {
                if (input.name === "Förnamn" || input.name === "Efternamn" || input.name === "Email" || input.name === "Adress") {
                    fakturaIsValid = false;
                } else {
                    kortIsValid = false;
                }
            }
        });

        setFormValid({
            kort: kortIsValid,
            faktura: fakturaIsValid,
        });
    };

    const handleBetalaNuClick = (paymentType) => {
        const isValid = paymentType === "kort" ? formValid.kort : formValid.faktura;

        if (!isValid) {
            alert('Please fill in all fields before proceeding.');
            return;
        }

        clearBasket();

        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 10000);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    useEffect(() => {
        if (showPopup) {
            // Funkar ej
            const timeout = setTimeout(() => {
                setShowPopup(false);
            }, 3000);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [showPopup]);

    const price = basketPrice();

    return (
        <div className="container">
            <style jsx>{`
        .checkout-page {
          background-color: #fff;
          border-radius: 10px;
          padding: 30px;
          max-width: 50%;
          margin: 50px auto; /* Adjust the margin-top value as desired */
          outline: 2px solid #000;
        }

        .heading {
          text-align: center;
          font-size: 48px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-weight: bold;
        }

        .card-number-inputs {
          display: flex;
          margin-bottom: 20px;
        }

        .card-number-input {
          flex: 1;
          margin-right: 10px;
          max-width: 80px; /* Adjust the width as desired */
          outline: 2px solid #000;
        }

        .expiration-inputs {
          display: flex;
          margin-bottom: 20px;
        }

        .expiration-select {
          flex: 1;
          margin-right: 10px;
          outline: 2px solid #000;
        }

        .expiration-input {
          flex: 1;
          margin-right: 10px;
          outline: 2px solid #000;
        }

        .checkout-input {
          width: 100%;
          margin-bottom: 20px;
          outline: 2px solid #000;
        }

        .amount-label {
          font-weight: bold;
        }

        .amount-value {
          margin-left: 10px;
        }

        .checkout-buttons {
          display: flex;
          justify-content: space-between;
        }

        .checkout-button {
          flex: 1;
          margin-right: 10px;
        }
      `}</style>
            <div className="checkout-page">
                <div className="form-group" id="basket">
                    <label className="amount-label">Din varukorg:</label>
                    {getBasket().map((image) => {
                        return (
                            <li key={image.id} className="flex flex-col items-center">
                                <h1 className="mr-auto"> {image.title} </h1>
                            </li>
                        );
                    })}
                    <button className="btn btn-sm btn-primary me-1 mt-4" onClick={changeBasket}> Rensa varukorg </button>
                </div>
            </div>
            <div className="checkout-page">
                <h1 className="heading">Kassa</h1>
                <form id="myForm">
                    <div className="form-group">
                        <label>Kortnummer</label>
                        <div className="card-number-inputs">
                            <input
                                type="text"
                                placeholder="xxxx"
                                className="card-number-input"
                                id="card1"
                                maxLength="4"
                                autoFocus
                                required
                                onInput={checkFocus}
                            />
                            <input
                                type="text"
                                placeholder="xxxx"
                                className="card-number-input"
                                id="card2"
                                maxLength="4"
                                required
                                onInput={checkFocus}
                            />
                            <input
                                type="text"
                                placeholder="xxxx"
                                className="card-number-input"
                                id="card3"
                                maxLength="4"
                                required
                                onInput={checkFocus}
                            />
                            <input
                                type="text"
                                placeholder="xxxx"
                                className="card-number-input"
                                id="card4"
                                maxLength="4"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Giltighetsdatum</label>
                        <div className="expiration-inputs">
                            <select
                                name="month"
                                className="expiration-select"
                                placeholder="month"
                                onChange={getMonth}
                                required
                            >
                                <option value="">Månad</option>
                                <option value="01">Januari</option>
                                <option value="02">Februari</option>
                                <option value="03">Mars</option>
                                <option value="04">April</option>
                                <option value="05">Maj</option>
                                <option value="06">Juni</option>
                                <option value="07">Juli</option>
                                <option value="08">Augusti</option>
                                <option value="09">September</option>
                                <option value="10">Oktober</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                            <select
                                name="year"
                                className="expiration-select"
                                placeholder="year"
                                required
                            >
                                <option value="">År</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                                <option value="2029">2029</option>
                                <option value="2030">2030</option>
                                <option value="2031">2031</option>
                                <option value="2032">2032</option>
                            </select>
                            <input
                                type="password"
                                placeholder="cvv"
                                className="expiration-input"
                                name="cvv"
                                maxLength="3"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Förnamn"
                            className="checkout-input"
                            name="Förnamn"
                            required
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="Efternamn"
                            className="checkout-input"
                            name="Efternamn"
                            required
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="Adress"
                            className="checkout-input"
                            name="Adress"
                            required
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="Email"
                            className="checkout-input"
                            name="Email"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label className="amount-label">Pris:</label>
                        <span className="amount-value"> {price} </span>
                    </div>
                    <div className="checkout-buttons">
                        <button
                            className="checkout-button"
                            style={{
                                backgroundColor: 'black',
                                color: 'white'
                            }}
                            onClick={() => handleBetalaNuClick("kort")}
                            disabled={!formValid.kort}
                        >
                            Betala med kort
                        </button>
                        <button
                            className="checkout-button"
                            style={{
                                backgroundColor: 'black',
                                color: 'white'
                            }}
                            onClick={() => handleBetalaNuClick("faktura")}
                            disabled={!formValid.faktura}
                        >
                            Betala med Faktura
                        </button>
                        <button
                            className="checkout-button"
                            style={{
                                backgroundColor: 'black',
                                color: 'white'
                            }}
                            onClick={cancelBuy}
                        >
                            Avbryt
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export function changeBasket(){
    clearBasket();
    location.reload();
}

export function cancelBuy(){
    clearFields();
    changeBasket();
}

export function clearFields(){
    document.getElementById("myForm").reset();
}

export default App;
