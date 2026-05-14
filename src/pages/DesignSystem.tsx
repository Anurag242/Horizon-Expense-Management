import { useState } from "react";
import styles from "./DesignSystem.module.css";
import Typography from "../components/ui/Typography";
import Button from "../components/ui/Button";
import Checkbox from "../components/ui/Checkbox";
import RadioButton from "../components/ui/RadioButton";
import { Input, TextArea } from "../components/ui/Input";
import Select from "../components/ui/Select";
import Badge from "../components/ui/Badge";
import Table from "../components/ui/Table";
import Modal from "../components/ui/Modal";
import Drawer from "../components/ui/Drawer";
import DatePicker from "../components/ui/DatePicker";
import { Plus, Search } from "lucide-react";

const DesignSystem = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Typography variant="h1" as="h1">Design System</Typography>
        <Typography variant="body1">Horizon Expense Management Foundation</Typography>
      </header>

      {/* Colors Section */}
      <section className={styles.section}>
        <Typography variant="h2" as="h2" className={styles.sectionTitle}>Colors</Typography>
        <div className={styles.grid}>
          {[
            { name: "Primary", color: "var(--color-brand-primary)" },
            { name: "Secondary", color: "var(--color-brand-secondary)" },
            { name: "Success", color: "var(--color-success)" },
            { name: "Error", color: "var(--color-error)" },
            { name: "Neutral 100", color: "var(--color-neutral-100)" },
            { name: "Neutral 90", color: "var(--color-neutral-90)" },
          ].map((c) => (
            <div key={c.name} className={styles.colorCard}>
              <div className={styles.colorPreview} style={{ backgroundColor: c.color }} />
              <div className={styles.colorInfo}>
                <Typography variant="body2">{c.name}</Typography>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography Section */}
      <section className={styles.section}>
        <Typography variant="h2" as="h2" className={styles.sectionTitle}>Typography</Typography>
        <div className={styles.componentRow}><Typography variant="h1">Heading 1 (36px Semibold)</Typography></div>
        <div className={styles.componentRow}><Typography variant="h2">Heading 2 (36px Semibold)</Typography></div>
        <div className={styles.componentRow}><Typography variant="h3">Heading 3 (24px Semibold)</Typography></div>
        <div className={styles.componentRow}><Typography variant="body1">Body 1 (16px Regular)</Typography></div>
        <div className={styles.componentRow}><Typography variant="body2">Body 2 (14px Regular)</Typography></div>
        <div className={styles.componentRow}><Typography variant="overline">Overline (10px Bold Uppercase)</Typography></div>
      </section>

      {/* Buttons Section */}
      <section className={styles.section}>
        <Typography variant="h2" as="h2" className={styles.sectionTitle}>Buttons</Typography>
        <div className={styles.componentRow}>
          <div className={styles.label}>Primary</div>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg" icon={<Plus size={18}/>}>Large with Icon</Button>
        </div>
        <div className={styles.componentRow}>
          <div className={styles.label}>Secondary</div>
          <Button variant="secondary" size="sm">Small</Button>
          <Button variant="secondary" size="md">Medium</Button>
          <Button variant="secondary" size="lg">Large</Button>
        </div>
      </section>

      {/* Selection Section */}
      <section className={styles.section}>
        <Typography variant="h2" as="h2" className={styles.sectionTitle}>Selection & Badges</Typography>
        <div className={styles.componentRow}>
          <Checkbox label="Checkbox Checked" checked />
          <Checkbox label="Checkbox Unchecked" />
          <Checkbox label="Checkbox Error" error />
        </div>
        <div className={styles.componentRow}>
          <RadioButton label="Radio Checked" checked />
          <RadioButton label="Radio Unchecked" />
          <RadioButton label="Radio Error" error />
        </div>
        <div className={styles.componentRow}>
          <Badge variant="approved">Approved</Badge>
          <Badge variant="pending">Pending</Badge>
          <Badge variant="rejected">Rejected</Badge>
          <Badge variant="error">System Error</Badge>
        </div>
      </section>

      {/* Inputs Section */}
      <section className={styles.section}>
        <Typography variant="h2" as="h2" className={styles.sectionTitle}>Inputs</Typography>
        <div className={styles.componentRow} style={{ maxWidth: '400px', display: 'block' }}>
          <Input label="Default Input" placeholder="Type something..." style={{ marginBottom: '20px' }} />
          <Input 
            label="Input with Icon" 
            leftAddon={<Search size={18}/>} 
            placeholder="Search..." 
            style={{ marginBottom: '20px' }}
          />
          <Select label="Dropdown Select" style={{ marginBottom: '20px' }}>
            <option>Option 1</option>
            <option>Option 2</option>
          </Select>
          <TextArea label="TextArea / Description" placeholder="Enter description..." />
        </div>
      </section>

      {/* Complex Components */}
      <section className={styles.section}>
        <Typography variant="h2" as="h2" className={styles.sectionTitle}>Complex Components</Typography>
        <div className={styles.componentRow}>
          <Button variant="secondary" onClick={() => setModalOpen(true)}>Open Modal Preview</Button>
          <Button variant="secondary" onClick={() => setDrawerOpen(true)}>Open Drawer Preview</Button>
        </div>
        <div className={styles.componentRow}>
          <DatePicker />
        </div>
      </section>

      {/* Table Section */}
      <section className={styles.section}>
        <Typography variant="h2" as="h2" className={styles.sectionTitle}>Tables</Typography>
        <Table>
          <Table.Header>
            <Table.HeaderCell>Invoice ID</Table.HeaderCell>
            <Table.HeaderCell>Vendor</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>#INV-001</Table.Cell>
              <Table.Cell>Google Cloud</Table.Cell>
              <Table.Cell>$1,200.00</Table.Cell>
              <Table.Cell><Badge variant="approved">Paid</Badge></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>#INV-002</Table.Cell>
              <Table.Cell>Amazon Web Services</Table.Cell>
              <Table.Cell>$850.00</Table.Cell>
              <Table.Cell><Badge variant="pending">Pending</Badge></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </section>

      {/* Modal & Drawer Instances */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        title="Sample Modal"
        supportText="This is a preview of the confirmation modal design."
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setModalOpen(false)}>Confirm</Button>
          </>
        }
      />

      <Drawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <Drawer.Header title="Filter Options" onClose={() => setDrawerOpen(false)} />
        <Drawer.Body>
          <Typography variant="body2" style={{ marginBottom: '20px' }}>
            Configure your filters below to refine the list results.
          </Typography>
          <Input label="Search Keyword" leftAddon={<Search size={18}/>} placeholder="Filter by name..." />
        </Drawer.Body>
        <Drawer.Footer>
          <Button variant="secondary" onClick={() => setDrawerOpen(false)}>Reset</Button>
          <Button onClick={() => setDrawerOpen(false)}>Apply</Button>
        </Drawer.Footer>
      </Drawer>
    </div>
  );
};

export default DesignSystem;
