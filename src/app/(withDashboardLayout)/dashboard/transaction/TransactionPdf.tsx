/* eslint-disable jsx-a11y/alt-text */
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
    Link,
    Font,
  } from "@react-pdf/renderer";
  
  // Register fonts
  Font.register({
    family: "Inter",
    fonts: [
      {
        src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZg.ttf",
        fontWeight: 400,
      },
      {
        src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZg.ttf",
        fontWeight: 600,
      },
      {
        src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyYMZg.ttf",
        fontWeight: 700,
      },
    ],
  });
  
  // Create styles
  const styles = StyleSheet.create({
    page: {
      padding: 0,
      fontFamily: "Inter",
    },
    header: {
      backgroundColor: "#4f46e5", // indigo-600
      color: "white",
      padding: 30,
      textAlign: "center",
      marginBottom: 20,
    },
    companyName: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 8,
    },
    companyInfo: {
      fontSize: 10,
      marginBottom: 4,
      opacity: 0.9,
    },
    receiptContainer: {
      paddingHorizontal: 30,
    },
    receiptHeader: {
      textAlign: "center",
      marginBottom: 20,
    },
    receiptTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#1e293b", // slate-800
      marginBottom: 8,
    },
    receiptSubtitle: {
      fontSize: 12,
      color: "#64748b", // slate-500
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#4f46e5", // indigo-600
      marginBottom: 8,
      borderBottom: "1px solid #e2e8f0",
      paddingBottom: 4,
    },
    grid: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 15,
    },
    leftColumn: {
      width: "60%",
    },
    rightColumn: {
      width: "35%",
      alignItems: "flex-end",
    },
    label: {
      fontSize: 10,
      fontWeight: "bold",
      color: "#64748b", // slate-500
      marginBottom: 4,
    },
    value: {
      fontSize: 12,
      color: "#1e293b", // slate-800
      marginBottom: 8,
    },
    qrCodeContainer: {
      backgroundColor: "white",
      padding: 10,
      borderRadius: 8,
      border: "1px solid #e2e8f0",
      alignItems: "center",
    },
    qrCode: {
      width: 100,
      height: 100,
    },
    verificationText: {
      fontSize: 8,
      color: "#64748b", // slate-500
      marginTop: 4,
    },
    paymentSummary: {
      backgroundColor: "#f8fafc", // slate-50
      padding: 15,
      borderRadius: 8,
      marginBottom: 20,
    },
    paymentRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    totalRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
      paddingTop: 8,
      borderTop: "1px solid #e2e8f0",
    },
    footer: {
      position: "absolute",
      bottom: 20,
      left: 0,
      right: 0,
      textAlign: "center",
      fontSize: 8,
      color: "#64748b", // slate-500
      paddingHorizontal: 30,
    },
    watermark: {
      position: "absolute",
      bottom: 100,
      left: 0,
      right: 0,
      textAlign: "center",
      fontSize: 60,
      color: "rgba(79, 70, 229, 0.1)", // indigo-600 with opacity
      fontWeight: "bold",
      transform: "rotate(-30deg)",
    },
  });
  
  interface NotificationPdfProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    company: {
      name: string;
      address: string;
      city: string;
      country: string;
      phone: string;
      email: string;
      website: string;
    };
    qrCodeUrl: string;
  }
  
  const TransactionPDF = ({ data, company, qrCodeUrl }: NotificationPdfProps) => {
    const transaction = data;
    console.log(transaction)
    const totalAmount = transaction.amount + transaction.fee;
  
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Watermark */}
          <View style={styles.watermark}>
            <Text>{company.name}</Text>
          </View>
  
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.companyName}>{company.name}</Text>
            <Text style={styles.companyInfo}>
              {company.address}, {company.city}, {company.country}
            </Text>
            <Text style={styles.companyInfo}>
              Tel: {company.phone} | Email: {company.email}
            </Text>
            <Text style={styles.companyInfo}>
              Website:{" "}
              <Link
                style={{ color: "white", textDecoration: "underline" }}
                src={`https://${company.website}`}
              >
                {company.website}
              </Link>
            </Text>
          </View>
  
          {/* Receipt Content */}
          <View style={styles.receiptContainer}>
            {/* Receipt Header */}
            <View style={styles.receiptHeader}>
              <Text style={styles.receiptTitle}>
                {transaction.type.toUpperCase()} RECEIPT
              </Text>
              <Text style={styles.receiptSubtitle}>
                Transaction ID: {transaction.transactionId}
              </Text>
            </View>
  
            {/* Customer and Transaction Info */}
            <View style={styles.grid}>
              <View style={styles.leftColumn}>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>CUSTOMER INFORMATION</Text>
                  <Text style={styles.label}>Full Name</Text>
                  <Text style={styles.value}>{transaction.senderId.name}</Text>
  
                  <Text style={styles.label}>Mobile Number</Text>
                  <Text style={styles.value}>
                    {transaction.senderId.mobileNumber}
                  </Text>
                </View>
  
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>TRANSACTION DETAILS</Text>
                  <Text style={styles.label}>Date & Time</Text>
                  <Text style={styles.value}>
                    {new Date(transaction.createdAt).toLocaleString()}
                  </Text>
  
                  <Text style={styles.label}>Transaction Type</Text>
                  <Text style={styles.value}>
                    {capitalize(transaction.type)}
                  </Text>
  
                  <Text style={styles.label}>Recipient</Text>
                  <Text style={styles.value}>{transaction.recipientId.name}</Text>
                </View>
              </View>
  
              <View style={styles.rightColumn}>
                <View style={styles.qrCodeContainer}>
                  <Image src={qrCodeUrl} style={styles.qrCode} />
                  <Text style={styles.verificationText}>Scan to verify</Text>
                </View>
              </View>
            </View>
  
            {/* Payment Summary */}
            <View style={styles.paymentSummary}>
              <Text style={styles.sectionTitle}>PAYMENT SUMMARY</Text>
  
              <View style={styles.paymentRow}>
                <Text style={styles.label}>Amount</Text>
                <Text style={styles.value}>
                  {transaction.amount.toFixed(2)} BDT
                </Text>
              </View>
  
              <View style={styles.paymentRow}>
                <Text style={styles.label}>Transaction Fee</Text>
                <Text style={styles.value}>{transaction.fee.toFixed(2)} BDT</Text>
              </View>
  
              <View style={styles.totalRow}>
                <Text style={[styles.label, { fontWeight: "bold" }]}>
                  Total Amount
                </Text>
                <Text style={[styles.value, { fontWeight: "bold" }]}>
                  {totalAmount.toFixed(2)} BDT
                </Text>
              </View>
            </View>
          </View>
  
          {/* Footer */}
          <View style={styles.footer}>
            <Text>
              This is an official receipt from {company.name}. For any queries,
              please contact {company.email}
            </Text>
            <Text>
              © {new Date().getFullYear()} {company.name}. All rights reserved.
            </Text>
          </View>
        </Page>
      </Document>
    );
  };
  
  // Helper function to capitalize strings
  function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  export default TransactionPDF;


