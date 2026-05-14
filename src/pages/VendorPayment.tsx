import React from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import styles from "./VendorPayment.module.css";
import { Plus, Download, Filter } from "lucide-react";
import InvoiceDetailsDrawer from "../components/InvoiceDetailsDrawer";
import { useNavigate } from "react-router-dom";

const allInvoicesData = [
  { name: "Hathway Broadband", total: "AED 210.00", checkedBy: "Aanya Singh", approvedBy: "Arman Mallik", dueDate: "22/08/2023", scheduled: "No", status: "Paid", invoiceNumber: "HB-787236", amountWithoutVat: "AED 200.00", vat: "5%", payableAmount: "AED 210.00", invoiceDate: "01/05/2023", description: "Wifi Bill" },
  { name: "Adobe Systems", total: "AED 450.00", checkedBy: "Aanya Singh", approvedBy: "Arman Mallik", dueDate: "23/08/2023", scheduled: "Yes", status: "Pending", invoiceNumber: "AD-90823", amountWithoutVat: "AED 428.57", vat: "5%", payableAmount: "AED 450.00", invoiceDate: "15/08/2023", description: "Creative Cloud Subscription" },
  { name: "Cafe Coffee Day", total: "AED 85.00", checkedBy: "Vikram Raj", approvedBy: "Arman Mallik", dueDate: "24/08/2023", scheduled: "-", status: "Paid", invoiceNumber: "CCD-1122", amountWithoutVat: "AED 80.95", vat: "5%", payableAmount: "AED 85.00", invoiceDate: "20/08/2023", description: "Client Meeting Refreshments" },
  { name: "Facebook Ads", total: "AED 1,200.00", checkedBy: "Aanya Singh", approvedBy: "Arman Mallik", dueDate: "25/08/2023", scheduled: "Yes", status: "Pending", invoiceNumber: "FB-MAR-23", amountWithoutVat: "AED 1,142.86", vat: "5%", payableAmount: "AED 1,200.00", invoiceDate: "22/08/2023", description: "Marketing Campaign - Summer" },
  { name: "Google Ads", total: "AED 320.00", checkedBy: "Priya Sharma", approvedBy: "Arman Mallik", dueDate: "26/08/2023", scheduled: "No", status: "Pending", invoiceNumber: "G-ADS-009", amountWithoutVat: "AED 304.76", vat: "5%", payableAmount: "AED 320.00", invoiceDate: "24/08/2023", description: "Search Engine Marketing" },
  { name: "Google Email Services", total: "AED 210.00", checkedBy: "Aanya Singh", approvedBy: "Arman Mallik", dueDate: "27/08/2023", scheduled: "-", status: "Paid", invoiceNumber: "G-WRK-881", amountWithoutVat: "AED 200.00", vat: "5%", payableAmount: "AED 210.00", invoiceDate: "01/08/2023", description: "Google Workspace Renewal" },
  { name: "Microsoft Azure", total: "AED 3,500.00", checkedBy: "Sanjay Dutt", approvedBy: "Arman Mallik", dueDate: "28/08/2023", scheduled: "-", status: "Paid", invoiceNumber: "MS-AZ-445", amountWithoutVat: "AED 3,333.33", vat: "5%", payableAmount: "AED 3,500.00", invoiceDate: "20/08/2023", description: "Cloud Hosting Services" },
  { name: "AWS Services", total: "AED 1,200.00", checkedBy: "Aanya Singh", approvedBy: "Arman Mallik", dueDate: "29/08/2023", scheduled: "No", status: "Paid", invoiceNumber: "AWS-990-Q", amountWithoutVat: "AED 1,142.86", vat: "5%", payableAmount: "AED 1,200.00", invoiceDate: "15/08/2023", description: "S3 Storage & EC2 Instances" },
  { name: "Slack Technologies", total: "AED 300.00", checkedBy: "Aanya Singh", approvedBy: "Arman Mallik", dueDate: "30/08/2023", scheduled: "-", status: "Paid", invoiceNumber: "SLK-7712", amountWithoutVat: "AED 285.71", vat: "5%", payableAmount: "AED 300.00", invoiceDate: "28/08/2023", description: "Pro Plan Subscription" },
  { name: "Zoom Video", total: "AED 150.00", checkedBy: "Vikram Raj", approvedBy: "Arman Mallik", dueDate: "31/08/2023", scheduled: "Yes", status: "Pending", invoiceNumber: "ZM-122-PX", amountWithoutVat: "AED 142.86", vat: "5%", payableAmount: "AED 150.00", invoiceDate: "29/08/2023", description: "Webinar Add-on" },
  { name: "Zomato Business", total: "AED 85.00", checkedBy: "Aanya Singh", approvedBy: "Arman Mallik", dueDate: "01/09/2023", scheduled: "No", status: "Paid", invoiceNumber: "ZOM-OFF-9", amountWithoutVat: "AED 80.95", vat: "5%", payableAmount: "AED 85.00", invoiceDate: "30/08/2023", description: "Office Lunch Catering" },
  { name: "Dropbox Inc", total: "AED 200.00", checkedBy: "Priya Sharma", approvedBy: "Arman Mallik", dueDate: "02/09/2023", scheduled: "Yes", status: "Pending", invoiceNumber: "DB-55421", amountWithoutVat: "AED 190.48", vat: "5%", payableAmount: "AED 200.00", invoiceDate: "01/09/2023", description: "Backup Services" },
  { name: "Notion Labs", total: "AED 160.00", checkedBy: "Aanya Singh", approvedBy: "Arman Mallik", dueDate: "03/09/2023", scheduled: "-", status: "Paid", invoiceNumber: "NT-9081", amountWithoutVat: "AED 152.38", vat: "5%", payableAmount: "AED 160.00", invoiceDate: "01/09/2023", description: "Team Wiki Subscription" },
  { name: "Figma Design", total: "AED 480.00", checkedBy: "Sanjay Dutt", approvedBy: "Arman Mallik", dueDate: "04/09/2023", scheduled: "-", status: "Paid", invoiceNumber: "FIG-DES-2", amountWithoutVat: "AED 457.14", vat: "5%", payableAmount: "AED 480.00", invoiceDate: "02/09/2023", description: "Designer Licenses" },
  { name: "Canva Pro", total: "AED 130.00", checkedBy: "Aanya Singh", approvedBy: "Arman Mallik", dueDate: "05/09/2023", scheduled: "No", status: "Pending", invoiceNumber: "CAN-991", amountWithoutVat: "AED 123.81", vat: "5%", payableAmount: "AED 130.00", invoiceDate: "03/09/2023", description: "Social Media Templates" },
];

