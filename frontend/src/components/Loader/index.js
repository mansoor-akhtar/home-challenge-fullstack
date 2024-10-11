import { Spinner } from "react-bootstrap";

const Loader = () => {
    return (
        <div className="text-center app-spinner">
        <Spinner className="w-100 h-100" animation="border" variant="light"  size="xl" />
        </div>
    );
}

export default Loader;