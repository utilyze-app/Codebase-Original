import { useState, useEffect } from "react";
import Map from "./Map";
import LoadingPage from "./LoadingPage";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? <LoadingPage /> : <Map />}
    </>
  );
}

export default App;
