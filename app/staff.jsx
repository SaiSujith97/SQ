import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Link } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import Logo from '../assets/logoSMQ.jpg'; 

export default function Login() {
  // 1. State for the Gender dropdown
  const [selectedGender, setSelectedGender] = useState('male');
  // 2. State for the Language dropdown (Corrected Variable Name)
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        
        {/* --- Language Dropdown Container (Positioned Top Right) --- */}
        <View style={styles.languageDropdownArea}>
          <Text style={styles.LanguageLabel}>Language</Text>
          <View style={styles.languagePickerContainer}> 
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue) =>
                setSelectedLanguage(itemValue)
              }
              style={styles.languagePicker}
            >
              <Picker.Item label="English" value="english" />
              <Picker.Item label="Telugu" value="telugu" />
              <Picker.Item label="Hindi" value="hindi" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
        </View>
        {/* --- End Language Dropdown --- */}
        
        {/* --- Logo & Main Form Content --- */}
        <Image source={Logo} style={styles.logo} />

        <View style={styles.forms}>
          <View style={styles.tabRow}>
            <Link href="/" style={styles.patientButton}>
              <Text style={styles.tabText}>Patient</Text>
            </Link>

            <Link href="/staff" style={styles.staffButton}>
              <Text style={styles.tabText}>Staff</Text>
            </Link>
          </View>

          {/* --- Name Input --- */}
          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} placeholder="Enter your name" placeholderTextColor="#1a83d3" />

          {/* --- Gender Dropdown List --- */}
          <Text style={styles.label}>Gender</Text>
          <View style={styles.pickerContainer}> 
            <Picker
              selectedValue={selectedGender}
              onValueChange={(itemValue) =>
                setSelectedGender(itemValue)
              }
              style={styles.picker} 
            >
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View> 
          
          {/* --- Phone Number Input --- */}
          <Text style={styles.label}>Phone Number</Text>
          <TextInput style={styles.input} placeholder="Enter your phone number" placeholderTextColor="#1a83d3" keyboardType="phone-pad" />

          <View style={styles.sendBtn}>
            <Button title="Send OTP" onPress={() => { /* handle OTP */ }} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Use flexGrow instead of flex: 1 to ensure ScrollView content expands
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff5f5',
    paddingTop: 80, // Add top padding to prevent content from being hidden by the status bar/language selector
  },
  
  // --- New Styles for Absolute Positioned Language Dropdown ---
  languageDropdownArea: {
    position: 'absolute',
    top: 30, // Adjust this value to position it relative to the top of the screen/safe area
    right: 20, 
    zIndex: 10, // Ensure it sits above other content
    width: 120, // Define the width for the language control
  },
  LanguageLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  languagePickerContainer: {
    height: 25,
    borderWidth: 1,
    borderColor: '#1a83d3',
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center', 
    width: '100%',
    left: 3,
  },
  languagePicker: {
    width: '100%',
    height: '100%',
    color: '#000',
    fontSize: 14,
  },


  forms: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    width: '100%',
    maxWidth: 400
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5
  },
  patientButton: {
    paddingVertical: 10,
    paddingHorizontal:16,
    backgroundColor: '#1a83d3',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginRight: 4,
    width: '48%',
    textAlign: 'center'
  },
  staffButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#34ed05ff',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    marginLeft: 0.54,
    width: '48%',
    textAlign: 'center'
  },
  tabText: {
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 30,
    borderRadius: 75,
  },
  input: {
    height: 50,
    borderWidth: 1.5,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
  },
  sendBtn: {
    marginTop: 8
  },

  pickerContainer: {
    height: 50,
    borderWidth: 1.5,
    borderColor: '#cccccc',
    borderRadius: 5,
    marginBottom: 15,
    overflow: 'hidden', 
    justifyContent: 'center',
    backgroundColor: '#fff', 
  },
  picker: {
    width: '100%',
    height: '100%',
    color: '#1a83d3', 
  }
});

 