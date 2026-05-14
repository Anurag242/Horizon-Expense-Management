import styles from "./Dashboard.module.css";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import { Info, ArrowUpRight, ArrowDownRight, ChevronRight, ChevronDown } from "lucide-react";

const mockBreakdown = [
  { id: 1, title: "APPROVED CLAIMS", amount: "AED 3,379.00", count: 234, trend: "up", percentage: "6.1%", text: "From last month", color: "#10b981" },
  { id: 2, title: "PENDING CLAIMS", amount: "AED 834.00", count: 108, trend: "up", percentage: "4.6%", text: "From last month", color: "#f59e0b" },
  { id: 3, title: "REJECTED CLAIMS", amount: "AED 734.00", count: 50, trend: "down", percentage: "8.3%", text: "From last month", color: "#ef4444" },
  { id: 4, title: "HOLD CLAIMS", amount: "AED 3,379.00", count: 234, trend: "up", percentage: "6.1%", text: "From last month", color: "#3b82f6" },
  { id: 5, title: "APPROVED ADVANCES", amount: "AED 3,379.00", count: 234, trend: "up", percentage: "6.1%", text: "From last month", color: "#10b981" },
  { id: 6, title: "PENDING ADVANCES", amount: "AED 834.00", count: 108, trend: "up", percentage: "4.6%", text: "From last month", color: "#f59e0b" },
  { id: 7, title: "REJECTED ADVANCES", amount: "AED 734.00", count: 50, trend: "down", percentage: "8.3%", text: "From last month", color: "#ef4444" },
  { id: 8, title: "HOLD ADVANCES", amount: "AED 3,379.00", count: 234, trend: "up", percentage: "6.1%", text: "From last month", color: "#3b82f6" },
];

