import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import Image from '../images/blacklogo.png';
import './style.css';

function Donate() {
    const [paidFor, setPaidFor] = useState(false);
    const [loaded, setLoaded] = useState(false);
    let paypalRef = useRef();

    const product = {
        price: 100.00,
        description: "donation for coronavirus",
        img: "assets/fb.png"
    };

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.paypal.com/sdk/js?client-id=AbHIJkP9wZLOjgTPB1KbzBiqK7PYFyQHv--VjFQJ9n8JNwUtTTbFLSTVdWK2bnoGs6v7iqOG6wT-XrCj";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);

        if (loaded) {
            setTimeout(() => {
                window.paypal.Buttons({
                    createOrder: (data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    description: product.description,
                                    amount: {
                                        currency_code: "USD", // Changed currency_code to "USD"
                                        value: product.price
                                    }
                                }
                            ]
                        });
                    },
                    onApprove: async (data, actions) => {
                        const order = await actions.order.capture();
                        setPaidFor(true);
                        console.log(order);
                        console.log(data);
                    }
                }).render(paypalRef.current);
            });
        }
    }, [loaded]);

    return (
        <div className="App">
            {paidFor ? (
                <div style={{ padding: "20px" }}>
                    <h1>Thank you for your donation!</h1>
                    <img src={Image} alt='' width="500px" height="350px" />
                </div>
            ) : (
                <div>
                    <div className="inner_page_div" style={{ paddingTop: "30px" }}>
                        <h1 id="responsive_h1">Please help us jump start our non-profit organization by donating to our GoFundMe</h1>
                        <Button variant="info" href="https://www.gofundme.com/f/donationally?=customer&utm_medium=copy_link&utm_campaign=p_cf+share-flow-1">GoFundMe</Button>
                        <h3 style={{ paddingTop: "20px" }}></h3>
                        <h3 style={{ paddingTop: "20px" }}>PayPal buttons are in test mode! ({product.description} for ${product.price}).</h3>
                    </div>
                    <div ref={paypalRef} id="format" />
                </div>
            )}
        </div>
    );
}

export default Donate;
