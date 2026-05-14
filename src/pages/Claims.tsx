import React from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import styles from "./Claims.module.css";
import { Filter, Download, FileText, AlertCircle } from "lucide-react";
import ClaimDetailsDrawer from "../components/ClaimDetailsDrawer";
import AdvanceDetailsDrawer from "../components/AdvanceDetailsDrawer";
import FilterDrawer from "../components/FilterDrawer";
import ScheduledPaymentDrawer from "../components/ScheduledPaymentDrawer";

const Claims = () => {
  const [activeTab, setActiveTab] = React.useState("Claims");
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [selectedClaim, setSelectedClaim] = React.useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [selectedAdvance, setSelectedAdvance] = React.useState<any>(null);
  const [isAdvanceDrawerOpen, setIsAdvanceDrawerOpen] = React.useState(false);
  const [selectedScheduled, setSelectedScheduled] = React.useState<any>(null);
  const [isScheduledDrawerOpen, setIsScheduledDrawerOpen] = React.useState(false);

  const handleRowClick = (item: any) => {
    if (activeTab === "Claims") {
      setSelectedClaim(item);
      setIsDrawerOpen(true);
    } else if (activeTab === "Advance") {
      setSelectedAdvance(item);
      setIsAdvanceDrawerOpen(true);
    } else if (activeTab === "Scheduled Payment") {
      setSelectedScheduled(item);
      setIsScheduledDrawerOpen(true);
    }
  };

  const claimsSummary = [
    { title: "APPROVED CLAIMS", amount: "AED 8,864.00", count: 234, change: "6.1%", trend: "up", color: "#10b981" },
    { title: "PENDING CLAIMS", amount: "AED 976.00", count: 108, change: "4.6%", trend: "up", color: "#f59e0b" },
    { title: "REJECTED CLAIMS", amount: "AED 383.00", count: 50, change: "8.3%", trend: "down", color: "#ef4444" },
    { title: "HOLD CLAIMS", amount: "AED 8,433.00", count: 234, change: "6.1%", trend: "up", color: "#6366f1" },
  ];

  const advanceSummary = [
    { title: "APPROVED ADVANCE", amount: "AED 3,379.00", count: 234, change: "6.1%", trend: "up", color: "#10b981" },
    { title: "PENDING ADVANCE", amount: "AED 834.00", count: 108, change: "4.6%", trend: "up", color: "#f59e0b" },
    { title: "REJECTED ADVANCE", amount: "AED 734.00", count: 50, change: "8.3%", trend: "down", color: "#ef4444" },
    { title: "HOLD ADVANCE", amount: "AED 3,379.00", count: 234, change: "6.1%", trend: "up", color: "#6366f1" },
  ];

  const [currentPage, setCurrentPage] = React.useState(1);
  const [goToPageInput, setGoToPageInput] = React.useState("1");
  const ROWS_PER_PAGE = 10;

  React.useEffect(() => {
    setGoToPageInput(String(currentPage));
  }, [currentPage]);

  const allClaimsData = [
    // Page 1
    { id: "USR0457", name: "Anurag Shrivastava", type: "Multiple Day Claim", dept: "Design",    amount: "AED 37,464.00", date: "01/01/2026 - 10/01/2026", audit: "Success", status: "Pending" },
    { id: "USR0235", name: "Ahmed Hussain",      type: "Single Day Claim",   dept: "Marketing", amount: "AED 4,389.00",  date: "15/01/2026",              audit: "Error",   status: "Pending" },
    { id: "USR0865", name: "Shubham Kumar",      type: "Single Day Claim",   dept: "Sales",     amount: "AED 2,625.00",  date: "20/01/2026",              audit: "Success", status: "Rejected" },
    { id: "USR0321", name: "Amardeep Singh",     type: "Multiple Day Claim", dept: "Finance",   amount: "AED 37,464.00", date: "05/02/2026 - 12/02/2026", audit: "Success", status: "Partial" },
    { id: "USR0854", name: "Simrandeep Singh",   type: "Single Day Claim",   dept: "Design",    amount: "AED 2,625.00",  date: "15/02/2026",              audit: "Success", status: "On Hold" },
    { id: "USR0453", name: "Adil Khan",          type: "Single Day Claim",   dept: "Marketing", amount: "AED 29,589.00", date: "22/02/2026",              audit: "Success", status: "Approved" },
    { id: "USR0234", name: "Salman Ali",         type: "Single Day Claim",   dept: "Design",    amount: "AED 4,389.00",  date: "05/03/2026",              audit: "Error",   status: "Pending" },
    { id: "USR0786", name: "Ahsaan Khan",        type: "Multiple Day Claim", dept: "Sales",     amount: "AED 2,474.00",  date: "10/03/2026 - 18/03/2026", audit: "Success", status: "Approved" },
    { id: "USR0134", name: "Sameer Khan",        type: "Single Day Claim",   dept: "Marketing", amount: "AED 9,735.00",  date: "25/03/2026",              audit: "Success", status: "Approved" },
    { id: "USR0463", name: "Hasir Ali",          type: "Single Day Claim",   dept: "Sales",     amount: "AED 5,886.00",  date: "02/04/2026",              audit: "Success", status: "Rejected" },
    // Page 2
    { id: "USR0512", name: "Priya Kapoor",       type: "Single Day Claim",   dept: "HR",        amount: "AED 1,200.00",  date: "10/04/2026",              audit: "Success", status: "Approved" },
    { id: "USR0513", name: "Rohan Desai",        type: "Multiple Day Claim", dept: "Finance",   amount: "AED 14,320.00", date: "15/04/2026 - 20/04/2026", audit: "Success", status: "Pending" },
    { id: "USR0514", name: "Sneha Iyer",         type: "Single Day Claim",   dept: "Design",    amount: "AED 3,780.00",  date: "28/04/2026",              audit: "Error",   status: "Rejected" },
    { id: "USR0515", name: "Arjun Malhotra",     type: "Multiple Day Claim", dept: "Sales",     amount: "AED 22,100.00", date: "01/05/2026 - 08/05/2026", audit: "Success", status: "Approved" },
    { id: "USR0516", name: "Kavya Nair",         type: "Single Day Claim",   dept: "Marketing", amount: "AED 6,450.00",  date: "10/05/2026",              audit: "Success", status: "On Hold" },
    { id: "USR0517", name: "Vikram Sethi",       type: "Single Day Claim",   dept: "HR",        amount: "AED 2,900.00",  date: "11/05/2026",              audit: "Success", status: "Pending" },
    { id: "USR0518", name: "Divya Sharma",       type: "Multiple Day Claim", dept: "Finance",   amount: "AED 18,700.00", date: "03/01/2026 - 09/01/2026", audit: "Error",   status: "Pending" },
    { id: "USR0519", name: "Karan Mehta",        type: "Single Day Claim",   dept: "Sales",     amount: "AED 4,100.00",  date: "11/01/2026",              audit: "Success", status: "Approved" },
    { id: "USR0520", name: "Ananya Bose",        type: "Single Day Claim",   dept: "Design",    amount: "AED 3,250.00",  date: "12/02/2026",              audit: "Success", status: "Partial" },
    { id: "USR0521", name: "Rahul Gupta",        type: "Multiple Day Claim", dept: "Marketing", amount: "AED 11,900.00", date: "04/02/2026 - 10/02/2026", audit: "Success", status: "Partial" },
    // Page 3
    { id: "USR0522", name: "Meera Pillai",       type: "Single Day Claim",   dept: "Finance",   amount: "AED 5,600.00",  date: "13/03/2026",              audit: "Success", status: "Pending" },
    { id: "USR0523", name: "Aditya Rao",         type: "Multiple Day Claim", dept: "Sales",     amount: "AED 28,400.00", date: "05/03/2026 - 12/03/2026", audit: "Error",   status: "Rejected" },
    { id: "USR0524", name: "Pooja Verma",        type: "Single Day Claim",   dept: "HR",        amount: "AED 1,850.00",  date: "14/04/2026",              audit: "Success", status: "On Hold" },
    { id: "USR0525", name: "Nikhil Joshi",       type: "Single Day Claim",   dept: "Design",    amount: "AED 7,200.00",  date: "15/04/2026",              audit: "Success", status: "Approved" },
    { id: "USR0526", name: "Riya Menon",         type: "Multiple Day Claim", dept: "Marketing", amount: "AED 16,500.00", date: "06/05/2026 - 11/05/2026", audit: "Success", status: "On Hold" },
    { id: "USR0527", name: "Suresh Babu",        type: "Single Day Claim",   dept: "Sales",     amount: "AED 3,400.00",  date: "16/05/2026",              audit: "Error",   status: "Pending" },
    { id: "USR0528", name: "Lakshmi Devi",       type: "Single Day Claim",   dept: "Finance",   amount: "AED 9,100.00",  date: "17/01/2026",              audit: "Success", status: "Approved" },
    { id: "USR0529", name: "Harish Patel",       type: "Multiple Day Claim", dept: "HR",        amount: "AED 21,300.00", date: "07/01/2026 - 14/01/2026", audit: "Success", status: "Approved" },
    { id: "USR0530", name: "Swati Tiwari",       type: "Single Day Claim",   dept: "Design",    amount: "AED 4,700.00",  date: "18/02/2026",              audit: "Success", status: "Partial" },
    { id: "USR0531", name: "Deepak Nair",        type: "Single Day Claim",   dept: "Sales",     amount: "AED 6,350.00",  date: "19/02/2026",              audit: "Error",   status: "Rejected" },
    // Page 4
    { id: "USR0532", name: "Shruti Bansal",      type: "Multiple Day Claim", dept: "Travel",    amount: "AED 19,800.00", date: "08/03/2026 - 15/03/2026", audit: "Success", status: "Pending" },
    { id: "USR0533", name: "Vivek Mishra",       type: "Single Day Claim",   dept: "Food",      amount: "AED 2,150.00",  date: "20/03/2026",              audit: "Success", status: "Pending" },
    { id: "USR0534", name: "Naina Choudhary",    type: "Single Day Claim",   dept: "Medical",   amount: "AED 8,900.00",  date: "21/04/2026",              audit: "Error",   status: "On Hold" },
    { id: "USR0535", name: "Akash Tripathi",     type: "Multiple Day Claim", dept: "Travel",    amount: "AED 33,200.00", date: "09/04/2026 - 16/04/2026", audit: "Success", status: "Approved" },
    { id: "USR0536", name: "Tanvi Sinha",        type: "Single Day Claim",   dept: "Food",      amount: "AED 5,050.00",  date: "22/05/2026",              audit: "Success", status: "Approved" },
    { id: "USR0537", name: "Manish Dubey",       type: "Single Day Claim",   dept: "Medical",   amount: "AED 3,600.00",  date: "23/05/2026",              audit: "Success", status: "Rejected" },
    { id: "USR0538", name: "Geeta Krishnan",     type: "Multiple Day Claim", dept: "Finance",   amount: "AED 14,750.00", date: "10/01/2026 - 17/01/2026", audit: "Error",   status: "Pending" },
    { id: "USR0539", name: "Sandeep Agarwal",    type: "Single Day Claim",   dept: "Travel",    amount: "AED 7,800.00",  date: "24/01/2026",              audit: "Success", status: "Approved" },
    { id: "USR0540", name: "Pallavi Reddy",      type: "Single Day Claim",   dept: "Food",      amount: "AED 4,950.00",  date: "25/02/2026",              audit: "Success", status: "Partial" },
    { id: "USR0541", name: "Chetan Kulkarni",    type: "Multiple Day Claim", dept: "Medical",   amount: "AED 26,600.00", date: "11/02/2026 - 18/02/2026", audit: "Success", status: "Partial" },
  ];

  const [activeFilters, setActiveFilters] = React.useState<Record<string, any>>({});

  const allAdvanceData = [
    // Page 1
    { id: "USR0342", name: "Anurag Shrivastava", category: "Food",   amount: "AED 2,500.00", date: "15/01/2026", receipt: "No",  comments: "Dinner with client", status: "Approved" },
    { id: "USR0921", name: "Ahmed Hussain",      category: "Travel", amount: "AED 5,000.00", date: "10/01/2026", receipt: "Yes", comments: "Flight to London", status: "Pending" },
    { id: "USR0899", name: "Shubham Kumar",      category: "Food",   amount: "AED 1,800.00", date: "12/03/2026", receipt: "No",  comments: "Team lunch", status: "On Hold" },
    { id: "USR0765", name: "Amardeep Singh",     category: "Medical",amount: "AED 1,200.00", date: "22/02/2026", receipt: "Yes", comments: "Emergency checkup", status: "Rejected" },
    { id: "USR0211", name: "Adil Khan",          category: "Travel", amount: "AED 8,500.00", date: "05/03/2026", receipt: "Yes", comments: "Hotel stay", status: "Pending" },
    { id: "USR0432", name: "Salman Ali",         category: "Medical",amount: "AED 3,000.00", date: "20/03/2026", receipt: "Yes", comments: "Lab tests", status: "Approved" },
    { id: "USR0654", name: "Ahsaan Khan",        category: "Travel", amount: "AED 4,200.00", date: "05/04/2026", receipt: "Yes", comments: "Car rental", status: "Pending" },
    { id: "USR0112", name: "Simrandeep Singh",   category: "Food",   amount: "AED 900.00",   date: "15/04/2026", receipt: "No",  comments: "Client coffee", status: "Approved" },
    { id: "USR0567", name: "Hasir Ali",          category: "Travel", amount: "AED 6,100.00", date: "02/05/2026", receipt: "Yes", comments: "Train tickets", status: "Approved" },
    { id: "USR0876", name: "Sameer Khan",        category: "Medical",amount: "AED 2,400.00", date: "10/05/2026", receipt: "Yes", comments: "Medication", status: "Rejected" },
    // Pages 2-4 (generic)
    ...Array(30).fill(null).map((_, i) => ({
      id: `USR${550 + i}`,
      name: ["Riya Sharma", "Karan Malhotra", "Sneha Kapoor", "Rahul Verma", "Priya Singh"][i % 5],
      category: ["Travel", "Food", "Medical"][i % 3],
      amount: `AED ${(Math.random() * 5000 + 1000).toFixed(2)}`,
      date: `${String(1 + (i % 25)).padStart(2, "0")}/0${1 + (i % 5)}/2026`,
      receipt: i % 2 === 0 ? "Yes" : "No",
      comments: "Generic advance request comment",
      status: ["Pending", "Approved", "Rejected", "On Hold"][i % 4]
    }))
  ];

  const filteredClaimsData = React.useMemo(() => {
    return allClaimsData.filter((claim) => {
      // User Filter
      if (activeFilters.users?.length > 0 && !activeFilters.users.includes(claim.id)) return false;
      // Status Filter
      if (activeFilters.statuses?.length > 0 && !activeFilters.statuses.includes(claim.status)) return false;
      // Claim Type Filter
      if (activeFilters.claimTypes?.length > 0 && !activeFilters.claimTypes.includes(claim.type)) return false;
      
      // Date Filter
      if (activeFilters.date) {
        const parseDate = (d: string) => {
          const parts = d.split("/");
          return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
        };

        const claimDateStr = claim.date.includes(" - ") ? claim.date.split(" - ")[0] : claim.date;
        const claimDate = parseDate(claimDateStr);
        const today = new Date(2026, 4, 12); // May 12, 2026

        if (typeof activeFilters.date === "string" && activeFilters.date !== "Custom" && activeFilters.date !== "") {
          let days = 0;
          if (activeFilters.date === "7D") days = 7;
          else if (activeFilters.date === "30D") days = 30;
          else if (activeFilters.date === "3M") days = 90;
          else if (activeFilters.date === "6M") days = 180;
          
          const cutoff = new Date(today);
          cutoff.setDate(cutoff.getDate() - days);
          if (claimDate < cutoff) return false;
        } else if (activeFilters.date.from && activeFilters.date.to) {
          const start = new Date(activeFilters.date.from);
          const end = new Date(activeFilters.date.to);
          if (claimDate < start || claimDate > end) return false;
        }
      }

      return true;
    });
  }, [allClaimsData, activeFilters]);

  const filteredAdvanceData = React.useMemo(() => {
    return allAdvanceData.filter((item) => {
      if (activeFilters.users?.length > 0 && !activeFilters.users.includes(item.id)) return false;
      if (activeFilters.statuses?.length > 0 && !activeFilters.statuses.includes(item.status)) return false;
      if (activeFilters.categories?.length > 0 && !activeFilters.categories.includes(item.category)) return false;
      
      // Date Filter
      if (activeFilters.date) {
        const parseDate = (d: string) => {
          const parts = d.split("/");
          return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
        };
        const claimDate = parseDate(item.date);
        const today = new Date(2026, 4, 12); // May 12, 2026

        if (typeof activeFilters.date === "string" && activeFilters.date !== "Custom" && activeFilters.date !== "") {
          let days = 0;
          if (activeFilters.date === "7D") days = 7;
          else if (activeFilters.date === "30D") days = 30;
          else if (activeFilters.date === "3M") days = 90;
          else if (activeFilters.date === "6M") days = 180;
          
          const cutoff = new Date(today);
          cutoff.setDate(cutoff.getDate() - days);
          if (claimDate < cutoff) return false;
        } else if (activeFilters.date.from && activeFilters.date.to) {
          const start = new Date(activeFilters.date.from);
          const end = new Date(activeFilters.date.to);
          if (claimDate < start || claimDate > end) return false;
        }
      }
      return true;
    });
  }, [allAdvanceData, activeFilters]);

  const scheduledData = [
    { id: "USR0457", name: "Anurag Shrivastava", category: "Travel", amount: "AED 450.00", claimDate: "05/06/2023", comments: "Flight booking for client meeting", scheduleDate: "01/07/2023", status: "Approved" },
    { id: "USR0235", name: "Ahmed Hussain", category: "Food", amount: "AED 85.00", claimDate: "08/06/2023", comments: "Team lunch", scheduleDate: "02/07/2023", status: "Approved" },
    { id: "USR0865", name: "Shubham Kumar", category: "Medical", amount: "AED 1,200.00", claimDate: "10/06/2023", comments: "Annual health checkup", scheduleDate: "05/07/2023", status: "Approved" },
    { id: "USR0321", name: "Amardeep Singh", category: "Travel", amount: "AED 320.00", claimDate: "12/06/2023", comments: "Taxi fares for site visit", scheduleDate: "01/07/2023", status: "Approved" },
    { id: "USR0453", name: "Adil Khan", category: "Food", amount: "AED 150.00", claimDate: "15/06/2023", comments: "Client dinner", scheduleDate: "03/07/2023", status: "Approved" },
    { id: "USR0457", name: "Anurag Shrivastava", category: "Medical", amount: "AED 210.00", claimDate: "18/06/2023", comments: "Pharmacy reimbursement", scheduleDate: "07/07/2023", status: "Approved" },
    { id: "USR0235", name: "Ahmed Hussain", category: "Travel", amount: "AED 890.00", claimDate: "20/06/2023", comments: "Hotel stay in Dubai", scheduleDate: "10/07/2023", status: "Approved" },
    { id: "USR0865", name: "Shubham Kumar", category: "Food", amount: "AED 45.00", claimDate: "22/06/2023", comments: "Coffee with vendor", scheduleDate: "01/07/2023", status: "Approved" },
    { id: "USR0321", name: "Amardeep Singh", category: "Medical", amount: "AED 500.00", claimDate: "25/06/2023", comments: "Dental consultation", scheduleDate: "15/07/2023", status: "Approved" },
    { id: "USR0453", name: "Adil Khan", category: "Travel", amount: "AED 1,500.00", claimDate: "28/06/2023", comments: "Regional conference travel", scheduleDate: "01/08/2023", status: "Approved" },
    { id: "USR0457", name: "Anurag Shrivastava", category: "Food", amount: "AED 120.00", claimDate: "01/07/2023", comments: "Office lunch meeting", scheduleDate: "15/07/2023", status: "Approved" },
    { id: "USR0235", name: "Ahmed Hussain", category: "Medical", amount: "AED 2,500.00", claimDate: "03/07/2023", comments: "Emergency surgery claim", scheduleDate: "20/07/2023", status: "Approved" },
    { id: "USR0865", name: "Shubham Kumar", category: "Travel", amount: "AED 75.00", claimDate: "05/07/2023", comments: "Local commute", scheduleDate: "10/07/2023", status: "Approved" },
    { id: "USR0321", name: "Amardeep Singh", category: "Food", amount: "AED 60.00", claimDate: "07/07/2023", comments: "Overtime meal", scheduleDate: "12/07/2023", status: "Approved" },
    { id: "USR0453", name: "Adil Khan", category: "Medical", amount: "AED 350.00", claimDate: "10/07/2023", comments: "Physiotherapy session", scheduleDate: "25/07/2023", status: "Approved" },
    { id: "USR0457", name: "Anurag Shrivastava", category: "Travel", amount: "AED 2,200.00", claimDate: "12/07/2023", comments: "International flight (LHR)", scheduleDate: "01/08/2023", status: "Approved" },
    { id: "USR0235", name: "Ahmed Hussain", category: "Food", amount: "AED 110.00", claimDate: "14/07/2023", comments: "Project celebration dinner", scheduleDate: "28/07/2023", status: "Approved" },
    { id: "USR0865", name: "Shubham Kumar", category: "Medical", amount: "AED 95.00", claimDate: "16/07/2023", comments: "General medicine", scheduleDate: "30/07/2023", status: "Approved" },
    { id: "USR0321", name: "Amardeep Singh", category: "Travel", amount: "AED 180.00", claimDate: "18/07/2023", comments: "Airport transfer", scheduleDate: "01/08/2023", status: "Approved" },
    { id: "USR0453", name: "Adil Khan", category: "Food", amount: "AED 230.00", claimDate: "20/07/2023", comments: "Supplier engagement lunch", scheduleDate: "05/08/2023", status: "Approved" },
    { id: "USR0457", name: "Anurag Shrivastava", category: "Medical", amount: "AED 450.00", claimDate: "22/07/2023", comments: "Eye checkup and glasses", scheduleDate: "10/08/2023", status: "Approved" },
    { id: "USR0235", name: "Ahmed Hussain", category: "Travel", amount: "AED 670.00", claimDate: "24/07/2023", comments: "Car rental for site audit", scheduleDate: "15/08/2023", status: "Approved" },
    { id: "USR0865", name: "Shubham Kumar", category: "Food", amount: "AED 55.00", claimDate: "26/07/2023", comments: "Business breakfast", scheduleDate: "10/08/2023", status: "Approved" },
    { id: "USR0321", name: "Amardeep Singh", category: "Medical", amount: "AED 1,800.00", claimDate: "28/07/2023", comments: "In-patient hospital stay", scheduleDate: "20/08/2023", status: "Approved" },
    { id: "USR0453", name: "Adil Khan", category: "Travel", amount: "AED 340.00", claimDate: "30/07/2023", comments: "Train tickets (Inter-city)", scheduleDate: "01/09/2023", status: "Approved" },
  ];

  const filteredScheduledData = React.useMemo(() => {
    return scheduledData.filter((item) => {
      if (activeFilters.users?.length > 0 && !activeFilters.users.includes(item.id)) return false;
      if (activeFilters.statuses?.length > 0 && !activeFilters.statuses.includes(item.status)) return false;
      if (activeFilters.categories?.length > 0 && !activeFilters.categories.includes(item.category)) return false;
      
      // Date Filter
      if (activeFilters.date) {
        const parseDate = (d: string) => {
          const parts = d.split("/");
          return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
        };
        const claimDate = parseDate(item.claimDate);
        const today = new Date(2026, 4, 12);

        if (typeof activeFilters.date === "string" && activeFilters.date !== "Custom" && activeFilters.date !== "") {
          let days = 0;
          if (activeFilters.date === "7D") days = 7;
          else if (activeFilters.date === "30D") days = 30;
          else if (activeFilters.date === "3M") days = 90;
          else if (activeFilters.date === "6M") days = 180;
          
          const cutoff = new Date(today);
          cutoff.setDate(cutoff.getDate() - days);
          if (claimDate < cutoff) return false;
        } else if (activeFilters.date.from && activeFilters.date.to) {
          const start = new Date(activeFilters.date.from);
          const end = new Date(activeFilters.date.to);
          if (claimDate < start || claimDate > end) return false;
        }
      }
      return true;
    });
  }, [scheduledData, activeFilters]);

  const activeDataList = activeTab === "Claims" ? filteredClaimsData : (activeTab === "Advance" ? filteredAdvanceData : filteredScheduledData);

  const totalPages = Math.ceil(activeDataList.length / ROWS_PER_PAGE);
  const currentPaginatedData = activeDataList.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );
  const startEntry = activeDataList.length === 0 ? 0 : (currentPage - 1) * ROWS_PER_PAGE + 1;
  const endEntry = Math.min(currentPage * ROWS_PER_PAGE, activeDataList.length);

  const currentSummary = activeTab === "Claims" ? claimsSummary : advanceSummary;
  const currentData = currentPaginatedData;

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContent}>
        <TopBar />
        
        <div className={styles.contentArea}>
          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${activeTab === "Claims" ? styles.active : ""}`}
              onClick={() => setActiveTab("Claims")}
            >
              Claims
            </button>
            <button 
              className={`${styles.tab} ${activeTab === "Advance" ? styles.active : ""}`}
              onClick={() => setActiveTab("Advance")}
            >
              Advance
            </button>
            <button 
              className={`${styles.tab} ${activeTab === "Scheduled Payment" ? styles.active : ""}`}
              onClick={() => setActiveTab("Scheduled Payment")}
            >
              Scheduled Payment
            </button>
          </div>

          {activeTab !== "Scheduled Payment" && (
            <div className={styles.summaryGrid}>
              {currentSummary.map((card, idx) => (
                <div key={idx} className={styles.summaryCard}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardTitle}>{card.title}</span>
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.amountRow}>
                      <span className={styles.amount} style={{ color: card.color }}>{card.amount}</span>
                      <span className={styles.count}>{card.count}</span>
                    </div>
                    <div className={styles.divider} style={{ backgroundColor: card.color }}></div>
                    <div className={styles.cardFooter}>
                      <span className={styles.trendIcon} style={{ color: card.color }}>
                        {card.trend === "up" ? "▲" : "▼"}
                      </span>
                      <span className={styles.changeText}>{card.change}</span>
                      <span className={styles.periodText}>From last month</span>
                      {card.title.includes("HOLD") && <AlertCircle size={14} className={styles.infoIcon} />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={styles.actionsRow}>
            <button className={styles.filterBtn} onClick={() => setIsFilterOpen(true)}>
              <Filter size={18} />
              <span>Filter</span>
            </button>
            <div className={styles.rightActions}>
              <button className={styles.bulkBtn}>Bulk Upload</button>
              <button className={styles.exportBtn}>
                <Download size={18} />
                <span>Export</span>
              </button>
            </div>
          </div>

          <div className={styles.tableContainer}>
            <table className={`${styles.table} ${activeTab === "Advance" ? styles.advanceTable : ""} ${activeTab === "Scheduled Payment" ? styles.scheduledTable : ""}`}>
              <thead>
                <tr>
                  <th>User Details</th>
                  {activeTab === "Claims" && (
                    <>
                      <th>Claim Type</th>
                      <th>Department</th>
                      <th>Amount</th>
                      <th>Claim Date</th>
                      <th>Smart Audit</th>
                    </>
                  )}
                  {activeTab === "Advance" && (
                    <>
                      <th>Advance Date</th>
                      <th>Category</th>
                      <th>Amount</th>
                    </>
                  )}
                  {activeTab === "Scheduled Payment" && (
                    <>
                      <th>Claim Date</th>
                      <th>Category</th>
                      <th>Amount</th>
                    </>
                  )}
                  {(activeTab === "Claims" || activeTab === "Scheduled Payment") && <th>Receipt</th>}
                  {(activeTab === "Advance" || activeTab === "Scheduled Payment") && <th>Comments</th>}
                  {activeTab === "Scheduled Payment" && <th>Schedule Date</th>}
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((row: any, idx) => (
                  <tr key={idx} onClick={() => handleRowClick(row)} className={styles.clickableRow}>
                    <td>
                      <div className={styles.userDetails}>
                        <span className={styles.userName}>{row.name}</span>
                        <span className={styles.userId}>{row.id}</span>
                      </div>
                    </td>
                    {activeTab === "Claims" && (
                      <>
                        <td>{row.type}</td>
                        <td>{row.dept}</td>
                        <td>{row.amount}</td>
                        <td>{row.date}</td>
                        <td>
                          <span className={`${styles.auditBadge} ${styles[row.audit.toLowerCase()]}`}>
                            {row.audit}
                          </span>
                        </td>
                      </>
                    )}
                    {activeTab === "Advance" && (
                      <>
                        <td>{row.date}</td>
                        <td>{row.category}</td>
                        <td>{row.amount}</td>
                      </>
                    )}
                    {activeTab === "Scheduled Payment" && (
                      <>
                        <td>{row.claimDate}</td>
                        <td>{row.category}</td>
                        <td>{row.amount}</td>
                      </>
                    )}
                    {(activeTab === "Claims" || activeTab === "Scheduled Payment") && (
                      <td>
                        <FileText size={20} className={styles.receiptIcon} />
                      </td>
                    )}
                    {(activeTab === "Advance" || activeTab === "Scheduled Payment") && <td>{row.comments}</td>}
                    {activeTab === "Scheduled Payment" && <td>{row.scheduleDate}</td>}
                    <td>
                      <span className={`${styles.statusBadge} ${styles[row.status.toLowerCase().replace(" ", "")]}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.pagination}>
            <div className={styles.paginationInfo}>
              Showing <strong>{startEntry} - {endEntry}</strong> of <strong>{activeDataList.length}</strong> entries
            </div>
            <div className={styles.paginationControls}>
              <button
                className={styles.pageBtn}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >&lt;</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`${styles.pageBtn} ${currentPage === page ? styles.activePage : ""}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button
                className={styles.pageBtn}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >&gt;</button>
            </div>
            <div className={styles.goToPage}>
              <span>Go to Page</span>
              <input
                type="text"
                className={styles.pageInput}
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
                onBlur={() => setGoToPageInput(String(currentPage))}
              />
            </div>
          </div>
        </div>
      </div>
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        activeTab={activeTab}
        onApply={(filters) => {
          setActiveFilters(filters);
          setCurrentPage(1);
          setIsFilterOpen(false);
        }}
      />
      <ClaimDetailsDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        claim={selectedClaim} 
      />
      <AdvanceDetailsDrawer
        isOpen={isAdvanceDrawerOpen}
        onClose={() => setIsAdvanceDrawerOpen(false)}
        advance={selectedAdvance}
      />
      <ScheduledPaymentDrawer
        isOpen={isScheduledDrawerOpen}
        onClose={() => setIsScheduledDrawerOpen(false)}
        data={selectedScheduled}
      />
    </div>
  );
};

export default Claims;
