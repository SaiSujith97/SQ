import React from "react";
import { StyleSheet,View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";


const Staff = () => {
  return (
    <View style={{ flex: 1 }}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Staff Dashboard</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={25} style={styles.settingsButton} />

        </TouchableOpacity>
        <Ionicons name="scan" size={25} style={styles.qrScannerButton}> QR Scanner</Ionicons>
      </View>

      {/* Scrollable Body */}
      <ScrollView style={styles.bodyContainer}>

        {/* ===== CARD LIST ===== */}
        {[...Array(10)].map((_, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>Hello</Text>
            <Text style={styles.cardSubtitle}>This is extra text under hello.</Text>
          </View>
        ))}

      </ScrollView>
    </View>
  );
};

export default Staff;

const styles = StyleSheet.create({
  header: {
    height:'15%',
    borderRadius:18,
    margin:10,
    padding: 20,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
  },

  headerText: {
    fontSize: 24,
    fontWeight: "700",
  },

  settingsButton: {
    padding: 5,
  },

  qrScannerButton:{
    position:'absolute',
    top:60,
    right:10,
  },
  bodyContainer: {
    padding: 15,
    margin:15,
    borderRadius:18,
   // backgroundColor: "#F5F7FF",
    
    elevation:3,
  },

  /* ----- CARD ----- */
  card: {
 // lime glossy feel
    padding: 15,
    marginBottom: 15,
    borderRadius: 15,

    // Glossy effect
    borderWidth:0.9,
   // borderColor: "rgba(170, 240, 0, 0.8)",
   shadowColor: "#ffff",
    //shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 4,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 5,
  },

  cardSubtitle: {
    fontSize: 14,
    color: "#555",
  },
});
