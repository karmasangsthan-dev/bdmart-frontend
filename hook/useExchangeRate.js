import { useEffect, useState } from "react";
import axios from "axios";

export const useExchangeRate = (baseCurrency, targetCurrency) => {
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get(
          `http://api.currencylayer.com/live?access_key=0c73c4d2c0be523379556989e5e1c6f6convert&from=EUR&to=GBP&amount=100`
        );

        const rates = response?.data?.rates;
        const rate = rates[targetCurrency];
        setExchangeRate(rate);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    fetchExchangeRate();
  }, [baseCurrency, targetCurrency]);

  console.log(exchangeRate);
  return exchangeRate;
};
