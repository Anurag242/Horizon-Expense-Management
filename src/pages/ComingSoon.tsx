import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import styles from "./ComingSoon.module.css";
import Typography from "../components/ui/Typography";
import Button from "../components/ui/Button";
import { Hammer, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ComingSoon = ({ title }: { title: string }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <TopBar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div className={styles.illustration}>
            <Hammer size={80} strokeWidth={1.5} />
          </div>
          
          <Typography variant="h1" as="h1" className={styles.title}>
            {title} is Coming Soon
          </Typography>
          
          <Typography variant="body1" className={styles.description}>
            We're currently working hard to bring the {title} module to your portal. 
            Stay tuned for updates on this feature!
          </Typography>

          <div className={styles.actions}>
            <Button variant="secondary" icon={<ArrowLeft size={18} />} onClick={() => navigate(-1)}>
              Go Back
            </Button>
            <Button onClick={() => navigate("/dashboard")}>
              Return to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
