import React from "react";
import {StyleSheet,Text,View,ScrollView,TouchableOpacity,} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { Link } from "expo-router";

export default function DashboardScreen({ onNavigate }) {
  // Service Box Component
  const ServiceBox = ({ icon, title, subtitle, queue, color }) => (
    <View style={styles.serviceBox}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon name={icon} size={28} color={color} style={{ marginRight: 15 }} />

        <View style={{ flex: 1 }}>
          <Text style={styles.serviceTitle}>{title}</Text>
          <Text style={styles.serviceSubtitle}>{subtitle}</Text>
        </View>

        <View style={styles.queueContainer}>
          <Text style={styles.queueLabel}>Queue: </Text>
          <Text style={styles.queueCount}>{queue}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.bookButton, { backgroundColor: color }]}
        onPress={() => console.log(`Book ${title}`)}
      >
        <Text style={styles.bookButtonText}>Book Appointment</Text>
      </TouchableOpacity>

      <Link href="/about">Book Appointment</Link>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.dashboardContainer}>
      {/* Header */}
      <View style={styles.dashboardHeader}>
        <Text style={styles.dashboardTitle}>Medical Services Dashboard</Text>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="cog" size={16} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.headerButton}>
            <Icon name="pen" size={16} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onNavigate("Home")}
            style={styles.headerButton}
          >
            <Icon name="sign-out-alt" size={16} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* User info */}
      <View style={styles.userInfoCard}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon
            name="user-circle"
            size={30}
            color="#3498db"
            style={{ marginRight: 10 }}
          />
          <View>
            <Text style={styles.welcomeText}>Welcome back ************</Text>
            <Text style={styles.userInfoText}>*@gmail.com</Text>
            <Text style={styles.userInfoText}>1234567890</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionHeader}>Select Your Service Category</Text>

      {/* Service Boxes */}
      <ServiceBox
        icon="user-md"
        title="General Consultation"
        subtitle="Regular checkup and consultation services"
        queue={0}
        color="#0033ff"
      />

      <ServiceBox
        icon="exclamation-triangle"
        title="Emergency Service"
        subtitle="Immediate medical attention required"
        queue={0}
        color="#dc3e2c"
      />

      <ServiceBox
        icon="wheelchair"
        title="Accessibility Service"
        subtitle="Specialized care with assistance"
        queue={0}
        color="#309935"
      />

      {/* Stats */}
      <View style={styles.statsBox}>
        <Icon name="chart-line" size={18} color="#333" style={{ marginRight: 15 }} />
        <View style={{ flex: 1 }}>
          <Text style={styles.statsTitle}>Department Statistics</Text>
          <Text style={styles.statsSubtitle}>
            View detailed information about all departments and doctors
          </Text>
        </View>
        <Text style={styles.statsCount}>Departments →</Text>
      </View>

      <View style={styles.historyBox}>
        <Icon name="history" size={18} color="#333" style={{ marginRight: 15 }} />
        <View style={{ flex: 1 }}>
          <Text style={styles.statsTitle}>Patient History</Text>
          <Text style={styles.statsSubtitle}>
            View your complete medical history across all services
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.contactFooter}>
        <Text style={styles.contactText}>
          Hospital Hours: 24/7 Emergency consultation
        </Text>
        <Text style={styles.contactText}>
          Emergency Helpline: 108 • help@hospital.gov.in
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dashboardContainer: {
    flexGrow: 1,
    backgroundColor: "#f0f5ff",
    padding: 20,
    paddingTop: 40,
  },

  dashboardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  dashboardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },

  headerRight: {
    alignItems: "flex-end",
  },

  headerButton: {
    marginVertical: 3,
  },

  // User Info Card
  userInfoCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    marginBottom: 30,
    elevation: 3,
  },

  welcomeText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  userInfoText: {
    fontSize: 14,
    color: "#666",
  },

  sectionHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#333",
  },

  // Service Box
  serviceBox: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },

  serviceTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },

  serviceSubtitle: {
    fontSize: 12,
    color: "#777",
  },

  queueContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    paddingHorizontal: 6,
    borderRadius: 4,
  },

  queueLabel: {
    fontSize: 12,
    color: "#666",
  },

  queueCount: {
    fontSize: 14,
    fontWeight: "bold",
  },

  bookButton: {
    marginTop: 10,
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: "center",
  },

  bookButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  statsBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 3,
  },

  statsTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },

  statsSubtitle: {
    fontSize: 12,
    color: "#777",
  },

  statsCount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#3498db",
  },

  historyBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 30,
    elevation: 3,
  },

  contactFooter: {
    alignItems: "center",
    paddingVertical: 15,
  },

  contactText: {
    fontSize: 10,
    color: "#666",
  },
});
