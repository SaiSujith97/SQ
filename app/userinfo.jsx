import React, { useState, useMemo, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  ScrollView 
} from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker'; 
import debounce from 'lodash.debounce'; 

// CRUCIAL: REPLACE with your computer's actual local IP address
const AI_API_ENDPOINT = 'http://YOUR_LOCAL_IP_ADDRESS:3000/api/triage'; 
const MIN_SYMPTOM_LENGTH = 15; // Minimum length to trigger analysis
const DEBOUNCE_DELAY_MS = 800; 

const TriageForm = () => {
    // Input States
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('Male'); // Simplified
    const [symptoms, setSymptoms] = useState('');
    
    // AI/Output States
    const [recommendedDepartment, setRecommendedDepartment] = useState('General Medicine');
    const [isLoading, setIsLoading] = useState(false);

    const allDepartments = [
        'General Medicine', 'Cardiology', 'Orthopedics', 'Gastroenterology', 
        'Neurology', 'Emergency', 'Pediatrics'
    ];

    // --- Core Analysis Function (Non-Debounced) ---
    const fetchDepartmentRecommendation = async (symptomText) => {
        if (symptomText.trim().length < MIN_SYMPTOM_LENGTH) {
            setRecommendedDepartment('General Medicine');
            return;
        }

        setIsLoading(true);

        try {
            // Sends the symptom text to your local server proxy
            const response = await axios.post(AI_API_ENDPOINT, {
                symptom_text: symptomText
            });
            
            const resultDepartment = response.data.department_recommendation;
            setRecommendedDepartment(resultDepartment);

        } catch (error) {
            console.error("AI Analysis Error:", error);
            // Fallback on error
            setRecommendedDepartment('General Medicine');
        } finally {
            setIsLoading(false);
        }
    };
    
    // --- Debounced Function ---
    // Use useMemo to create a stable debounced function instance
    const debouncedAnalyze = useMemo(
        // Calls the core function after 800ms of no typing
        () => debounce(fetchDepartmentRecommendation, DEBOUNCE_DELAY_MS),
        [] 
    );

    // --- Change Handler ---
    const handleSymptomChange = (newText) => {
        // 1. Update the UI state immediately
        setSymptoms(newText);
        // 2. Call the debounced function, which handles the timing
        debouncedAnalyze(newText); 
    };

    // Cleanup: Cancel any pending debounced calls when the component unmounts
    useEffect(() => {
        return () => {
            debouncedAnalyze.cancel();
        };
    }, [debouncedAnalyze]);


    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.headerText}>Multi-Department Token-Generation</Text>
                <Text style={styles.subHeaderText}>One token for all hospital services</Text>

                {/* Name, Age, Gender Inputs */}
                <Text style={styles.label}>Name</Text>
                <TextInput style={styles.textInput} placeholder="Enter Name" value={name} onChangeText={setName} />
                <Text style={styles.label}>Age</Text>
                <TextInput style={styles.textInput} placeholder="Enter Age" keyboardType="numeric" value={age} onChangeText={setAge} />
                <Text style={styles.label}>Gender</Text>
                <TextInput style={styles.textInput} placeholder="Male/Female/Other" value={gender} onChangeText={setGender} />

                {/* --- SYMPTOMS TEXTAREA & AUTO-ANALYSIS --- */}
                <Text style={styles.label}>Symptoms</Text>
                <TextInput
                    style={styles.textAreaInput}
                    multiline
                    numberOfLines={4}
                    value={symptoms}
                    // This triggers the debounced analysis
                    onChangeText={handleSymptomChange} 
                    placeholder="Enter Your Symptoms (e.g., severe chest pain, inability to move left arm)"
                    placeholderTextColor="#999"
                    textAlignVertical="top"
                />
                
                {isLoading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator color="#007AFF" size="small" />
                        <Text style={styles.loadingText}>Analyzing symptoms...</Text>
                    </View>
                )}
                
                {/* --- DEPARTMENT DROPDOWN (AI Output) --- */}
                <Text style={styles.label}>Select the department</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={recommendedDepartment}
                        // Manual override is allowed if the AI suggests wrong
                        onValueChange={(itemValue) => setRecommendedDepartment(itemValue)} 
                        style={styles.picker}
                        enabled={!isLoading} // Disable manual change during analysis
                    >
                        {allDepartments.map((dept) => (
                            <Picker.Item key={dept} label={dept} value={dept} />
                        ))}
                    </Picker>
                </View>

                <TouchableOpacity style={styles.scheduleButton} disabled={isLoading}>
                    <Text style={styles.scheduleButtonText}>CONTINUING SCHEDULE OPTIONS</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

// --- Stylesheet ---
const styles = StyleSheet.create({
    scrollContainer: { flexGrow: 1, backgroundColor: '#fff' },
    container: { padding: 20, flex: 1 },
    headerText: { fontSize: 22, fontWeight: 'bold', color: '#333', marginTop: 10 },
    subHeaderText: { fontSize: 14, color: '#666', marginBottom: 20 },
    label: { fontSize: 16, fontWeight: '600', marginTop: 15, marginBottom: 5, color: '#333' },
    textInput: { borderColor: '#ccc', borderWidth: 1, borderRadius: 5, padding: 10, fontSize: 16, backgroundColor: '#f9f9f9' },
    textAreaInput: { 
        borderColor: '#ccc', borderWidth: 1, borderRadius: 5, padding: 10, minHeight: 100, fontSize: 16, 
        backgroundColor: '#f9f9f9', paddingTop: 10,
    },
    loadingContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 15 },
    loadingText: { marginLeft: 10, color: '#007AFF' },
    pickerContainer: { 
        borderColor: '#ccc', borderWidth: 1, borderRadius: 5, overflow: 'hidden', 
        backgroundColor: '#f9f9f9', height: 50, justifyContent: 'center',
    },
    picker: { height: 50, width: '100%' },
    scheduleButton: { 
        backgroundColor: '#3498db', padding: 15, borderRadius: 5, alignItems: 'center', 
        marginTop: 30, elevation: 3,
    },
    scheduleButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});

export default TriageForm;