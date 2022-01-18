import { useState } from "react";
import { useRouter } from "next/router";

const preventDefault = (f) => (e) => {
  e.preventDefault();
  f(e);
};

export default function Newsletter({
  action = "https://api.follow.it/subscription-form/ZVFWZ1p6ZjNMbXpVTFdBU2dvUHJoampZZkFQSEFQQkExaU9aQ1V3b0V3c1h2c0NoaHBYK3pnbHhsQkY4cUpzYkU5WEJSbFV3OTg5L1dwUlBWZ3FGNEpyYWFtM3BXMEJTR2QwV3lNRkFhNTZ2cXJMT3QrcU9URkZMaDkzaVZFdGd8TnJoT21WTWl0UWRwWXArazBnR2YxWGxZOE9VeDlGdU13aFVkRjFQZHZaOD0=/8",
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleParam = (setValue) => (e) => setValue(e.target.value);

  const handleSubmit = preventDefault(() => {
    fetch(action, {
      body: query,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      method: "POST",
      redirect: "follow",
    })
      .then((res) => router(res))
      .then((err) => console.log(err));
  });

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={query}
        onChange={handleParam(setQuery)}
        placeholder="Search"
        aria-label="Search"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
