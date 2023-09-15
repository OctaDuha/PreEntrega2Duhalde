import { collection, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../service/firebase";
import fetchSimultion from "../../utils/fetchSimulation";
import productos from "../../utils/products";
import CardItem from "./CardItem";

const DetailsItem = (props) => {
  const [product, setProduct] = useState();
  const { idItem } = useParams();
  const [producto, setProducto] = useState({});
  const [loader, setLoader] = useState(false);
  const { id, doc } = useParams();
  const [error, setError] = useState();

  //useEffect(() => {
  //  fetchSimultion(productos.filter((flt) => flt.id === idItem)[0], 2000)
  //    .then((resp) => setProduct(resp))
  //    .catch((error) => error);
  //}, [idItem]);

  useEffect(() => {
    setLoader(true);
    const collectionProd = collection(db, "productos");
    const referenciaAlDoc = doc(collectionProd, id);
    getDoc(referenciaAlDoc)
      .then((res) => setProducto({ id: res.id, ...res.data() }))
      .catch((e) => setError(e))
      .finally(() => setLoader(false));
  }, []);

  return (
    <div className="detailsItem">
      {product && <CardItem product={product} />}
    </div>
  );
};

export default DetailsItem;
