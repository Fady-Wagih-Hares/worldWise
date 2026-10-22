import { useNavigate } from "react-router-dom";
import Button from "./Button";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        // u need to specify the number of steps that u need to get back
        navigate(-1);
      }}>
      &larr; Back
    </Button>
  );
};
export default BackButton;
