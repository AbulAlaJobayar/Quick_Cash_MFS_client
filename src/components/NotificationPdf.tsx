/* eslint-disable jsx-a11y/alt-text */
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Link,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    backgroundColor: '#ec4899', // pink-500
    color: 'white',
    padding: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  companyInfo: {
    fontSize: 12,
    marginBottom: 2,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#ec4899', // pink-500
    borderBottom: '1px solid #ec4899',
    paddingBottom: 4,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  leftColumn: {
    width: '60%',
  },
  rightColumn: {
    width: '35%',
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#4a5568',
    marginBottom: 3,
  },
  value: {
    fontSize: 12,
    color: '#2d3748',
    marginBottom: 8,
  },
  qrCode: {
    width: 100,
    height: 100,
    border: '1px solid #e2e8f0',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
    color: '#718096',
  },
  divider: {
    borderTop: '1px solid #e2e8f0',
    marginVertical: 15,
  },
});

interface NotificationPdfProps {
  data: {
    notification: {
      userId: {
        name: string;
        email: string;
        mobileNumber: string;
      };
      transactionId: string;
      message: string;
      createdAt: string;
    };
    transaction: {
      amount: number;
      type: string;
      fee: number;
    };
  };
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

const NotificationPdf = ({ data, company, qrCodeUrl }: NotificationPdfProps) => {
  // Generate dynamic PDF name
  const pdfFileName = `QKASH_${data.transaction.type}_${data.notification.userId.name.replace(/\s+/g, '_')}_${data.notification.transactionId}.pdf`;

  return (
    <Document title={pdfFileName}>
      <Page size="A4" style={styles.page}>
        {/* Company Header */}
        <View style={styles.header}>
          <Text style={styles.companyName}>{company.name}</Text>
          <Text style={styles.companyInfo}>{company.address}, {company.city}, {company.country}</Text>
          <Text style={styles.companyInfo}>Tel: {company.phone} | Email: {company.email}</Text>
          <Text style={styles.companyInfo }>Website: <Link style={{color:'white', textDecoration: 'underline' }} src={`https://${company.website}`}>{company.website}</Link></Text>
        </View>

        {/* Document Title */}
        <View style={[styles.section, { textAlign: 'center' }]}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>
            {data.transaction.type.toUpperCase()} RECEIPT
          </Text>
          <Text style={{ fontSize: 12, color: '#718096' }}>
            Transaction ID: {data.notification.transactionId}
          </Text>
        </View>

        <View style={styles.divider} />

        {/* Customer and Transaction Info */}
        <View style={styles.grid}>
          <View style={styles.leftColumn}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>CUSTOMER INFORMATION</Text>
              <Text style={styles.label}>Full Name</Text>
              <Text style={styles.value}>{data.notification.userId.name}</Text>
              
              <Text style={styles.label}>Email Address</Text>
              <Text style={styles.value}>{data.notification.userId.email}</Text>
              
              <Text style={styles.label}>Mobile Number</Text>
              <Text style={styles.value}>{data.notification.userId.mobileNumber}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>TRANSACTION DETAILS</Text>
              <Text style={styles.label}>Date & Time</Text>
              <Text style={styles.value}>
                {new Date(data.notification.createdAt).toLocaleString()}
              </Text>
              
              <Text style={styles.label}>Transaction Type</Text>
              <Text style={styles.value}>{data.transaction.type}</Text>
              
              <Text style={styles.label}>Message</Text>
              <Text style={styles.value}>{data.notification.message}</Text>
            </View>
          </View>

          <View style={styles.rightColumn}>
            <Image src={qrCodeUrl} style={styles.qrCode} />
            <Text style={{ fontSize: 8, marginTop: 5 }}>Scan to verify</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Payment Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PAYMENT SUMMARY</Text>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.label}>Amount</Text>
            <Text style={styles.value}> {data.transaction.amount.toFixed(2)}</Text>
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.label}>Transaction Fee</Text>
            <Text style={styles.value}><a href="https://www.flaticon.com/free-icons/taka" title="taka icons"/> {data.transaction.fee.toFixed(2)}</Text>
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <Text style={[styles.label, { fontWeight: 'extrabold' }]}>Total Amount</Text>
            <Text style={[styles.value, { fontWeight: 'bold' }]}>
            <a href="https://www.flaticon.com/free-icons/taka" title="taka icons"/> {(data.transaction.amount + data.transaction.fee).toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>This is a Mobile Banking Application. For any queries, please contact {company.email}</Text>
          <Text>© {new Date().getFullYear()} {company.name}. All rights reserved. (Abul Ala Jobayar)</Text>
        </View>
      </Page>
    </Document>
  );
};

export default NotificationPdf;