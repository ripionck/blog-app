import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const ActivateAccount = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [message, setMessage] = useState("Activating your account...");

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:3001/api/users/activate?token=${token}`)
        .then((response) => {
          setMessage(response.data.message);
          setTimeout(() => navigate("/activation-success"), 2000);
        })
        .catch((error) => {
          setMessage(
            error.response?.data?.error || "Failed to activate account.",
          );
          setTimeout(() => navigate("/activation-error"), 2000);
        });
    } else {
      setMessage("Invalid activation link.");
    }
  }, [token, navigate]);

  return (
    <div>
      <h1>Account Activation</h1>
      <p>{message}</p>
    </div>
  );
};

export default ActivateAccount;
