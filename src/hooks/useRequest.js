import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useRequest(
  url,
  defaultValue = null,
  prepareData = data => data
) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(defaultValue);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setData(defaultValue);
    setError(null);

    axios
      .get(url)
      .then(res => {
        const { data } = res;
        setData(prepareData(data));
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return [data, error, loading];
}