export default function Dashboard() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.mainContent}>
        <TopBar />
        
        <div className={styles.dashboardContainer}>
          {/* Top Section: Expenses Breakdown */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Expenses Breakdown</h2>
            </div>
            <div className={styles.breakdownGrid}>
              {mockBreakdown.map((item) => (
                <div key={item.id} className={styles.breakdownCard}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardTitle}>{item.title}</span>
                  </div>
                  <div className={styles.cardValueRow}>
                    <span className={styles.cardAmount} style={{ color: item.color }}>{item.amount}</span>
                    <span className={styles.cardCount} style={{ color: item.color }}>{item.count}</span>
                  </div>
                  <div className={styles.cardDivider} style={{ backgroundColor: item.color }}></div>
                  <div className={styles.cardFooter}>
                    <div className={styles.trendRow}>
                      {item.trend === "up" ? (
                        <ArrowUpRight size={14} color="#ef4444" className={styles.trendIcon} />
                      ) : (
                        <ArrowDownRight size={14} color="#10b981" className={styles.trendIcon} />
                      )}
                      <span className={styles.percentage}>{item.percentage}</span>
                      <span className={styles.trendText}>{item.text}</span>
                    </div>
                    <Info size={14} color="#9ca3af" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Middle Section */}
          <div className={styles.middleGrid}>
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Total Balance</h2>
              </div>
              <div className={styles.balanceCard}>
                <div className={styles.balanceTop}>
                  <div className={styles.balanceAmount}>
                    <span className={styles.currency}>AED</span>
                    <span className={styles.largeAmount}>73,435</span>
                    <span className={styles.decimals}>.00</span>
                  </div>
                  <button className={styles.addRefundBtn}>Add Prefund</button>
                </div>
                <div className={styles.accountTypeBox}>
                  <div>
                    <div className={styles.accountLabel}>Account Type</div>
                    <div className={styles.accountValue}>Corporate Account</div>
                  </div>
                  <div className={styles.horizonLogo}>
                    HORIZON
                  </div>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Pending Approvals</h2>
                <button className={styles.viewAllBtn}>View All <ChevronRight size={16} /></button>
              </div>
              <div className={styles.approvalsCard}>
                <div className={styles.approvalItem}>
                  <div className={styles.dateBox}>
                    <span className={styles.month}>May</span>
                    <span className={styles.day}>17</span>
                  </div>
                  <div className={styles.approvalInfo}>
                    <div className={styles.approvalType}>Claim</div>
                    <div className={styles.approvalName}>Anurag Shrivastava</div>
                    <div className={styles.approvalDate}>Requested on- 17 May 2024</div>
                  </div>
                  <div className={styles.approvalAmountBox}>AED 299.00</div>
                </div>
                <div className={styles.approvalItem}>
                  <div className={styles.dateBox}>
                    <span className={styles.month}>May</span>
                    <span className={styles.day}>16</span>
                  </div>
                  <div className={styles.approvalInfo}>
                    <div className={styles.approvalType}>Advance</div>
                    <div className={styles.approvalName}>John Doe</div>
                    <div className={styles.approvalDate}>Requested on- 15 May 2024</div>
                  </div>
                  <div className={styles.approvalAmountBox}>AED 500.00</div>
                </div>
              </div>
            </section>
          </div>

          {/* Bottom Section */}
          <div className={styles.bottomGrid}>
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Statistics <span className={styles.subtitle}>(Total Payments)</span></h2>
              </div>
              <div className={styles.statsCard}>
                <div className={styles.statsHeader}>
                  <div className={styles.dropdownBox}>
                    Weekly Comparison <ChevronDown size={16} />
                  </div>
                  <div className={styles.legend}>
                    <div className={styles.legendItem}>
                      <div className={styles.legendColor} style={{ backgroundColor: '#10b981' }}></div>
                      <span>This week</span>
                    </div>
                    <div className={styles.legendItem}>
                      <div className={styles.legendColor} style={{ backgroundColor: '#e5e7eb' }}></div>
                      <span>Last week</span>
                    </div>
                  </div>
                </div>
                <div className={styles.chartPlaceholder}>
                  <div className={styles.yAxis}>
                    <span>AED 2.0K</span>
                    <span>AED 1.5K</span>
                    <span>AED 1.0K</span>
                    <span>AED 0.5K</span>
                    <span>AED 0</span>
                  </div>
                  <div className={styles.barsArea}>
                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                      <div key={i} className={styles.barGroup}>
                        <div className={styles.barPair}>
                          <div className={styles.barLight} style={{ height: `${Math.random() * 40 + 20}%` }}></div>
                          <div className={styles.barDark} style={{ height: `${Math.random() * 60 + 30}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.xAxis}>
                  <span>17 Sun</span>
                  <span>18 Mon</span>
                  <span>19 Tue</span>
                  <span>20 Wed</span>
                  <span>21 Thu</span>
                  <span>22 Fri</span>
                  <span>23 Sat</span>
                </div>
              </div>

              <div className={styles.vendorPaymentsCard}>
                <div className={styles.vendorHeader}>
                  <div>
                    <div className={styles.vendorLabel}>Total Vendor Payments <Info size={12} color="#9ca3af" /></div>
                    <div className={styles.vendorTotal}>345</div>
                  </div>
                  <button className={styles.vendorViewBtn}>View All</button>
                </div>
                <div className={styles.vendorStatsGrid}>
                  <div>
                    <div className={styles.vendorStatLabel} style={{ color: '#10b981' }}>Approved Payments</div>
                    <div className={styles.vendorStatAmount}>AED 1,000.00</div>
                    <div className={styles.vendorStatTrend} style={{ color: '#10b981' }}><ArrowUpRight size={12} /> +15%</div>
                  </div>
                  <div>
                    <div className={styles.vendorStatLabel} style={{ color: '#f59e0b' }}>Pending Payments</div>
                    <div className={styles.vendorStatAmount}>AED 246.00</div>
                    <div className={styles.vendorStatTrend} style={{ color: '#f59e0b' }}><ArrowDownRight size={12} /> -10%</div>
                  </div>
                  <div>
                    <div className={styles.vendorStatLabel} style={{ color: '#ef4444' }}>Rejected Payments</div>
                    <div className={styles.vendorStatAmount}>AED 246.00</div>
                    <div className={styles.vendorStatTrend} style={{ color: '#ef4444' }}><ArrowDownRight size={12} /> -10%</div>
                  </div>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Recent Payments</h2>
                <button className={styles.viewAllBtn}>View All <ChevronRight size={16} /></button>
              </div>
              <div className={styles.recentCard}>
                <div className={styles.tabsHeader}>
                  <div className={`${styles.tab} ${styles.activeTab}`}>Claim</div>
                  <div className={styles.tab}>Advance</div>
                  <div className={styles.tab}>Vendor</div>
                </div>
                <div className={styles.paymentsList}>
                  {[
                    { id: 1, name: "Adil Khan", type: "Travelling", amount: "AED 280.00", date: "17 May 2024", icon: "truck" },
                    { id: 2, name: "John Doe", type: "Multi-Category", amount: "AED 236.00", date: "17 May 2024", icon: "flow" },
                    { id: 3, name: "Daniel", type: "Marketing", amount: "AED 846.00", date: "17 May 2024", icon: "mail" },
                    { id: 4, name: "Piyush", type: "Food", amount: "AED 975.00", date: "17 May 2024", icon: "food" },
                    { id: 5, name: "Jacob", type: "Multi-Category", amount: "AED 734.00", date: "17 May 2024", icon: "flow" },
                    { id: 6, name: "Sarah Connor", type: "Operations", amount: "AED 540.00", date: "16 May 2024", icon: "truck" },
                    { id: 7, name: "Michael Scott", type: "Management", amount: "AED 1,200.00", date: "16 May 2024", icon: "flow" },
                  ].map((p) => (
                    <div key={p.id} className={styles.paymentItem}>
                      <div className={styles.paymentIconBox}>
                        <div className={styles.mockIcon}></div>
                      </div>
                      <div className={styles.paymentInfo}>
                        <div className={styles.paymentName}>{p.name}</div>
                        <div className={styles.paymentType}>{p.type}</div>
                      </div>
                      <div className={styles.paymentAmountInfo}>
                        <div className={styles.paymentAmount}>{p.amount}</div>
                        <div className={styles.paymentDate}>{p.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