const dueInvoicesData = [
  { name: "Hathway Broadband", total: "AED 210.00", checkedBy: "Aanya Singh", approvedBy: "Arman Mallik", dueDate: "22/08/2023", status: "Pending", invoiceNumber: "HB-787236", amountWithoutVat: "AED 200.00", vat: "5%", payableAmount: "AED 210.00", invoiceDate: "01/05/2023", description: "Wifi Bill" },
  { name: "Airtel Fiber", total: "AED 150.00", checkedBy: "Vikram Raj", approvedBy: "Arman Mallik", dueDate: "23/08/2023", status: "Pending", invoiceNumber: "AIR-FB-91", amountWithoutVat: "AED 142.86", vat: "5%", payableAmount: "AED 150.00", invoiceDate: "10/08/2023", description: "Office Internet" },
  { name: "Oracle Cloud", total: "AED 2,100.00", checkedBy: "Sanjay Dutt", approvedBy: "Arman Mallik", dueDate: "24/08/2023", status: "Pending", invoiceNumber: "ORC-CLD-3", amountWithoutVat: "AED 2,000.00", vat: "5%", payableAmount: "AED 2,100.00", invoiceDate: "15/08/2023", description: "Database Services" },
  { name: "Uber for Business", total: "AED 850.00", checkedBy: "Priya Sharma", approvedBy: "Arman Mallik", dueDate: "25/08/2023", status: "Pending", invoiceNumber: "UBR-902", amountWithoutVat: "AED 809.52", vat: "5%", payableAmount: "AED 850.00", invoiceDate: "20/08/2023", description: "Employee Commute" },
  { name: "Starbucks Coffee", total: "AED 120.00", checkedBy: "Aanya Singh", approvedBy: "Arman Mallik", dueDate: "26/08/2023", status: "Pending", invoiceNumber: "SBUX-11", amountWithoutVat: "AED 114.29", vat: "5%", payableAmount: "AED 120.00", invoiceDate: "24/08/2023", description: "Internal Workshop Snacks" },
  { name: "FedEx Delivery", total: "AED 45.00", checkedBy: "Vikram Raj", approvedBy: "Arman Mallik", dueDate: "27/08/2023", status: "Pending", invoiceNumber: "FDX-772", amountWithoutVat: "AED 42.86", vat: "5%", payableAmount: "AED 45.00", invoiceDate: "25/08/2023", description: "Document Shipping" },
  { name: "Facebook Ads", total: "AED 1,200.00", checkedBy: "Aanya Singh", approvedBy: "Arman Mallik", dueDate: "25/08/2023", status: "Pending", invoiceNumber: "FB-MAR-23", amountWithoutVat: "AED 1,142.86", vat: "5%", payableAmount: "AED 1,200.00", invoiceDate: "22/08/2023", description: "Marketing Campaign" },
  { name: "Google Ads", total: "AED 320.00", checkedBy: "Priya Sharma", approvedBy: "Arman Mallik", dueDate: "26/08/2023", status: "Pending", invoiceNumber: "G-ADS-009", amountWithoutVat: "AED 304.76", vat: "5%", payableAmount: "AED 320.00", invoiceDate: "24/08/2023", description: "SEM Campaign" },
  { name: "Adobe Systems", total: "AED 450.00", checkedBy: "Aanya Singh", approvedBy: "Arman Mallik", dueDate: "23/08/2023", status: "Pending", invoiceNumber: "AD-90823", amountWithoutVat: "AED 428.57", vat: "5%", payableAmount: "AED 450.00", invoiceDate: "15/08/2023", description: "Creative Cloud" },
  { name: "Zoom Video", total: "AED 150.00", checkedBy: "Vikram Raj", approvedBy: "Arman Mallik", dueDate: "31/08/2023", status: "Pending", invoiceNumber: "ZM-122-PX", amountWithoutVat: "AED 142.86", vat: "5%", payableAmount: "AED 150.00", invoiceDate: "29/08/2023", description: "Zoom Pro" },
  { name: "Dropbox Inc", total: "AED 200.00", checkedBy: "Priya Sharma", approvedBy: "Arman Mallik", dueDate: "02/09/2023", status: "Pending", invoiceNumber: "DB-55421", amountWithoutVat: "AED 190.48", vat: "5%", payableAmount: "AED 200.00", invoiceDate: "01/09/2023", description: "Storage" },
  { name: "Canva Pro", total: "AED 130.00", checkedBy: "Aanya Singh", approvedBy: "Arman Mallik", dueDate: "05/09/2023", status: "Pending", invoiceNumber: "CAN-991", amountWithoutVat: "AED 123.81", vat: "5%", payableAmount: "AED 130.00", invoiceDate: "03/09/2023", description: "Design Tool" },
];

