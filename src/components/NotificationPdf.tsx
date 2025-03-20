import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
  } from "@react-pdf/renderer";
  
  const styles = StyleSheet.create({
    page: {
      padding: 40,
      backgroundColor: "#f7fafc",
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
      color: "#3182ce",
    },
    section: {
      marginBottom: 10,
      padding: 10,
      backgroundColor: "#ffffff",
      borderRadius: 5,
      border: "1px solid #e2e8f0",
    },
    label: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#4a5568",
      marginBottom: 5,
    },
    value: {
      fontSize: 14,
      color: "#2d3748",
    },
    logo: {
      width: 100,
      height: 50,
      marginBottom: 20,
      alignSelf: "center",
    },
  });
  
  interface NotificationPdfProps {
    data: {
      notification: {
        userId: {
          name: string;
          email: string;
        };
        transactionId: string;
        message: string;
      };
      transaction: {
        amount: number;
        type: string;
      };
    };
  }
  
  const NotificationPdf = ({ data }: NotificationPdfProps) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src="/logo.png" style={styles.logo} />
        <Text style={styles.header}>Notification Details</Text>
  
        <View style={styles.section}>
          <Text style={styles.label}>User Name</Text>
          <Text style={styles.value}>{data.notification.userId.name}</Text>
        </View>
  
        <View style={styles.section}>
          <Text style={styles.label}>User Email</Text>
          <Text style={styles.value}>{data.notification.userId.email}</Text>
        </View>
  
        <View style={styles.section}>
          <Text style={styles.label}>Transaction ID</Text>
          <Text style={styles.value}>{data.notification.transactionId}</Text>
        </View>
  
        <View style={styles.section}>
          <Text style={styles.label}>Message</Text>
          <Text style={styles.value}>{data.notification.message}</Text>
        </View>
  
        <View style={styles.section}>
          <Text style={styles.label}>Transaction Amount</Text>
          <Text style={styles.value}>${data.transaction.amount}</Text>
        </View>
  
        <View style={styles.section}>
          <Text style={styles.label}>Transaction Type</Text>
          <Text style={styles.value}>{data.transaction.type}</Text>
        </View>
      </Page>
    </Document>
  );
  
  export default NotificationPdf;