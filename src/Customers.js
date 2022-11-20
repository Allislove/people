import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const Customers = () => {
  const [country, setCountry] = useState();
  const [name, setName] = useState("");
  const [uCountry, setuCountry] = useState("");

  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  const url = "https://restcountries.com/v3.1/all";
  // console.log(country);
  useEffect(() => {
    const gettingCountry = async () => {
      try {
        await axios.get(url, options).then((response) => {
          const data = response.data;
          // console.log(data);
          // console.log("****** FROM useEffect");
          setCountry(data);
        });
      } catch (error) {
        console.error(error);
        return error;
      }
    };

    gettingCountry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const sentData = async (e) => {
    const addCustomer = `http://localhost:7000/customers  `;


   // e.preventDefault();
    const data = {
      id: "6", // esto sera manejado con algun paquete para id's automaticos
      name: name,
      country: uCountry,
    };

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    await axios
      .post(addCustomer, data, { headers: headers })
      .then((res) => {
        const data = res.data;
        console.log(data);
        console.log("heyyyy");
        //console.log(data.message);
        if (data.Message === "SUCCESS") {
          alert("Customer creado con exito");
          // window.location.href = "/";
        }
        console.log("******__****: ", res);
      })
      .catch((err) => {
        throw err;
      });
  };

  if (!country) return "Cargando contenido...";
  return (
    <section className="">
      {/* { country.alpha3Code } */}
      <form onSubmit={handleSubmit(sentData)}>
        <p> Ingresa tus datos</p>
        <input
          {...register("fullName", { required: true })}
          placeholder={"Ingresa tu nombre"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {errors.fullName && <p>Full name is required.</p>}
        <p>
          <select
            onChange={(e) => setuCountry(e.target.value)}
          >
            {country.map((item, id) => (
              <option key={id} value={item.name.common}>
                {item.name.common}
              </option>
            ))}
          </select>
        </p>
        <input type="submit" />
      </form>
    </section>
  );
};

export default Customers;