const scheduledInvoicesData = [
  { name: "Hathway Broadband", total: "AED 210.00", checkedBy: "Aanya Singh", approvedBy: "Arman Mallik", dueDate: "10/05/2024", scheduledDate: "08/05/2024", status: "Pending", invoiceNumber: "HB-787236", amountWithoutVat: "AED 200.00", vat: "5%", payableAmount: "AED 210.00", invoiceDate: "01/05/2023", description: "Wifi Bill" },
  { name: "Reliance Jio", total: "AED 180.00", checkedBy: "Vikram Raj", approvedBy: "Arman Mallik", dueDate: "12/05/2024", scheduledDate: "10/05/2024", status: "Pending", invoiceNumber: "RJ-9901", amountWithoutVat: "AED 171.43", vat: "5%", payableAmount: "AED 180.00", invoiceDate: "05/05/2024", description: "Broadband Service" },
  { name: "DigitalOcean", total: "AED 45.00", checkedBy: "Sanjay Dutt", approvedBy: "Arman Mallik", dueDate: "15/05/2024", scheduledDate: "13/05/2024", status: "Pending", invoiceNumber: "DO-2231", amountWithoutVat: "AED 42.86", vat: "5%", payableAmount: "AED 45.00", invoiceDate: "10/05/2024", description: "Hosting Droplets" },
  { name: "Adobe Systems", total: "AED 450.00", checkedBy: "Aanya Singh", approvedBy: "Arman Mallik", dueDate: "12/05/2024", scheduledDate: "10/05/2024", status: "Pending", invoiceNumber: "AD-90823", amountWithoutVat: "AED 428.57", vat: "5%", payableAmount: "AED 450.00", invoiceDate: "15/08/2023", description: "Creative Cloud" },
  { name: "Facebook Ads", total: "AED 1,200.00", checkedBy: "Aanya Singh", approvedBy: "Arman Mallik", dueDate: "15/05/2024", scheduledDate: "13/05/2024", status: "Pending", invoiceNumber: "FB-MAR-23", amountWithoutVat: "AED 1,142.86", vat: "5%", payableAmount: "AED 1,200.00", invoiceDate: "22/08/2023", description: "Ad Spend" },
  { name: "Zoom Video", total: "AED 150.00", checkedBy: "Vikram Raj", approvedBy: "Arman Mallik", dueDate: "18/05/2024", scheduledDate: "16/05/2024", status: "Pending", invoiceNumber: "ZM-122-PX", amountWithoutVat: "AED 142.86", vat: "5%", payableAmount: "AED 150.00", invoiceDate: "29/08/2023", description: "Zoom Plan" },
  { name: "Dropbox Inc", total: "AED 200.00", checkedBy: "Priya Sharma", approvedBy: "Arman Mallik", dueDate: "20/05/2024", scheduledDate: "18/05/2024", status: "Pending", invoiceNumber: "DB-55421", amountWithoutVat: "AED 190.48", vat: "5%", payableAmount: "AED 200.00", invoiceDate: "01/09/2023", description: "Storage Subscription" },
  { name: "Microsoft Azure", total: "AED 3,500.00", checkedBy: "Sanjay Dutt", approvedBy: "Arman Mallik", dueDate: "22/05/2024", scheduledDate: "20/05/2024", status: "Pending", invoiceNumber: "MS-AZ-445", amountWithoutVat: "AED 3,333.33", vat: "5%", payableAmount: "AED 3,500.00", invoiceDate: "20/08/2023", description: "Azure Hosting" },
  { name: "Google Ads", total: "AED 320.00", checkedBy: "Priya Sharma", approvedBy: "Arman Mallik", dueDate: "25/05/2024", scheduledDate: "23/05/2024", status: "Pending", invoiceNumber: "G-ADS-009", amountWithoutVat: "AED 304.76", vat: "5%", payableAmount: "AED 320.00", invoiceDate: "24/08/2023", description: "Google Ads Spend" },
  { name: "Canva Pro", total: "AED 130.00", checkedBy: "Aanya Singh", approvedBy: "Arman Mallik", dueDate: "28/05/2024", scheduledDate: "26/05/2024", status: "Pending", invoiceNumber: "CAN-991", amountWithoutVat: "AED 123.81", vat: "5%", payableAmount: "AED 130.00", invoiceDate: "03/09/2023", description: "Canva Subscription" },
  { name: "Slack Technologies", total: "AED 300.00", checkedBy: "Aanya Singh", approvedBy: "Arman Mallik", dueDate: "30/05/2024", scheduledDate: "28/05/2024", status: "Pending", invoiceNumber: "SLK-7712", amountWithoutVat: "AED 285.71", vat: "5%", payableAmount: "AED 300.00", invoiceDate: "28/08/2023", description: "Slack Subscription" },
  { name: "Figma Design", total: "AED 480.00", checkedBy: "Sanjay Dutt", approvedBy: "Arman Mallik", dueDate: "01/06/2024", scheduledDate: "30/05/2024", status: "Pending", invoiceNumber: "FIG-DES-2", amountWithoutVat: "AED 457.14", vat: "5%", payableAmount: "AED 480.00", invoiceDate: "02/09/2023", description: "Figma Licenses" },
];

const VendorPayment = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState("All Invoices");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [goToPageInput, setGoToPageInput] = React.useState("1");
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [selectedInvoice, setSelectedInvoice] = React.useState<any>(null);
  const ROWS_PER_PAGE = 10;

  const getActiveData = () => {
    if (activeTab === "Due Invoices") return dueInvoicesData;
    if (activeTab === "Scheduled Invoices") return scheduledInvoicesData;
    return allInvoicesData;
  };

  const activeData = getActiveData();
  const totalPages = Math.ceil(activeData.length / ROWS_PER_PAGE);
  const startEntry = (currentPage - 1) * ROWS_PER_PAGE + 1;
  const endEntry = Math.min(currentPage * ROWS_PER_PAGE, activeData.length);
  const paginatedData = activeData.slice(startEntry - 1, endEntry);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setGoToPageInput("1");
  };

  const openDrawer = (invoice: any) => {
    setSelectedInvoice(invoice);
    setIsDrawerOpen(true);
  };

  const renderTableHeaders = () => {
    if (activeTab === "Due Invoices") {
      return (
        <tr>
          <th>Vendor Name</th>
          <th>Invoice Total</th>
          <th>Checked By</th>
          <th>Approved By</th>
          <th>Due Date</th>
          <th>Status</th>
        </tr>
      );
    }
    if (activeTab === "Scheduled Invoices") {
      return (
        <tr>
          <th>Vendor Name</th>
          <th>Invoice Total</th>
          <th>Checked By</th>
          <th>Approved By</th>
          <th>Due Date</th>
          <th>Scheduled Date</th>
          <th>Status</th>
        </tr>
      );
    }
    return (
      <tr>
        <th>Vendor Name</th>
        <th>Invoice Total</th>
        <th>Checked By</th>
        <th>Approved By</th>
        <th>Due Date</th>
        <th>Scheduled</th>
        <th>Status</th>
      </tr>
    );
  };

  const renderTableRow = (row: Record<string, string>, idx: number) => {
    if (activeTab === "Due Invoices") {
      return (
        <tr key={idx} onClick={() => openDrawer(row)} style={{ cursor: "pointer" }}>
          <td>{row.name}</td>
          <td>{row.total}</td>
          <td>{row.checkedBy}</td>
          <td>{row.approvedBy}</td>
          <td>{row.dueDate}</td>
          <td>
            <span className={`${styles.statusBadge} ${styles[row.status.toLowerCase()]}`}>
              {row.status}
            </span>
          </td>
        </tr>
      );
    }
    if (activeTab === "Scheduled Invoices") {
      return (
        <tr key={idx} onClick={() => openDrawer(row)} style={{ cursor: "pointer" }}>
          <td>{row.name}</td>
          <td>{row.total}</td>
          <td>{row.checkedBy}</td>
          <td>{row.approvedBy}</td>
          <td>{row.dueDate}</td>
          <td>{row.scheduledDate}</td>
          <td>
            <span className={`${styles.statusBadge} ${styles[row.status.toLowerCase()]}`}>
              {row.status}
            </span>
          </td>
        </tr>
      );
    }
    return (
      <tr key={idx} onClick={() => openDrawer(row)} style={{ cursor: "pointer" }}>
        <td>{row.name}</td>
        <td>{row.total}</td>
        <td>{row.checkedBy}</td>
        <td>{row.approvedBy}</td>
        <td>{row.dueDate}</td>
        <td>{row.scheduled}</td>
        <td>
          <span className={`${styles.statusBadge} ${styles[row.status.toLowerCase()]}`}>
            {row.status}
          </span>
        </td>
      </tr>
    );
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContent}>
        <TopBar />

        <div className={styles.contentArea}>
          <div className={styles.pageHeader}>
            <h1 className={styles.title}>Vendor Invoice Payment</h1>
            <p className={styles.subtitle}>List of all invoices for payment submitted by vendors</p>
          </div>

          <div className={styles.actionsRow}>
            <div className={styles.tabs}>
              {["All Invoices", "Due Invoices", "Scheduled Invoices"].map((tab) => (
                <button
                  key={tab}
                  className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ""}`}
                  onClick={() => handleTabChange(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className={styles.rightActions}>
              <button className={styles.addBtn} onClick={() => navigate("/vendor/add")}>
                <Plus size={18} />
                <span>Add Invoice</span>
              </button>
              <button className={styles.exportBtn}>
                <Download size={18} />
                <span>Export</span>
              </button>
              <button className={styles.filterBtn}>
                <Filter size={18} />
                <span>Filter</span>
              </button>
            </div>
          </div>

          <div className={styles.tableContainer}>
            <table className={`${styles.table} ${activeTab === "Due Invoices" ? styles.dueTable : activeTab === "Scheduled Invoices" ? styles.scheduledTable : ""}`}>
              <thead>{renderTableHeaders()}</thead>
              <tbody>{paginatedData.map((row, idx) => renderTableRow(row as Record<string, string>, idx))}</tbody>
            </table>
          </div>

          <div className={styles.pagination}>
            <div className={styles.paginationInfo}>
              Showing <strong>{startEntry} - {endEntry}</strong> of <strong>{activeData.length}</strong> entries
            </div>
            <div className={styles.paginationControls}>
              <button
                className={styles.pageBtn}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                <button
                  key={num}
                  className={`${styles.pageBtn} ${currentPage === num ? styles.activePage : ""}`}
                  onClick={() => setCurrentPage(num)}
                >
                  {num}
                </button>
              ))}
              <button
                className={styles.pageBtn}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </div>

            <div className={styles.goToPage}>
              <span>Go to Page</span>
              <input
                type="text"
                value={goToPageInput}
                onChange={(e) => setGoToPageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const val = parseInt(goToPageInput);
                    if (!isNaN(val) && val >= 1 && val <= totalPages) {
                      setCurrentPage(val);
                    } else {
                      setGoToPageInput(String(currentPage));
                    }
                  }
                }}
                className={styles.pageInput}
              />
            </div>
          </div>
        </div>
      </div>
      <InvoiceDetailsDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        invoice={selectedInvoice} 
        sourceTab={activeTab}
      />
    </div>
  );
};

export default VendorPayment;
